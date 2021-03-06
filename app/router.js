'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  //前端渲染路由
  require('./router/front/web/test')(app);


  //前台api
  require('./router/front/api/index')(app);

  require('./router/front/api/common')(app);
  //后台路由
  require('./router/back/web/account')(app);
  require('./router/back/web/home')(app);
  require('./router/back/web/specialty')(app);
  require('./router/back/web/classs')(app);
  require('./router/back/web/student')(app);
  require('./router/back/web/teacher')(app);
  require('./router/back/web/classroom')(app);
  //后台api
  require('./router/back/api/index')(app);
  require('./router/back/api/saicolumn')(app);
};
