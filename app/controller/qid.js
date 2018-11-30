'use strict';

const Controller = require('egg').Controller;
function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}
class QidController extends Controller {
  async index() {
    const ctx = this.ctx;
    // const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    const query = { projectId: toInt(ctx.query.projectId) };
    ctx.body = await ctx.model.Qids.findAll(
      { where: query }
    );
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Qids.findByPk(toInt(ctx.params.id));
  }
  async create() {
    const ctx = this.ctx;
    const { projectId, qid } = ctx.request.body;
    const Qids = await ctx.model.Qids.create({ projectId, qid });
    ctx.status = 201;
    ctx.body = Qids;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const Qids = await ctx.model.Qids.findByPk(id);
    if (!Qids) {
      ctx.status = 404;
      return;
    }

    const { qid } = ctx.request.body;
    await Qids.update({ qid, id });
    ctx.body = Qids;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const Qids = await ctx.model.Qids.findByPk(id);
    if (!Qids) {
      ctx.status = 404;
      return;
    }

    await Qids.destroy();
    ctx.status = 200;
  }
}

module.exports = QidController;
