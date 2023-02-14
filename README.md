# equalshares.net

This website is built using [Docusaurus 2](https://docusaurus.io/), a static website generator.

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

The files to be translated are in the directory `i18n`.