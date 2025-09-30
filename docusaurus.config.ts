import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Le Moment IT',
  tagline: 'DevOps made simple',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://le-moment-it.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/website',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'le-moment-it', // Usually your GitHub org/user name.
  projectName: 'website', // Usually your repo name.
  trailingSlash: false,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.ts'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 5,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      }
    },
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Le Moment IT',
      logo: {
        alt: 'Le Moment IT',
        src: 'img/docusaurus.svg',
      },
      items: [
        {
          type: 'dropdown',
          label: 'DevOps',
          position: 'left',
          items: [
            {
              label: 'Planning',
              to: 'docs/devops/plan/intro',
            },
            {
              label: 'Coding',
              to: 'docs/devops/code/intro',
            },
            {
              label: 'Building',
              to: 'docs/devops/build/intro',
            },
            {
              label: 'Testing',
              to: 'docs/devops/test/intro',
            },
            {
              label: 'Release',
              to: 'docs/devops/release/intro',
            },
            {
              label: 'Deploy',
              to: 'docs/devops/deploy/intro',
            },
            {
              label: 'Operate',
              to: 'docs/devops/operate/intro',
            },
            {
              label: 'Monitor',
              to: 'docs/devops/monitor/intro',
            },
            {
              label: 'Tools & Systems',
              to: 'docs/category/tools--systems',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'Infrastructure',
          position: 'left',
          items: [
            {
              label: 'Computing',
              to: 'docs/infrastructure/data-store/intro',
            },
            {
              label: 'Data store',
              to: 'docs/infrastructure/data-store/intro',
            },
            {
              label: 'Network',
              to: 'docs/infrastructure/data-store/intro',
            },
            {
              label: 'Kubernetes',
              to: 'docs/infrastructure/kubernetes/intro',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'Architecture',
          position: 'left',
          items: [
            {
              label: 'System & Networks',
              to: 'docs/architecture/system-network/intro',
            },
            {
              label: 'Infrastructure As Code',
              to: 'docs/architecture/iac/intro',
            }
          ],
        },

        // {
        //   type: 'docSidebar',
        //   sidebarId: 'devopsSidebar',
        //   position: 'left',
        //   label: 'DevOps'
        // },
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'infrastructureSidebar',
        //   position: 'left',
        //   label: 'Infrastructure',
        // },
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'tutorialSidebar',
        //   position: 'left',
        //   label: 'Architecture',
        // },
        { to: '/Security', label: 'Security', position: 'left' },
        { to: '/ai', label: 'Artificial Intelligence', position: 'left' },
        { to: '/blog', label: 'PoC & Tools', position: 'left' },
        { to: '/blog', label: 'About', position: 'right' },
        {
          type: 'search',
          position: 'right',
        },
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Le Moment IT`,
    },
    plugins: [
      require.resolve("docusaurus-lunr-search"), {
        languages: ['en']
      }
    ],
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
