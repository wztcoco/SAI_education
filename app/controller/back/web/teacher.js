const Controller = require('egg').Controller;
class HomeController extends Controller {


    async teacherListPage() {
        const { ctx } = this;
        await ctx.render('back/teacher/list',{
            keywords:ctx.query.keywords,
            page_index:ctx.query.page_index,
            page_size:ctx.query.page_size
        });
    }

    async teacherDetailPage() {
        const { ctx } = this;
        await ctx.render('back/teacher/detail',{
            keywords:ctx.query.keywords,
            page_index:ctx.query.page_index,
            page_size:ctx.query.page_size
        });
    }


}


module.exports = HomeController;