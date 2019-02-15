//后台首页

'use strict';

const Controller = require('egg').Controller;
class HomeController extends Controller {
    async index() {
        const { ctx } = this;
        const viewOptions = {
            layout: 'layout.html'
        };
        const userId=this.ctx.session.adminId;
        const name=this.ctx.session.adminName;
        const schoolId=this.ctx.session.schoolId;
        const schoolName=this.ctx.session.schoolName;
        this.ctx.logger.info('some request data: %j', ctx.session);
        await ctx.render('back/index',{
            admin_id:userId,
            admin_name: name,
            admin_school_id:schoolId,
            admin_school_name: schoolName
        } ,viewOptions);
    }

}


module.exports = HomeController;