const Service = require('egg').Service;
const Underscore = require("underscore");
const Moment = require("moment");
const constant = require('../../public/common/constant');

class AnnounceService extends Service {
    async getAnnounceList(params) {
        const {ctx} = this;
        let send_json = {};
        const {user_id} = params;
        const search_user_obj={
            user_id:user_id,
            delete_status: 0
        };
        const sql_user_option = {
            where: search_user_obj,
            attributes: ['user_type']
        };
        const user_detail = await ctx.model.SaiUser.findOne(sql_user_option);
        let announce_list;
        if(user_detail.user_type===1)
        {
            const search_school_obj = {
                user_id: user_id
            };
            const sql_school_option = {
                where: search_school_obj,
                attributes: ['school_id']
            };
            const student_school = await ctx.model.ViBackStudentDetail.findOne(sql_school_option);
            const search_announce_obj = {
                school_id: student_school.school_id,
                delete_status:0,
                announce_to:{$gte:1}
            };
            const sql_announce_option = {
                where: search_announce_obj,
                attributes:  ['announce_id','announce_type_id','add_time','announce_title'],

            };
            announce_list = await ctx.model.SaiAnnounce.findAll(sql_announce_option);
            console.log(announce_list);
        } else if(user_detail.user_type===2) {
            const search_school_obj = {
                user_id: user_id
            };
            const sql_school_option = {
                where: search_school_obj,
                attributes: ['school_id']
            };
            const teacher_school = await ctx.model.ViTeacher.findOne(sql_school_option);
            const search_announce_obj = {
                school_id: teacher_school.school_id,
                delete_status:0,
                announce_to:{$lte:1}
            };
            const sql_announce_option = {
                where: search_announce_obj,
                attributes: ['announce_id','announce_type_id','add_time','announce_title'],

            };
            announce_list = await ctx.model.SaiAnnounce.findAll(sql_announce_option);
        }
        console.log(announce_list);
        const announce_data_list = Underscore.pluck(announce_list,"dataValues");
        const announce_id_list = Underscore.pluck(announce_data_list,"announce_id");
        const search_announce_obj = {
            announce_id: announce_id_list,
            user_id:user_id,
            delete_status:0
        };
        const sql_announce_option = {
            where: search_announce_obj,
            attributes: ['announce_id']
        };
        const is_announced_result = await ctx.model.SaiAnnounceUserBind.findAll(sql_announce_option);
        const is_announced_list = Underscore.pluck(is_announced_result,"dataValues");
        const is_announced_id_list = Underscore.pluck(is_announced_list,"announce_id");
        let announce_final_list=[];
        Underscore.map(announce_data_list,function (item) {
            let read_status = 0;
            if(is_announced_id_list.indexOf(item.announce_id)!==-1)
                read_status = 1;
            let data = {
                announce_id:item.announce_id,
                announce_type_id:item.announce_type_id,
                announce_title:item.announce_title,
                add_time:Moment(item.add_time).format('YYYY-MM-DD HH:mm:ss'),
                read_status:read_status
            };
            announce_final_list.push(data);
        });
        if (!announce_final_list) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            let final_data = {};
            final_data.announce_list = announce_final_list;
            send_json = ctx.helper.success("查询成功", final_data);
        }
        return send_json;

    }
    async getAnnounceDetail(params) {
        const {ctx} = this;
        let send_json = {};
        const {user_id,announce_id} = params;
        let date = new Date();
        const search_announce_obj={
            announce_id:announce_id
        };
        const sql_announce_option = {
            where: search_announce_obj,
            attributes: ['announce_type_id','announce_title','add_time','announce_content']
        };
        const announce_result = await ctx.model.SaiAnnounce.findOne(sql_announce_option);
        let final_data={
            announce_type_id:announce_result.announce_type_id,
            announce_title:announce_result.announce_title,
            add_time:Moment(announce_result.add_time).format('YYYY-MM-DD HH:mm:ss'),
            announce_content:announce_result.announce_content
        };
        const create_announce_obj={
            user_id:user_id,
            announce_id:announce_id,
            add_time: date
        };
        const find_obj = {
            user_id:user_id,
            announce_id:announce_id,
        };
        const find_option={
            where:find_obj
        };
        const is_create = await ctx.model.SaiAnnounceUserBind.findOne(find_option);
        if(!is_create) {
            const create_announce_result = await ctx.model.SaiAnnounceUserBind.create(create_announce_obj);
        }
        if (!final_data) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            send_json = ctx.helper.success("查询成功", final_data);
        }
        return send_json;

    }
}

module.exports = AnnounceService;