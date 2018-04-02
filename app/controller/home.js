'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { config, ctx } = this;
    const { site, url } = ctx.request.query;
    const weiboApiUrl = 'https://api.weibo.com/2/short_url';
    const tinyUrlApiUrl = 'http://tinyurl.com/api-create.php';
    let result = '';

    if (config.sites.indexOf(site) === -1 || !site || !url) {
      ctx.status = 400;
      ctx.body = { message: 'parameter site and url is required' };
      return;
    }

    if (site === 'weibo') {
      result = await ctx.curl(`${weiboApiUrl}/shorten.json?url_long=${encodeURIComponent(url)}&access_token=${config.weiboToken}`, {
        dataType: 'json',
        timeout: 3000,
      });

      if (result.status !== 200) {
        ctx.status = result.status;
        ctx.body = { message: result.data.error };
        return;
      }

      ctx.body = { url: result.data.urls[0].url_short };
      return;
    }

    if (site === 'tinyurl') {
      result = await ctx.curl(`${tinyUrlApiUrl}?url=${url}`, {
        timeout: 3000,
      });

      if (result.status !== 200) {
        ctx.status = result.status;
        ctx.body = { message: 'server error' };
        return;
      }

      ctx.body = { url: result.data.toString() };
      return;
    }
  }
}

module.exports = HomeController;
