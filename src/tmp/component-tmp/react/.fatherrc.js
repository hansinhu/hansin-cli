export default {
  cjs: 'babel',
  esm: { type: 'babel', importLibToEs: true },
  preCommit: {
    eslint: true,
    prettier: true,
  },
  doc: {
    themeConfig: {
      mode: 'dark',
    },
    htmlContext: {
      head: {
        links: [
          {
            rel: 'icon',
            type: 'image/jpeg',
            href: '//f.cfcdn.club/assets/e74d553b8758bac8e660f2db50a1bee9_40x40.jpeg',
          },
        ],
      }
    }
  }
};
