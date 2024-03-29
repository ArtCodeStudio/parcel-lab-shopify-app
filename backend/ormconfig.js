/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

module.exports = {
  name: 'default',
  type: 'mongodb',
  url: process.env.MONGODB_URL,
  entities: ['src/**/**.entity{.ts,.js}'],
};
