import type * as _nunjucks from "nunjucks";
declare const nunjucks: typeof _nunjucks;

const env = new nunjucks.Environment(undefined, { autoescape: false });

export const section = new nunjucks.Template(
  `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="referrer" content="same-origin" />
    <meta
      name="generator"
      content="https://github.com/yingziwu/novel-downloader"
    />
    <link href="style.css" type="text/css" rel="stylesheet" />
    <title>{{ sectionName }}</title>
  </head>
  <body>
    <div class="main"><h1>{{ sectionName }}</h1></div>
  </body>
</html>`,
  env,
  undefined,
  true
);

export const chapter = new nunjucks.Template(
  `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="referrer" content="same-origin" />
    <meta
      name="generator"
      content="https://github.com/yingziwu/novel-downloader"
    />
    <meta name="source" content="{{ chapterUrl }}" />
    <link href="style.css" type="text/css" rel="stylesheet" />
    <title>{{ chapterName }}</title>
  </head>
  <body>
    <div class="main">
    <h2>{{ chapterName }}</h2>
    {{ outerHTML }}
    </div>
  </body>
</html>`,
  env,
  undefined,
  true
);

export const index = new nunjucks.Template(
  `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="referrer" content="same-origin" />
    <meta
      name="generator"
      content="https://github.com/yingziwu/novel-downloader"
    />
    <meta name="date-creation" content="{{ creationDate }}" />
    <link href="style.css" type="text/css" rel="stylesheet" />
    <title>{{ bookname }}</title>
    <style>
      {{ tocStyleText }}
    </style>
  </head>
  <body>
    <div class="main">
      <h1>{{ bookname }}</h1>
      <h3 class="author">{{ author }}</h3>
      <div class="info">
        {% if cover -%}
        <img class="cover" data-src-address="{{ cover.name }}" />
        {%- endif %} 
        {% if introductionHTML -%}
        <div>
          <h3>简介</h3>
          <div class="introduction">{{ introductionHTML }}</div>
        </div>
        {%- endif %}
      </div>
      <div class="bookurl">
        <a href="{{ bookUrl }}">打开原始网站</a>
      </div>
      <hr />
      {% if hasSections -%} 
      {% for sectionName, section in sectionsObj -%}
      <div id="section{{ loop.index }}" class="section">
        <h2 class="section-label">{{ sectionName }}</h2>
        {% for chapter in section -%}
        <div class="chapter">
            {% if not (chapter.contentHTML or chapter.status === Status.saved) -%}
            <a class="disabled" href="{{ chapter.chapterHtmlFileName }}">{{ chapter.chapterName }}</a>
            {%- else -%}
            <a href="{{ chapter.chapterHtmlFileName }}">{{ chapter.chapterName }}</a>
            {%- endif %}
        </div>
        {%- endfor %}
      </div>
      {%- endfor %} 
      {%- else -%}
      <div id="section0" class="section">
        {% for chapter in sectionsObj["default114514"] -%}
        <div class="chapter">
            {% if not (chapter.contentHTML or chapter.status === Status.saved) -%}
            <a class="disabled" href="{{ chapter.chapterHtmlFileName }}">{{ chapter.chapterName }}</a>
            {%- else -%}
            <a href="{{ chapter.chapterHtmlFileName }}">{{ chapter.chapterName }}</a>
            {%- endif %}
        </div>
        {%- endfor %}
      </div>
      {%- endif %}
    </div>
  </body>
</html>`,
  env,
  undefined,
  true
);
