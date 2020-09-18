const path = require('path');
module.exports = {
  apps : [{
    name        : "pl:dev",
    script      : "npm run start:debug",
    watch       : false, // path.join(__dirname, 'src'),
    // https://github.com/paulmillr/chokidar#api
    // watch_options: {},
    instances: 1,
    env: {
      "NODE_ENV": "development",
      "DEBUG": "instagram:*,facebook:*,shopify:*,app:*,service:*,controller:*"
    }
  }]
};