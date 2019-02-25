'use strict';

const Service = require('egg').Service;
const Underscore=require("underscore");

class TeacherService extends Service {
    async getTeacherList(params) {
        const {ctx} = this;
        let send_json = {};
        const {page_index, page_size,school_id} = params;
        const keywords = params.keywords ? params.keywords : "";
        const search_obj = {
            real_name: {$like: '%' + keywords + '%'},
            school_id:school_id
        };
        const sql_option = {
            where: search_obj,
            attributes: ['teacher_id','teacher_number', 'real_name','sex',"teacher_birthday","id_card_number","telephone","specialty_name","teacher_static"]
        };
        if (page_size !== 0) {
            sql_option.offset = (page_index - 1) * page_size;
            sql_option.limit = page_size;
        }
        const teacher_list = await ctx.model.ViTeacher.findAndCountAll(sql_option);
        if (!teacher_list) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            let final_data = {};
            final_data.teacher_list = teacher_list.rows;
            final_data.total = teacher_list.count;
            send_json = ctx.helper.success("登录成功", final_data);
        }
        return send_json;

    }
    async deleteTeacher(params) {
        const {ctx} = this;
        let send_json = {};
        const {operate_id, teacher_id_list} = params;
        const update_obj = {
            delete_status: 1,
            opt_id: operate_id,
        };
        const search_obj = {
            teacher_id: teacher_id_list,
            delete_status: 0
        };
        const delete_result = await ctx.model.SaiUserTeacher.update(update_obj, {
            where: search_obj
        });
        if(!delete_result) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {

            send_json = ctx.helper.success("删除成功");
        }
        return send_json;

    }

    async getTeacherDetail(params) {
        const {ctx} = this;
        let send_json = {};
        const {teacher_id} = params;
        const search_obj = {
            teacher_id:teacher_id
        };
        const sql_option = {
            where: search_obj,
            attributes: ['teacher_id','teacher_number', 'real_name','sex',"teacher_birthday","id_card_number","telephone","specialty_id","teacher_static"]
        };
        const teacher_data = await ctx.model.ViTeacher.findOne(sql_option);
        if (!teacher_data) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {

            send_json = ctx.helper.success("查询成功", teacher_data);
        }
        return send_json;

    }
    async postTeacherDetail(params) {
        const {ctx} = this;
        let send_json = {};
        const {teacher_id,teacher_number,real_name,teacher_birthday,id_card_number,telephone,specialty_id,sex,teacher_static} = params;
        const operate_obj = {
            teacher_number:teacher_number,
            real_name:real_name,
            teacher_birthday:teacher_birthday,
            id_card_number:id_card_number,
            telephone:telephone,
            specialty_id:specialty_id,
            sex:sex,
            teacher_static:teacher_static
        };
        const search_obj = {
            teacher_id: teacher_id,
            delete_status:0
        };
        if(teacher_id==='')
        {
            const create_result1 = await ctx.model.SaiUser.create({nick_name:real_name,user_type:2});
            operate_obj.user_id = create_result1.user_id;
            const create_result = await ctx.model.SaiUserTeacher.create(operate_obj);

            if (!create_result) {
                send_json = this.ctx.helper.failed(-1, "系统内部错误");
            } else {
                send_json = ctx.helper.success("添加成功");
            }
            return send_json;
        } else{
            const update_result = await ctx.model.SaiUserTeacher.update(operate_obj, {
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
    async getSpecialtyList(params){
        const {ctx} = this;
        let send_json = {};
        const {school_id} = params;
        const search_obj = {
            school_id:school_id,
            delete_status:0
        };
        const sql_option = {
            where: search_obj,
            attributes: ['specialty_id','specialty_name']
        };
        const specialty_list = await ctx.model.SaiSpecialty.findAll(sql_option);
        if (!specialty_list) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            let final_data = {};
            final_data.specialty_list = specialty_list;
            send_json = ctx.helper.success("查询成功", final_data);
        }
        return send_json;

    }

}
module.exports =TeacherService;
