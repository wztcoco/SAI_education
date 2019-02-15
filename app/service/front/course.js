const Service = require('egg').Service;
const Underscore=require("underscore");

class CourseService extends Service {
    async getUserCourseList(params) {
        const {ctx} = this;
        let send_json = {};
        const {user_id} = params;
        let date = new Date();
        const search_school_obj={
            user_id:user_id
        };
        const sql_school_option = {
            where: search_school_obj,
            attributes: ['school_id','admission_time']
        };
        const user_detail = await ctx.model.ViBackStudentDetail.findOne(sql_school_option);
        const search_semester_obj = {
            semester_start: {$lte: date},
            semester_end:{$gte:date},
            delete_status: 0,
            school_id: user_detail.school_id
        };
        const sql_semester_option = {
            where: search_semester_obj,
            attributes: ['semester']
        };
        const user_semester = await ctx.model.SaiSemester.findOne(sql_semester_option);
        const search_course_obj = {
            user_id: user_id,
            course_semester: user_semester.semester,
            course_learn_year: user_detail.admission_time
        };
        const sql_course_option = {
            where: search_course_obj,
            attributes: ['course_id','course_name','classroom_name','course_start_section','course_end_section','course_time_day']
        };
        const user_course = await ctx.model.ViStudentCourse.findAll(sql_course_option);


        if (!user_course) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            let final_data = {};
            final_data.course_list = user_course;
            send_json = ctx.helper.success("查询成功", final_data);
        }
        return send_json;

    }
    async getIndexCourseList(params) {
        const {ctx} = this;
        let send_json = {};
        const {user_id} = params;
        const search_obj = {
            user_id: user_id
        };
        const sql_option = {
            where: search_obj,
            attributes: ['course_class_id'],
            order:[['learn_time','DESC']]
        };
        const course_class_result = await ctx.model.ViStudentVideoTime.findAll(sql_option);
        const course_class_dataValues = Underscore.pluck(course_class_result,"dataValues");
        const course_class_list = Underscore.pluck(course_class_dataValues,"course_class_id");
        const sql_school_option = {
            where: search_obj,
            attributes: ['school_id']
        };
        const user_school = await ctx.model.ViBackStudentDetail.findOne(sql_school_option);
        const search_course_obj = {
            school_id: user_school.school_id,
        };
        console.log(course_class_list);
        const sql_course_option = {
            where: search_course_obj,
            attributes: ['course_id','images_url','course_name','course_class_id']
        };
        const course_result = await ctx.model.ViCourse.findAll(sql_course_option);
        const course_dataValues = Underscore.pluck(course_result,"dataValues");
        if (!course_result) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            let final_data = {};
            let course_list = [];
            Underscore.map(course_class_list,function (item1) {
                Underscore.map(course_dataValues,function (item2) {
                    if(item1 ===item2.course_class_id){
                        let data = {
                            course_id:item2.course_id,
                            images_url:item2.images_url,
                            course_name:item2.course_name
                        };
                        course_list.push(data);
                    }
                })
            });
            final_data.course_list=course_list;
            send_json = ctx.helper.success("查询成功", final_data);
        }
        return send_json;
    }
}

module.exports = CourseService;