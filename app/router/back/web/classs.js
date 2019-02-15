module.exports = app => {
    const { router, controller } = app;
    router.get('/back/page/class/list', controller.back.web.classs.classListPage);//主页面
    router.get('/back/page/class/detail', controller.back.web.classs.classDetailPage);//主页面
};