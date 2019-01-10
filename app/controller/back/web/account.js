'use strict';

const Controller = require('egg').Controller;
class HomeController extends Controller {
    async login() {
        const { ctx } = this;
        const viewOptions = {
            layout: 'layout.html'
        };
        await ctx.render('back/login',{},viewOptions);
    }
}


module.exports = HomeController;
