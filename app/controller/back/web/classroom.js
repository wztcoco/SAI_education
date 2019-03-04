const Controller = require('egg').Controller;
class HomeController extends Controller {


    async classroomListPage() {
        const { ctx } = this;
        await ctx.render('back/classroom/list',{
            keywords:ctx.query.keywords,
            page_index:ctx.query.page_index,
            page_size:ctx.query.page_size
        });
    }

    async classroomDetailPage() {
        const { ctx } = this;
        await ctx.render('back/classroom/detail',{
            keywords:ctx.query.keywords,
            page_index:ctx.query.page_index,
            page_size:ctx.query.page_size
        });
    }


}


module.exports = HomeController;