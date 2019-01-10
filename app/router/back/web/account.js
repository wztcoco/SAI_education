module.exports = app => {
    const { router, controller } = app;
    router.get('/back/page/login', controller.back.web.account.login);//登录页面
};