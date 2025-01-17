// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import {themes as prismThemes} from 'prism-react-renderer';

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const date = new Date();
const isoDay = date.toISOString().split('T')[0];

function getAnnouncementBar() {
  switch(process.env.DOCUSAURUS_CURRENT_LOCALE) {
    case "pl": return "<a href='/pl/resources/zielony-milion'>2023-04-26: Ogłoszono wyniki głosowania w ekologicznym budżecie partycypacyjnym Wieliczki, Zielony Milion</a>";
    case "de": return "<a href='/pl/resources/zielony-milion'>2023-04-26: Das Wahlergebnis des Bürgerbudgets Grüne Million in Wieliczka wurden bekanntgegeben.</a>";
    default: return "<a href='/resources/zielony-milion'>2023-04-26: The vote results of Wieliczka's Green Million participatory budget have been announced</a>";
  }
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Method of Equal Shares',
  // tagline: 'Dinosaurs are cool',
  url: 'https://equalshares.net',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.svg',

  customFields: {
    currencySymbol: {en: '€', de: 'Fr. ', pl: 'zł', fr: '€', nl: '€', hu: 'Ft'},
    buildDate: isoDay,
  },

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'equalshares', // Usually your GitHub org/user name.
  projectName: 'equalshares.net', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['de', 'en', 'pl', 'fr', 'hu'] //, 'nl']
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // metadata: [{name: 'robots', content: 'noindex'}],
      navbar: {
        title: 'Method of Equal Shares',
        logo: {
          alt: 'Logo of the Method of Equal Shares',
          src: 'img/equal-shares-logo.svg',
        },
        items: [
          {
            to: 'explanation',
            position: 'left',
            label: 'Explanation',
          },
          {
            to: 'benefits',
            position: 'left',
            label: 'Benefits',
          },
          {
            to: 'implementation',
            position: 'left',
            label: 'Implementation',
          },
          {
            to: 'elections',
            position: 'left',
            label: 'Elections',
          },
          {
            to: 'contacts',
            position: 'left',
            label: 'Contacts',
          },
          {
            type: 'custom-currencyPicker',
            position: 'right',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      // announcementBar: {
      //   id: 'zielony-milion-results',
      //   content: getAnnouncementBar(),
      //   backgroundColor: '#eef7e9',
      //   textColor: '#112b06',
      //   isCloseable: true,
      // },
      footer: {
        style: 'dark',
        links: [
          {
            items: [
              {
                to: 'explanation',
                label: 'Explanation',
              },
              {
                to: 'benefits',
                label: 'Benefits',
              },
              {
                to: 'implementation',
                label: 'Implementation',
              },
            ],
          },
          {
          items: [
            {
              to: 'elections',
              label: 'Elections',
            },
            {
              to: 'contacts',
              label: 'Contacts',
            },
          ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/equalshares',
              },
              {
                label: 'Wikipedia',
                href: 'https://en.wikipedia.org/wiki/Method_of_Equal_Shares',
              },
            ],
          },
        ],
        copyright: `Website maintained by <a href="https://dominik-peters.de" style="color:hsl(202, 100%, 70%)">Dominik Peters</a> (CNRS, Université Paris Dauphine-PSL) and <a href="https://www.mimuw.edu.pl/~pskowron/" style="color:hsl(202, 100%, 70%)">Piotr Skowron</a> (University of Warsaw).`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
    // stylesheets: [
    //   {
    //     href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
    //     type: 'text/css',
    //     integrity:
    //       'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
    //     crossorigin: 'anonymous',
    //   },
    // ],
    plugins: [
      [
        '@docusaurus/plugin-client-redirects',
        {
          redirects: [
            {
              from: '/resources/zielony-milion',
              to: '/elections/zielony-milion',
            },
          ]
        }
      ],
      async function faviconInjector(context, options) {
        return {
          name: 'favicon-injector', // needed because Safari on iOS doesn't support SVG favicons
          injectHtmlTags() {
            return {
              headTags: [
                {
                  tagName: 'link',
                  attributes: {
                    rel: 'icon',
                    href: '/img/favicon.ico',
                    sizes: 'any',
                  },
                },
              ],
            };
          },
        };
      }
    ],
};

module.exports = config;
