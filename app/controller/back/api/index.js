'use strict';

const Controller = require('egg').Controller;
class IndexController extends Controller {
    async home(){
        const pathName=this.ctx.params.fun;
        const subclass=this.ctx.params.subclass;
        //首字母小写
        const funName=pathName.replace(/(\w)/,function(v){return v.toLowerCase();});
        console.log(funName);
        this.ctx.logger.info('some request data: %j', this.ctx.request.body);
        let result;
        if(funName==='loginBack'){//后台登录路由单独处理，将管理员信息存入本地
            const args=this.ctx.request.body;
            const account=args.account;
            const password=args.password;
             result = await this.ctx.service.back.account.loginBack(account,password);
             if(result!==null){
                 this.ctx.session.adminName=result.obj.admin_name;//管理员用户名
                 this.ctx.session.adminRank=result.obj.admin_rank;//管理员角色等级
                 this.ctx.session.adminId=result.obj.admin_id;//管理员id
                 this.ctx.session.schoolId=result.obj.school_id;//管理员学校id
             }
        }
        else {
             result = await this.ctx.service.back[subclass][funName](this.ctx.request.body.args);
        }

        this.ctx.body = result;
    }
}

module.exports = IndexController;