'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.resources('users', '/users', controller.users);

  router.post('/api/v1/add_root_data', controller.ad.addRootData); // 添加基础数据
  router.post('/api/v1/add_root_ads', controller.ad.bulkCreateAd); // 添加 ad基础数据
  router.resources('ad', '/api/v1/ad', controller.ad);
  router.resources('qid', '/api/v1/qid', controller.qid);
  router.resources('page', '/api/v1/page', controller.page);
  router.get('/api/v1/generate_ggfile', controller.index.index);
};
