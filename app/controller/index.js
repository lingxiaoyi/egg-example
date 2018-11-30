'use strict';
const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;
class HomeController extends Controller {
  async index() {
    const ctx = this.ctx;
    const projects = await ctx.model.Projects.findAll({
      attributes: [ 'id', 'project' ],
      where: {
        project: '东方体育H5',
      },
    });
    for (const project of projects) {
      const docsProObj = {}; // 每个项目生成的大JSON广告

      const pages = await ctx.model.Pages.findAll({
        attributes: [ 'id', 'pageType', 'projectId', 'name' ],
        where: {
          projectId: project.id,
        },
      });
      const qids = await ctx.model.Qids.findAll({
        attributes: [ 'id', 'qid', 'hidden' ],
        where: {
          projectId: project.id,
        },
      });
      for (const page of pages) {
        docsProObj[page.name] = {};
        for (const qid of qids) {
          docsProObj[page.name][qid.qid] = [];
          const ads = await ctx.model.Ads.findAll({
            attributes: [ 'id', 'projectId', 'pageId', 'qidId', 'ggId', 'ggType', 'hidden' ],
            where: {
              projectId: project.id,
              pageId: page.id,
              qidId: qid.id,
            },
          });
          for (const ad of ads) {
            docsProObj[page.name][qid.qid].push(ad.ggId);
          }
        }
      }
      const target = path.join(this.config.baseDir, 'app/public/ad', 'ad.channel.js');
      // 生成一个文件写入 文件流
      await fs.writeFile(target, `module.exports = ${JSON.stringify(docsProObj)}`);
      // 文件响应
      ctx.body = 'OK';
    }
  }
}

module.exports = HomeController;
