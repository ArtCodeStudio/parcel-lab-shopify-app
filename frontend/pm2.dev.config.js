/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
// const path = require('path');
module.exports = {
  apps: [
    {
      name: 'pl-front:dev',
      script: 'yarn run watch',
      watch: false, // path.join(__dirname, 'src'),
      // https://github.com/paulmillr/chokidar#api
      // watch_options: {},
      instances: 1,
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
};
