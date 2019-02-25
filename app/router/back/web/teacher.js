module.exports = app => {
    const { router, controller } = app;
    router.get('/back/page/teacher/list', controller.back.web.teacher.teacherListPage);//主页面
    router.get('/back/page/teacher/detail', controller.back.web.teacher.teacherDetailPage);//主页面
};