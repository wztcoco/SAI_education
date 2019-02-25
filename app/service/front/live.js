const Service = require('egg').Service;
const Underscore = require("underscore");
const Moment = require("moment");
const constant = require('../../public/common/constant');

class AnnounceService extends Service {
    async getLiveBannerList(params) {
        const {ctx} = this;
        let send_json = {};
        const {} = params;
        const search_banner_obj={
            delete_status: 0,
            bind_type:6
        };
        const sql_banner_option = {
            where: search_banner_obj,
            attributes: ['bind_id','images_path','images_url']
        };
        const images_result = await ctx.model.SaiImages.findAll(sql_banner_option);

        if (!images_result) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            let final_data = {};
            final_data.banner_list = images_result;
            send_json = ctx.helper.success("查询成功", final_data);
        }
        return send_json;

    }
    async getLiveList(params) {
        const {ctx} = this;
        let send_json = {};
        const {user_id} = params;
        const search_time_obj={
            user_id:user_id,
        };
        const sql_time_option = {
            where: search_time_obj,
            attributes: ['live_id'],
            order:[['learn_time','DESC']]
        };
        const time_result = await ctx.model.ViStudentLiveTime.findAll(sql_time_option);
        const time_dataValues_result = Underscore.pluck(time_result,"dataValues");
        const time_id_result = Underscore.pluck(time_dataValues_result,"live_id");
        const search_live_obj = {
            delete_status: 0
        };
        const sql_live_option = {
            where: search_live_obj,
            attributes: ['live_id','live_name'],
            order:[['watch_count','DESC']]
        };
        const live_result = await ctx.model.SaiLive.findAll(sql_live_option);
        const live_dataValues_result = Underscore.pluck(live_result,"dataValues");
        const search_img_obj = {
            delete_status: 0,
            bind_type: 7
        };
        const sql_img_option = {
            where: search_img_obj,
            attributes: ['bind_id','images_url']
        };
        const img_result = await ctx.model.SaiImages.findAll(sql_img_option);
        const img_dataValues_result = Underscore.pluck(img_result,"dataValues");
        if (!live_dataValues_result) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            let final_data = {};
            let live_list = [];
            Underscore.map(time_id_result,function (item1) {
                const live_data = Underscore.where(live_dataValues_result,{live_id:item1});
                const img_data = Underscore.where(img_dataValues_result,{bind_id:item1});
                let data = {
                    live_id:item1,
                    live_name:live_data[0].live_name,
                    images_url:""
                };
                if(img_data[0])
                    data.images_url = img_data[0].images_url;
                live_list.push(data);
            });
            const data1 = Underscore.reject(live_dataValues_result,function (item) {
                return (Underscore.contains(time_id_result,item.live_id))
            });
            Underscore.map(data1,function (item2) {
                const img_data = Underscore.where(img_dataValues_result,{bind_id:item2.live_id});
                let data = {
                    live_id:item2.live_id,
                    live_name:item2.live_name,
                    images_url:""
                };
                if(img_data[0])
                    data.images_url = img_data[0].images_url;
                live_list.push(data);
            });
            final_data.live_list=live_list;
            send_json = ctx.helper.success("查询成功", final_data);
        }
        return send_json;

    }
}

module.exports = AnnounceService;