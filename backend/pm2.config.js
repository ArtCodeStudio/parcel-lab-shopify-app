// start me with pm2 start pm2.dev.config.js
module.exports = {
  apps : [{
    name        : "pl",
    script      : "yarn run start:prod",
    watch       : false,
    env: {
      "NODE_ENV": "production",
    }
  }]
};