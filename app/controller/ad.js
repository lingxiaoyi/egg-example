'use strict';

const Controller = require('egg').Controller;

class AdController extends Controller {
  async createProject() {
    const body = ctx.request.body;
    try {
      const data = await PageModel.createPage({
        project: body.project,
      });
      ctx.rest(data);
    } catch (e) {
      throw new APIError(e);
    }
  }
}

module.exports = AdController;
