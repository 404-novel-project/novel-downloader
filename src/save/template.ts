import sectionHtml from "./section.html.j2";
import chapterHtml from "./chapter.html.j2";
import indexHtml from "./index.html.j2";

import * as nunjucks from "nunjucks";

const env = new nunjucks.Environment(undefined, { autoescape: false });

export const section = new nunjucks.Template(sectionHtml, env, undefined, true);

export const chapter = new nunjucks.Template(chapterHtml, env, undefined, true);

export const index = new nunjucks.Template(indexHtml, env, undefined, true);
