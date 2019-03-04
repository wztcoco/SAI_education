module.exports = app => {
    const { router, controller } = app;
    router.post('/front/common/file/upload', controller.front.api.common.upload);
};