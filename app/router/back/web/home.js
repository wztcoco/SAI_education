module.exports = app => {
    const { router, controller } = app;
    router.get('/back/page/index', controller.back.web.home.index);//主页面
};