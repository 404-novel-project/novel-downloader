import * as streamSaver from "streamsaver";
import { TransformStream, WritableStream } from "web-streams-polyfill/es2018";

// @ts-ignore
streamSaver.WritableStream = WritableStream;
// @ts-ignore
streamSaver.TransformStream = TransformStream;

const rawMitm = streamSaver.mitm;
const mitm = new URL("https://cors.bgme.me/");
mitm.pathname = rawMitm;
// @ts-ignore
streamSaver.mitm = mitm.href;

exports.streamSaver = streamSaver;
