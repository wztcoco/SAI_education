const Controller = require('egg').Controller;
class HomeController extends Controller {


    async classListPage() {
        const { ctx } = this;
        await ctx.render('back/class/list',{
            keywords:ctx.query.keywords,
            page_index:ctx.query.page_index,
            page_size:ctx.query.page_size
        });
    }

    async classDetailPage() {
        const { ctx } = this;
        await ctx.render('back/class/detail',{
            keywords:ctx.query.keywords,
            page_index:ctx.query.page_index,
            page_size:ctx.query.page_size
        });
    }


}


module.exports = HomeController;