'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {
 //前端api
    async home() {
        const pathName=this.ctx.params.fun;
        const subclass=this.ctx.params.subclass;
  //首字母小写
        const funName=pathName.replace(/(\w)/,function(v){return v.toLowerCase();});
        console.log(funName);
        this.ctx.logger.info('some request data: %j', this.ctx.request.body);
        let result = await this.ctx.service.front[subclass][funName](this.ctx.request.body.args);
        this.ctx.body = result;
  }
}

module.exports = IndexController;
