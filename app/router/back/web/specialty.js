module.exports = app => {
    const { router, controller } = app;
    router.get('/back/page/specialty/list', controller.back.web.specialty.specialtyListPage);//主页面
    router.get('/back/page/specialty/detail', controller.back.web.specialty.specialtyDetailPage);//主页面
};