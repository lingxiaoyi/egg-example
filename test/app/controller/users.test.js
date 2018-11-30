
'use strict';
// test/app/controller/users.test.js
require('../../.setup.js');
const { assert, app } = require('egg-mock/bootstrap');
describe('test/app/controller/users.test.js', () => {
  describe('GET /users', () => {
    it('should work', async () => {
      // 通过 factory-girl 快速创建 user 对象到数据库中
      await app.factory.createMany('users', 3);
      const res = await app.httpRequest().get('/users?limit=2&offset=0');
      assert(res.status === 200);
      assert(res.body.length === 2);
      assert(res.body[0].email);
      assert(res.body[0].password);
    });
  });

  describe('GET /users/:id', () => {
    it('should work', async () => {
      const user = await app.factory.create('users');
      const res = await app.httpRequest().get(`/users/${user.id}`);
      assert(res.status === 200);
      assert(res.body.email === user.email);
    });
  });

  describe('POST /users', () => {
    it('should work', async () => {
      app.mockCsrf();
      let res = await app.httpRequest().post('/users')
        .send({
          email: 'sadad@qq.com',
          password: '2121212',
        });
      assert(res.status === 201);
      assert(res.body.id);

      res = await app.httpRequest().get(`/users/${res.body.id}`);
      assert(res.status === 200);
      assert(res.body.email === 'sadad@qq.com');
    });
  });

  describe('DELETE /users/:id', () => {
    it('should work', async () => {
      const user = await app.factory.create('users');

      app.mockCsrf();
      const res = await app.httpRequest().delete(`/users/${user.id}`);
      assert(res.status === 200);
    });
  });
});
