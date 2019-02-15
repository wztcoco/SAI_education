const Controller = require('egg').Controller;
class HomeController extends Controller {


    async studentListPage() {
        const { ctx } = this;
        await ctx.render('back/student/list',{
            keywords:ctx.query.keywords,
            page_index:ctx.query.page_index,
            page_size:ctx.query.page_size
        });
    }

    async studentDetailPage() {
        const { ctx } = this;
        await ctx.render('back/student/detail',{
            keywords:ctx.query.keywords,
            page_index:ctx.query.page_index,
            page_size:ctx.query.page_size
        });
    }


}


module.exports = HomeController;