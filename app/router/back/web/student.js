module.exports = app => {
    const { router, controller } = app;
    router.get('/back/page/student/list', controller.back.web.student.studentListPage);//主页面
    router.get('/back/page/student/detail', controller.back.web.student.studentDetailPage);//主页面
};