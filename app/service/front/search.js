const Service = require('egg').Service;
const Underscore = require("underscore");
const Moment = require("moment");
const constant = require('../../public/common/constant');

class SearchService extends Service {
    async getGradeList(params) {
        const {ctx} = this;
        let send_json = {};
        const {user_id} = params;
        let date = new Date();
        const search_school_obj={
            user_id:user_id
        };
        const sql_school_option = {
            where: search_school_obj,
            attributes: ['school_id','admission_time','student_id']
        };
        const user_detail = await ctx.model.ViBackStudentDetail.findOne(sql_school_option);
        const search_course_obj = {
            student_id: user_detail.student_id,
            course_learn_year: user_detail.admission_time
        };
        const sql_course_option = {
            where: search_course_obj,
            attributes: ['course_name','grade_value','grade_point','course_credit','course_semester','course_learn_year','course_learn_grade']
        };
        const user_grade = await ctx.model.ViGrade.findAll(sql_course_option);
        const user_grade_list = Underscore.pluck(user_grade,"dataValues");

        let grade_list = [];
        for(let i=0;i<date.getFullYear()-user_detail.admission_time;i++)
        {
            for(let j=1;j<3;j++)
            {
                let semester = "";
                if(j===1)
                    semester = "第一学期";
                if(j===2)
                    semester = "第二学期";
                const course_data = Underscore.where(user_grade_list,{course_learn_grade:i+1,course_semester:j});
                let data ={
                    learn_year:user_detail.admission_time+i+"学年-"+(user_detail.admission_time+i+1)+"学年",
                    learn_semester:semester,
                    course_list:[]
                };
                Underscore.map(course_data,function (item) {
                    let data1 = {
                        course_name:item.course_name,
                        grade_value:item.grade_value,
                        grade_point:item.grade_point,
                        course_credit:item.course_credit
                    };
                    data.course_list.push(data1);
                });
                grade_list.push(data);
            }
        }

        if (!grade_list) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            let final_data = {};
            final_data.grade_list = grade_list;
            send_json = ctx.helper.success("查询成功", final_data);
        }
        return send_json;

    }
    async getTeacherInfo(params) {
        const {ctx} = this;
        let send_json = {};
        const {user_id} = params;
        let date = new Date();
        const search_school_obj={
            user_id:user_id
        };
        const sql_school_option = {
            where: search_school_obj,
            attributes: ['specialty_id']
        };
        const user_detail = await ctx.model.ViBackStudentDetail.findOne(sql_school_option);
        const search_teacher_obj = {
            specialty_id: user_detail.specialty_id
        };
        const sql_teacher_option = {
            where: search_teacher_obj,
            attributes: ['real_name','teacher_number','sex','telephone','teacher_intro','user_id']
        };
        const user_teacher = await ctx.model.ViTeacher.findAll(sql_teacher_option);
        const teacher_list = Underscore.pluck(user_teacher,"dataValues");
        const teacher_id_list = Underscore.pluck(teacher_list,"user_id");
        const search_course_obj = {
            user_id: teacher_id_list,
            delete_status:0
        };
        const sql_course_option = {
            where: search_course_obj,
            attributes: ['course_name','user_id']
        };
        const user_course = await ctx.model.SaiCourse.findAll(sql_course_option);
        const user_course_list = Underscore.pluck(user_course,"dataValues");
        let teacher_info_list = [];
        Underscore.map(teacher_list,function (item) {
            const course_data = Underscore.where(user_course_list,{user_id:item.user_id});
            const course_name_list = Underscore.pluck(course_data,"course_name");
            let data = {
                real_name:item.real_name,
                teacher_number:item.teacher_number,
                sex:item.sex,
                telephone:item.telephone,
                teacher_intro:item.teacher_intro,
                course_list:course_name_list
            };
            teacher_info_list.push(data);
        });


        if (!teacher_info_list) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            let final_data = {};
            final_data.teacher_list = teacher_info_list;
            send_json = ctx.helper.success("查询成功", final_data);
        }
        return send_json;

    }
}

module.exports = SearchService;