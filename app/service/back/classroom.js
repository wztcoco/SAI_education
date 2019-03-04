'use strict';

const Service = require('egg').Service;
const Underscore=require("underscore");

class ClassroomService extends Service {
    async getClassroomList(params) {
        const {ctx} = this;
        let send_json = {};
        const {page_index, page_size,school_id} = params;
        const keywords = params.keywords ? params.keywords : "";
        const search_obj = {
            classroom_name: {$like: '%' + keywords + '%'},
            school_id:school_id,
            delete_status:0
        };
        const sql_option = {
            where: search_obj,
            attributes: ['classroom_id', 'classroom_name', 'classroom_intro',"classroom_type","classroom_area"]
        };
        if (page_size !== 0) {
            sql_option.offset = (page_index - 1) * page_size;
            sql_option.limit = page_size;
        }
        const classroom_list = await ctx.model.SaiClassroom.findAndCountAll(sql_option);
        if (!classroom_list) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            let final_data = {};
            final_data.classroom_list = classroom_list.rows;
            final_data.total = classroom_list.count;
            send_json = ctx.helper.success("登录成功", final_data);
        }
        return send_json;

    }
    async deleteClassroom(params) {
        const {ctx} = this;
        let send_json = {};
        const {operate_id, classroom_id_list} = params;
        const update_obj = {
            delete_status: 1,
            opt_id: operate_id,
        };
        const search_obj = {
            classroom_id: classroom_id_list,
            delete_status: 0
        };
        const delete_result = await ctx.model.SaiClassroom.update(update_obj, {
            where: search_obj
        });
        if(!delete_result) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {

            send_json = ctx.helper.success("删除成功");
        }
        return send_json;

    }

    async getClassroomDetail(params) {
        const {ctx} = this;
        let send_json = {};
        const {classroom_id} = params;
        const search_obj = {
            classroom_id:classroom_id
        };
        const sql_option = {
            where: search_obj,
            attributes: ['classroom_id', 'classroom_name', 'classroom_area','classroom_intro','classroom_type']
        };
        const classroom_data = await ctx.model.SaiClassroom.findOne(sql_option);
        if (!classroom_data) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {

            send_json = ctx.helper.success("查询成功", classroom_data);
        }
        return send_json;

    }
    async postClassroomDetail(params) {
        const {ctx} = this;
        let send_json = {};
        const {school_id,classroom_id,classroom_name,classroom_area,classroom_intro,classroom_type} = params;
        const operate_obj = {
            school_id:school_id,
            classroom_name:classroom_name,
            classroom_area:classroom_area,
            classroom_intro:classroom_intro,
            classroom_type:classroom_type
        };
        const search_obj = {
            classroom_id: classroom_id,
            delete_status:0
        };
        if(classroom_id==='')
        {
            const create_result = await ctx.model.SaiClassroom.create(operate_obj);
            if (!create_result) {
                send_json = this.ctx.helper.failed(-1, "系统内部错误");
            } else {
                send_json = ctx.helper.success("添加成功");
            }
            return send_json;
        } else{
            const update_result = await ctx.model.SaiClassroom.update(operate_obj, {
                where: search_obj
            });
            if (!update_result) {
                send_json = this.ctx.helper.failed(-1, "系统内部错误");
            } else {
                send_json = ctx.helper.success("编辑成功");
            }
            return send_json;
        }

    }
}
module.exports =ClassroomService;
