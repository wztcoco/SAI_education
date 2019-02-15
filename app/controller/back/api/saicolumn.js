'use strict';

const Controller = require('egg').Controller;
class IndexController extends Controller {

    async home(){
        const funName=this.ctx.params.fun;
        const subclass=this.ctx.params.subclass;
        console.log(funName);
        this.ctx.logger.info('some request data: %j', this.ctx.request.body);
        let result ;
        // if (funName==='login')  {
        //     result = await this.ctx.service.common[subclass][funName](this.ctx.request.body.args);
        //     if (result!==null){
        //         this.ctx.session.authorized=true; //用户认证通过
        //     }
        // }
        if (funName==='getColumnList')  {//根据角色获取菜单

            const admin_rank= this.ctx.session.adminRank;//管理员角色信息
            console.log(admin_rank);
            result = await this.ctx.service.back.saicolumn.getColumnList(admin_rank);
        }
        else if (funName==='logout'){
            this.ctx.session=null; //清空session
            result = {
                data: {},
                msg: {
                    error: '',
                    prompt: '登出成功',
                },
                retcode: 1,
            };
        } else {

        }
        this.ctx.body = result;
    }
}

module.exports = IndexController;