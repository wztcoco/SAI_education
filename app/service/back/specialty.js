'use strict';

const Service = require('egg').Service;
const Underscore=require("underscore");

class SpecialtyService extends Service {
    async getSpecialtyList(params) {
        const {ctx} = this;
        let send_json = {};
        const {page_index, page_size} = params;
        const keywords = params.keywords ? params.keywords : "";
        const search_obj = {
            specialty_name: {$like: '%' + keywords + '%'},
            delete_status: 0,
            school_id:ctx.session.schoolId
        };
        const sql_option = {
            where: search_obj,
            attributes: ['specialty_id', 'specialty_name','specialty_intro', 'specialty_code', 'real_name',"class_count","student_count","teacher_count"]
        };
        if (page_size !== 0) {
            sql_option.offset = (page_index - 1) * page_size;
            sql_option.limit = page_size;
        }
        const specialty_list = await ctx.model.ViBackSpecialty.findAndCountAll(sql_option);
        if (!specialty_list) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            let final_data = {};
            final_data.specialty_list = specialty_list.rows;
            final_data.total = specialty_list.count;
            send_json = ctx.helper.success("登录成功", final_data);
        }
        return send_json;

    }
    async deleteSpecialty(params) {
        const {ctx} = this;
        let send_json = {};
        const {operate_id, specialty_id_list} = params;
        const update_obj = {
            delete_status: 1,
            opt_id: operate_id,
        };
        const search_obj = {
            specialty_id: specialty_id_list,
            delete_status: 0
        };
        console.log(specialty_id_list);
        const delete_result = await ctx.model.SaiSpecialty.update(update_obj, {
            where: search_obj
        });
        if(!delete_result) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {

            send_json = ctx.helper.success("删除成功");
        }
        return send_json;

    }

    async getSpecialtyDetail(params) {
        const {ctx} = this;
        let send_json = {};
        const {specialty_id} = params;
        const search_obj = {
            specialty_id:specialty_id
        };
        const sql_option = {
            where: search_obj,
            attributes: ['specialty_id', 'specialty_name','specialty_intro', 'specialty_code', 'real_name',"class_count","student_count","teacher_count"]
        };
        const specialty_data = await ctx.model.ViBackSpecialty.findOne(sql_option);
        if (!specialty_data) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {

            send_json = ctx.helper.success("查询成功", specialty_data);
        }
        return send_json;

    }
    async postSpecialtyDetail(params) {
        const {ctx} = this;
        let send_json = {};
        const {specialty_id,specialty_name,specialty_code,specialty_intro,school_id} = params;
        const operate_obj = {
            specialty_name:specialty_name,
            specialty_code:specialty_code,
            specialty_intro:specialty_intro
        };
        const search_obj = {
            specialty_id: specialty_id,
            delete_status:0
        };
        if(specialty_id==='')
        {
            operate_obj.school_id=school_id;
            const create_result = await ctx.model.SaiSpecialty.create(operate_obj);
            if (!create_result) {
                send_json = this.ctx.helper.failed(-1, "系统内部错误");
            } else {
                send_json = ctx.helper.success("添加成功");
            }
            return send_json;
        } else{
            const update_result = await ctx.model.SaiSpecialty.update(operate_obj, {
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
module.exports = SpecialtyService;
