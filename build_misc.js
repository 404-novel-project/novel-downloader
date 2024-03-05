/* eslint-disable no-undef */
import { execFile as _execFile } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import util from "util";

import fse from "fs-extra";
import { cmd } from "web-ext";

const execFile = util.promisify(_execFile);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, "dist");

const dev = process.env.NODE_ENV === "development";
const noPack = process.env.NO_PACK === "true";
const publish = process.env.PUBLISH === "true";

const ignoreFiles = [];

function loadJSON(fpath) {
  const _ = new TextDecoder().decode(fs.readFileSync(fpath));
  return JSON.parse(_);
}

function loadManifest() {
  const manifest = loadJSON(path.resolve(__dirname, "manifest.json"));
  const pkg = loadJSON(path.resolve(__dirname, "package.json"));
  manifest.version = pkg.version;
  return manifest;
}

function firefox() {
  const sourceDir = path.resolve(distDir, "firefox");
  if (!fs.existsSync(sourceDir)) {
    fse.mkdirpSync(sourceDir);
  }
  const artifactsDir = path.resolve(distDir, "extensions");

  const manifest = loadManifest();

  function saveManifest() {
    const unusedKeys = ["minimum_chrome_version"];
    for (const k of unusedKeys) {
      delete manifest[k];
    }

    delete manifest.background.service_worker;

    fs.writeFileSync(
      path.resolve(sourceDir, "manifest.json"),
      JSON.stringify(manifest, undefined, 2),
    );
  }

  function pack() {
    cmd.build({
      sourceDir,
      artifactsDir,
      asNeeded: false,
      overwriteDest: true,
      ignoreFiles,
      filename: "novel_downloader-firefox-{version}.zip",
    });
  }

  function sign() {
    const apiKey = process.env.WEB_EXT_API_KEY;
    const apiSecret = process.env.WEB_EXT_API_SECRET;

    if (apiKey === undefined || apiSecret === undefined) {
      return;
    }

    // https://extensionworkshop.com/documentation/develop/web-ext-command-reference/#web-ext-sign
    cmd.sign({
      amoBaseUrl: "https://addons.mozilla.org/api/v5/",
      apiUrlPrefix: "https://addons.mozilla.org/api/v4",

      apiKey,
      apiSecret,

      sourceDir,
      artifactsDir,
      ignoreFiles,

      useSubmissionApi: true,
      channel: "unlisted",
    });
  }

  saveManifest();
  if (dev === false && noPack === false) {
    pack();
    if (publish) {
      sign();
    }
  }
}

function chromium() {
  const sourceDir = path.resolve(distDir, "chromium");
  if (!fs.existsSync(sourceDir)) {
    fse.mkdirpSync(sourceDir);
  }
  const artifactsDir = path.resolve(distDir, "extensions");

  const manifest = loadManifest();

  function saveManifest() {
    const unusedKeys = ["browser_specific_settings", "developer"];
    for (const k of unusedKeys) {
      delete manifest[k];
    }

    delete manifest.background.scripts;

    const contextualIdentitiesIdx = manifest.permissions.findIndex(
      (p) => p === "contextualIdentities",
    );
    manifest.permissions.splice(contextualIdentitiesIdx, 1);

    fs.writeFileSync(
      path.resolve(sourceDir, "manifest.json"),
      JSON.stringify(manifest, undefined, 2),
    );
  }

  function pack() {
    cmd.build({
      sourceDir,
      artifactsDir,
      asNeeded: false,
      overwriteDest: true,
      ignoreFiles,
      filename: "novel_downloader-chromium-{version}.zip",
    });
  }

  async function sign() {
    const secretDir = path.resolve(__dirname, "secret");
    if (!fs.existsSync(secretDir)) {
      fse.mkdirSync(secretDir);
    }
    const pack_extension_key = path.resolve(secretDir, "chromium.pem");

    if (!fs.existsSync(pack_extension_key)) {
      const chromium_pem = process.env.CHROMIUM_PEM;
      if (chromium_pem === undefined) {
        return;
      } else {
        fs.writeFileSync(pack_extension_key, chromium_pem);
      }
    }

    console.log("Building web extension from", sourceDir);
    const args = [`--pack-extension=${sourceDir}`, `--pack-extension-key=${pack_extension_key}`];

    try {
      await execFile("chrome", args);
    } catch (error) {
      await execFile("chromium", args);
    }

    const crxDest = path.resolve(artifactsDir, `novel_downloader-chromium-${manifest.version}.crx`);
    fse.moveSync(path.resolve(distDir, "chromium.crx"), crxDest, { overwrite: true });
    console.log("Your web extension is ready:", crxDest);
  }

  saveManifest();
  if (dev === false && noPack === false) {
    pack();
    if (publish) {
      sign();
    }
  }
}

firefox();
chromium();
