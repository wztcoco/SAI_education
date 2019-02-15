'use strict';

const Service = require('egg').Service;
const Underscore=require("underscore");

class ClassService extends Service {
    async getClassList(params) {
        const {ctx} = this;
        let send_json = {};
        const {page_index, page_size,school_id} = params;
        const keywords = params.keywords ? params.keywords : "";
        const search_obj = {
            class_name: {$like: '%' + keywords + '%'},
            school_id:school_id
        };
        const sql_option = {
            where: search_obj,
            attributes: ['class_id', 'class_name', 'real_name',"student_count","teacher_count","specialty_id","specialty_name"]
        };
        if (page_size !== 0) {
            sql_option.offset = (page_index - 1) * page_size;
            sql_option.limit = page_size;
        }
        const class_list = await ctx.model.ViBackClass.findAndCountAll(sql_option);
        if (!class_list) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            let final_data = {};
            final_data.class_list = class_list.rows;
            final_data.total = class_list.count;
            send_json = ctx.helper.success("登录成功", final_data);
        }
        return send_json;

    }
    async deleteClass(params) {
        const {ctx} = this;
        let send_json = {};
        const {operate_id, class_id_list} = params;
        const update_obj = {
            delete_status: 1,
            opt_id: operate_id,
        };
        const search_obj = {
            class_id: class_id_list,
            delete_status: 0
        };
        const delete_result = await ctx.model.SaiClass.update(update_obj, {
            where: search_obj
        });
        if(!delete_result) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {

            send_json = ctx.helper.success("删除成功");
        }
        return send_json;

    }

    async getClassDetail(params) {
        const {ctx} = this;
        let send_json = {};
        const {class_id} = params;
        const search_obj = {
            class_id:class_id
        };
        const sql_option = {
            where: search_obj,
            attributes: ['class_id', 'class_name', 'head_teacher','real_name',"student_count","teacher_count","specialty_id","specialty_name"]
        };
        const class_data = await ctx.model.ViBackClass.findOne(sql_option);
        if (!class_data) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {

            send_json = ctx.helper.success("查询成功", class_data);
        }
        return send_json;

    }
    async postClassDetail(params) {
        const {ctx} = this;
        let send_json = {};
        const {class_id,class_name,specialty_id} = params;
        const teacher_id = params.teacher_id ? params.teacher_id : 0;
        const operate_obj = {
            class_name:class_name,
            specialty_id:specialty_id,
            head_teacher:teacher_id
        };
        const search_obj = {
            class_id: class_id,
            delete_status:0
        };
        if(class_id==='')
        {
            const create_result = await ctx.model.SaiClass.create(operate_obj);
            if (!create_result) {
                send_json = this.ctx.helper.failed(-1, "系统内部错误");
            } else {
                send_json = ctx.helper.success("添加成功");
            }
            return send_json;
        } else{
            const update_result = await ctx.model.SaiClass.update(operate_obj, {
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
            school_id:school_id
        };
        const sql_option = {
            where: search_obj,
            attributes: ['specialty_id', 'specialty_name']
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
    async getTeacherList(params){
        const {ctx} = this;
        let send_json = {};
        const {specialty_id} = params;
        const search_obj = {
            specialty_id:specialty_id
        };
        const sql_option = {
            where: search_obj,
            attributes: ['teacher_id', 'real_name']
        };
        const teacher_list = await ctx.model.SaiUserTeacher.findAll(sql_option);
        if (!teacher_list) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            let final_data = {};
            final_data.teacher_list = teacher_list;
            send_json = ctx.helper.success("查询成功", final_data);
        }
        return send_json;

    }
}
module.exports =ClassService;
