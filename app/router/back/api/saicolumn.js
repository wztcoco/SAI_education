module.exports = app => {

    const { router, controller } = app;
    const index =  controller.back.api.saicolumn;
    const base_path = '/common/api/';
    router.post(base_path+':subclass/:fun',index.home);
};