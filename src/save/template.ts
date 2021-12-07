import chapterHtml from "./chapter.html.j2";
import indexHtml from "./index.html.j2";
import sectionHtml from "./section.html.j2";

import { Environment, Template } from "nunjucks";

const env = new Environment(undefined, { autoescape: false });

export const section = new Template(sectionHtml, env, undefined, true);

export const chapter = new Template(chapterHtml, env, undefined, true);

export const index = new Template(indexHtml, env, undefined, true);
