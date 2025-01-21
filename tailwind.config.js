export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tile-bg': "rgba(var(--tile-bg))",
        'tile-gradient-first': "rgba(var(--tile-gradient-first))",
        'tile-gradient-second': "rgba(var(--tile-gradient-second))",
        'tile-gradient-third': "rgba(var(--tile-gradient-third))",

        'bar-bg': "rgba(var(--bar-bg))",
        'bar-button-bg': "rgba(var(--bar-button-bg))",
        'bar-button-hover-bg': "rgba(var(--bar-button-hover-bg))",

        'card-top-bg': "rgba(var(--card-top-bg))",
        'card-bottom-bg': "rgba(var(--card-bottom-bg))",

        'shadow-bg': "rgba(var(--shadow-bg))",
        'big-font-c': "rgba(var(--big-font-c))",

        'large-font-c': "rgba(var(--large-font-c))",
        'medium-font-c': "rgba(var(--medium-font-c))",
        'small-font-c': "rgba(var(--small-font-c))",
        'xtraSmall-font-c': "rgba(var(--xtrasmall-font-c))",
        'bar-border-c': "rgba(var(--bar-border-c))",
      },
      backgroundImage: {
        'rain-landscape': "url('/src/assets/ghibli_landscape.jpg')",
      },
      gridTemplateColumns: {
        '24': 'repeat(24, minmax(0, 1fr))',
      },
      width: {
        'smallScreen': '400px',
        'mediumScreen': '600px',
        'largeScreen': '800px',
        'xLargeScreen': '1080px',
        '2xLargeScreen': '1280px',
        '1680': '1680px',
        '1280': '1280px',
        '880': '880px',
        '600': '600px',
        'icon-large': "var(--icon-large)",
      },
      height: {
        'smallScreen': '240px',
        'mediumScreen': '400px',
        'largeScreen': '500px',
        'xLargeScreen': '600px',
        '2xLargeScreen': '880px',
        '1080': '1080px',
        '960': '960px',
        '880': '880px',
        '720': '720px',
        '600': '600px',
      },
      fontSize: {
        'fs-small': "var(--fs-small)",
        'fs-medium': "var(--fs-medium)",
        'fs-large': "var(--fs-large)",
        'fs-xtraSmall': "var(--fs-xtraSmall)",
      }
    },
  },
  plugins: [],
}

