const Service = require('egg').Service;
const Underscore=require("underscore");
const Moment = require('moment');

class UserService extends Service {
    async getUserInfo(params) {
        const {ctx} = this;
        let send_json = {};
        const {user_id} = params;
        const search_user_obj = {
            user_id: user_id,
            delete_status: 0
        };
        const sql_user_option = {
            where: search_user_obj,
            attributes:['avatar_url','nick_name','user_type']
        };
        const user_result = await ctx.model.SaiUser.findOne(sql_user_option);
        const search_learn_obj = {
            user_id: user_id,
            delete_status: 0
        };
        const sql_learn_option = {
            where: search_learn_obj,
            attributes:['resource_id']
        };
        const learn_result = await ctx.model.SaiResourceDownload.findAndCountAll(sql_learn_option);
        let data = {
            avatar_url:user_result.avatar_url,
            nick_name:user_result.nick_name,
            user_type:user_result.user_type,
            resource_download_times:learn_result.count
        };
        if (!user_result) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            send_json = ctx.helper.success("查询成功", data);
        }
        return send_json;
    }
    async geUserInfoDetail(params){
        const {ctx} = this;
        let send_json = {};
        const {user_id} = params;
        const search_user_obj = {
            user_id: user_id,
            delete_status: 0
        };
        const sql_user_option = {
            where: search_user_obj,
            attributes:['user_type']
        };
        const user_result = await ctx.model.SaiUser.findOne(sql_user_option);
        let user_data={};
        if(user_result.user_type===1)
        {
            const search_user_obj = {
                user_id: user_id
            };
            const sql_user_option = {
                where: search_user_obj,
                attributes:['avatar_url','school_name','specialty_name','class_name','admission_time','real_name','nick_name','sex','student_birthday','user_location']
            };
            const user_result = await ctx.model.ViBackStudentDetail.findOne(sql_user_option);
            user_data.avatar_url = user_result.avatar_url;
            user_data.school_name = user_result.school_name;
            user_data.specialty_name = user_result.specialty_name;
            user_data.class_name = user_result.class_name;
            user_data.admission_time = user_result.admission_time;
            user_data.real_name = user_result.real_name;
            user_data.nick_name = user_result.nick_name;
            user_data.sex = user_result.sex;
            user_data.user_birthday = user_result.student_birthday;
            user_data.user_location = user_result.user_location;
        } else if (user_result.user_type===2){
            const search_user_obj = {
                user_id: user_id
            };
            const sql_user_option = {
                where: search_user_obj,
                attributes:['avatar_url','school_name','specialty_name','admission_time','real_name','nick_name','sex','teacher_birthday','user_location']
            };
            const user_result = await ctx.model.ViTeacher.findOne(sql_user_option);
            user_data.avatar_url = user_result.avatar_url;
            user_data.school_name = user_result.school_name;
            user_data.specialty_name = user_result.specialty_name;
            user_data.admission_time = user_result.admission_time;
            user_data.real_name = user_result.real_name;
            user_data.nick_name = user_result.nick_name;
            user_data.sex = user_result.sex;
            user_data.user_birthday = user_result.teacher_birthday;
            user_data.user_location = user_result.user_location;
        }
        if (!user_data) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            send_json = ctx.helper.success("查询成功", user_data);
        }
        return send_json;
    }
}

module.exports = UserService;