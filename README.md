# equalshares.net

This website is built using [Docusaurus 2](https://docusaurus.io/), a static website generator.

It is being developed and translated by:

* [Dominik Peters](http://dominik-peters.de/) who is the main developer and did the translation to German.
* [Piotr Skowron](https://www.mimuw.edu.pl/~ps219737/) who contributed to the content and did the translation to Polish.
* [Simon Rey](https://simonrey.fr/) who is translating to French.
* [Davide Grossi](https://davidegrossi.me/) and [Maaike Los](https://research.rug.nl/en/persons/maaike-venema-los) who are translating to Dutch.

## Development

To develop, you will need to install [Node.js](https://nodejs.org/en/), for example using `brew install node` on macOS or using `sudo apt install nodejs npm` on Ubuntu.

For local development, go to the website directory and run:

```bash
npm install
npm run start
```

This will start a local development server. The website can then be viewed at `http://localhost:3000/`. Changes to the source files are immediately reflected in the browser.

```bash
npm run build
```

This command generates static content into the `build` directory. This can then be served using any static contents hosting service.

## Translations

To start the development server for a specific language, run:

```bash
npm run start -- --locale de
```

replacing `de` with the language code of the language you want to work on ('fr', 'pl').

The files to be translated are in the directory `i18n`. You need to translate the messages in the file `code.json`. Note that curly braces indicate variables that will be filled in at runtime. Do not translate these. For example, in `(contributes {amount})`, only translate `contributes`.

The main text is contained in files in the folder `docusaurus-plugin-content-docs/current`. 

* When editing the Markdown files, be careful with the HTML-like tags (which are React components). A common error is to not close a tag. React requires, for example, `<img/>`.
* Do not change filenames.
* Do not translate anchors like `{#example}`.
* For monetary examples, use the format `<Currency>10</Currency>`.
* Some boxes begin with a line `:::tip Example`. The word `tip` is a keyword specifying the type of box (its symbol and color). The second word is a customized headline, which should be translated.
