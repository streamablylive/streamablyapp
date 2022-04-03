module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  
  ],  // safelist:/data-theme$/,
  darkMode: "class", // or 'media' or 'class' 
  theme: {
    extend: {
      colors: {
        'custom-green':'#2CD910',
        'custom-gray':'#353C42',
        'gray2':'#2E3237',
        'bg':'#212529'
      },
      spacing:{
        '530': '530px',
        '500':'500px',
        '800':'800px',
        '500':'500px',
        '300':'300px',
        '18':'72px'
       }
    },
  },
  daisyui: {
    themes: [
      {
        'blue': {                          /* your theme name */
           'primary' : '#00bcd4',           /* Primary color */
           'primary-focus' : '#ba76bf',     /* Primary color - focused */
           'primary-content' : '#ffffff',   /* Foreground content color to use on primary color */

           'neutral' : '#353C42',           /* Neutral color */
           'neutral-focus' : '#2a2e37',     /* Neutral color - focused */
           'neutral-content' : '#ffffff',   /* Foreground content color to use on neutral color */

           'base-content' : '#00bcd4',      /* Foreground content color to use on base color */
        },
        'pink': {                          /* your theme name */
          'primary' : '#ba76bf',           /* Primary color */
          'primary-focus' : '#00bcd4',     /* Primary color - focused */
          'primary-content' : '#ffffff',   /* Foreground content color to use on primary color */

          'neutral' : '#353C42',           /* Neutral color */
          'neutral-focus' : '#2a2e37',     /* Neutral color - focused */
          'neutral-content' : '#ffffff',   /* Foreground content color to use on neutral color */

          'base-content' : '#ba76bf',      /* Foreground content color to use on base color */
       },
        'orange': {                          /* your theme name */
          'primary' : '#e56024',           /* Primary color */
          'primary-focus' : '#e56024',     /* Primary color - focused */
          'primary-content' : '#ffffff',   /* Foreground content color to use on primary color */

          'neutral' : '#353C42',           /* Neutral color */
          'neutral-focus' : '#2a2e37',     /* Neutral color - focused */
          'neutral-content' : '#ffffff',   /* Foreground content color to use on neutral color */

          'base-content' : '#e56024',      /* Foreground content color to use on base color */
       },
      },
      {
        'green': {                          /* your theme name */
           'primary' : '#37ff77',           /* Primary color */
           'primary-focus' : '#37ff77',     /* Primary color - focused */
           'primary-content' : '#ffffff',   /* Foreground content color to use on primary color */

           'neutral' : '#353C42',           /* Neutral color */
           'neutral-focus' : '#2a2e37',     /* Neutral color - focused */
           'neutral-content' : '#ffffff',   /* Foreground content color to use on neutral color */

           'base-100' : '#353C42',          /* Base color of page, used for blank backgrounds */
           'base-200' : '#353C42',          /* Base color, a little darker */
           'base-300' : '#353C42',          /* Base color, even more darker */
           'base-content' : '#37ff77',      /* Foreground content color to use on base color */

           'info' : '#2094f3',              /* Info */
           'success' : '#009485',           /* Success */
           'warning' : '#ff9900',           /* Warning */
           'error' : '#ff5724',             /* Error */
        },
      }
    ],
  },
  variants: { 
    extend: {},
  },
  plugins: [
    require('daisyui')],
}