'use strict';

const Service = require('egg').Service;
const Underscore=require("underscore");

class StudentService extends Service {
    async getStudentList(params) {
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
            attributes: ['student_id','student_number', 'real_name','sex',"student_birthday","id_card_number","telephone","specialty_name","class_name","student_static"]
        };
        if (page_size !== 0) {
            sql_option.offset = (page_index - 1) * page_size;
            sql_option.limit = page_size;
        }
        const student_list = await ctx.model.ViBackStudentDetail.findAndCountAll(sql_option);
        if (!student_list) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            let final_data = {};
            final_data.student_list = student_list.rows;
            final_data.total = student_list.count;
            send_json = ctx.helper.success("登录成功", final_data);
        }
        return send_json;

    }
    async deleteStudent(params) {
        const {ctx} = this;
        let send_json = {};
        const {operate_id, student_id_list} = params;
        const update_obj = {
            delete_status: 1,
            opt_id: operate_id,
        };
        const search_obj = {
            student_id: student_id_list,
            delete_status: 0
        };
        const delete_result = await ctx.model.SaiStudent.update(update_obj, {
            where: search_obj
        });
        if(!delete_result) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {

            send_json = ctx.helper.success("删除成功");
        }
        return send_json;

    }

    async getStudentDetail(params) {
        const {ctx} = this;
        let send_json = {};
        const {student_id} = params;
        const search_obj = {
            student_id:student_id
        };
        const sql_option = {
            where: search_obj,
            attributes: ['student_id','student_number', 'real_name','sex',"student_birthday","id_card_number","telephone","specialty_name","class_id","student_static"]
        };
        const student_data = await ctx.model.ViBackStudentDetail.findOne(sql_option);
        if (!student_data) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {

            send_json = ctx.helper.success("查询成功", student_data);
        }
        return send_json;

    }
    async postStudentDetail(params) {
        const {ctx} = this;
        let send_json = {};
        const {student_id,student_number,real_name,student_birthday,id_card_number,telephone,class_id,sex,student_static} = params;
        const operate_obj = {
            student_number:student_number,
            real_name:real_name,
            student_birthday:student_birthday,
            id_card_number:id_card_number,
            telephone:telephone,
            class_id:class_id,
            sex:sex,
            student_static:student_static
        };
        const search_obj = {
            student_id: student_id,
            delete_status:0
        };
        if(student_id==='')
        {
            const create_result1 = await ctx.model.SaiUser.create({nick_name:real_name,user_type:1});
            operate_obj.user_id = create_result1.user_id;
            const create_result = await ctx.model.SaiUserStudent.create(operate_obj);

            if (!create_result) {
                send_json = this.ctx.helper.failed(-1, "系统内部错误");
            } else {
                send_json = ctx.helper.success("添加成功");
            }
            return send_json;
        } else{
            const update_result = await ctx.model.SaiUserStudent.update(operate_obj, {
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
    async getClassList(params){
        const {ctx} = this;
        let send_json = {};
        const {school_id} = params;
        const search_obj = {
            school_id:school_id,
            delete_status:0
        };
        const sql_option = {
            where: search_obj,
            attributes: ['specialty_id']
        };
        const specialty_list = await ctx.model.SaiSpecialty.findAll(sql_option);
        const specialty_data_list = Underscore.pluck(specialty_list,"dataValues");
        const specialty_id_list = Underscore.pluck(specialty_data_list,"specialty_id");
        const search_class_obj = {
            specialty_id:specialty_id_list,
            delete_status:0
        };
        const sql_class_option = {
            where: search_class_obj,
            attributes: ['class_id','class_name']
        };
        const class_list = await ctx.model.SaiClass.findAll(sql_class_option);
        if (!class_list) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            let final_data = {};
            final_data.class_list = class_list;
            send_json = ctx.helper.success("查询成功", final_data);
        }
        return send_json;

    }

}
module.exports =StudentService;
