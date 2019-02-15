const Controller = require('egg').Controller;
class HomeController extends Controller {


    async specialtyListPage() {
        const { ctx } = this;
        await ctx.render('back/specialty/list',{
            keywords:ctx.query.keywords,
            page_index:ctx.query.page_index,
            page_size:ctx.query.page_size
        });
    }

    async specialtyDetailPage() {
        const { ctx } = this;
        await ctx.render('back/specialty/detail',{
            keywords:ctx.query.keywords,
            page_index:ctx.query.page_index,
            page_size:ctx.query.page_size
        });
    }


}


module.exports = HomeController;