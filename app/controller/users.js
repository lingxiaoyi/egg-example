'use strict';
const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UsersController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.body = await ctx.model.Users.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Users.findById(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { email, password } = ctx.request.body;
    const Users = await ctx.model.Users.create({ email, password });
    ctx.status = 201;
    ctx.body = Users;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const Users = await ctx.model.Users.findById(id);
    if (!Users) {
      ctx.status = 404;
      return;
    }

    const { email, password } = ctx.request.body;
    await Users.update({ email, password });
    ctx.body = Users;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const Users = await ctx.model.Users.findById(id);
    if (!Users) {
      ctx.status = 404;
      return;
    }

    await Users.destroy();
    ctx.status = 200;
  }
}

module.exports = UsersController;
