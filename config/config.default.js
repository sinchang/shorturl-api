'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1522683389656_7737';

  // add your config here
  config.middleware = [];

  config.weiboToken = process.env.weiboToken;

  config.sites = [ 'weibo', 'tinyurl' ];

  return config;
};
