module.exports = app => {
    const { router, controller } = app;
    router.get('/back/page/classroom/list', controller.back.web.classroom.classroomListPage);//主页面
    router.get('/back/page/classroom/detail', controller.back.web.classroom.classroomDetailPage);//主页面
};