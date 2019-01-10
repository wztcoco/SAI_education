module.exports = app => {

    const { router, controller } = app;
    const index =  controller.back.api.index;
    const base_path = '/back/api/';
    router.post(base_path+':subclass/:fun',index.home);
};