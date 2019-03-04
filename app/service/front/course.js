const Service = require('egg').Service;
const Underscore=require("underscore");
const Moment = require('moment');

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
            course_status:1,
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
            const data1 = Underscore.reject(course_dataValues,function (item) {
                return (Underscore.contains(course_class_list,item.course_class_id))
            });
            Underscore.map(data1,function (item2) {
                let data = {
                    course_id:item2.course_id,
                    images_url:item2.images_url,
                    course_name:item2.course_name
                };
                course_list.push(data);
            });
            final_data.course_list=course_list;
            send_json = ctx.helper.success("查询成功", final_data);
        }
        return send_json;
    }
    async getCourseDetail(params){
        const {ctx} = this;
        let send_json = {};
        const {course_id} = params;
        const search_obj = {
            course_id: course_id
        };
        const sql_option = {
            where: search_obj,
            attributes:['section_id','section_order','section_name','add_time','video_id','play_times'],
            order:[['section_order','ASC']]
        };
        const section_result = await ctx.model.ViSectionVideo.findAll(sql_option);
        const section_result_list = Underscore.pluck(section_result,"dataValues");
        const section_id_list = Underscore.pluck(section_result_list,"section_id");
        const search_resource_obj = {
            section_id: section_id_list,
            delete_status: 0
        };
        const sql_resource_option = {
            where: search_resource_obj,
            attributes:['resource_id','resource_name','resource_url','section_id']
        };
        const resource_resource_result = await ctx.model.SaiCourseResource.findAll(sql_resource_option);
        const resource_list = Underscore.pluck(resource_resource_result,"dataValues");
        let section_list = [];
        Underscore.map(section_result_list,function (item) {
            let data = item;
            if(item.add_time)
                data.add_time = Moment(item.add_time).format('YYYY-MM-DD HH:mm:ss');
            const resource_data = Underscore.where(resource_list,{section_id:item.section_id});
            data.resource_list = resource_data;
            section_list.push(data);
        });
        if (!section_list) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            let final_data = {};
            final_data.section_list = section_list;
            send_json = ctx.helper.success("查询成功", final_data);
        }
        return send_json;
    }
    async getMoreCourseList(params){
        const {ctx} = this;
        let send_json = {};
        const {order_status} = params;
        const keywords = params.keywords ? params.keywords : "";
        const search_course_obj = {
            course_name: {$like: '%' + keywords + '%'},
            delete_status:0
        };
        const sql_course_option = {
            where: search_course_obj,
            attributes:['course_id','course_name','add_time','user_id'],
            order:[['add_time']]
        };
        const course_result = await ctx.model.SaiCourse.findAll(sql_course_option);
        const course_dataValues_result = Underscore.pluck(course_result,"dataValues");
        const course_id_result = Underscore.pluck(course_dataValues_result,"course_id");
        const user_id_result = Underscore.pluck(course_dataValues_result,"user_id");
        const search_user_obj = {
            user_id:user_id_result,
        };
        const sql_user_option = {
            where: search_user_obj,
            attributes:['user_id','specialty_name','real_name'],
        };
        const user_result = await ctx.model.ViTeacher.findAll(sql_user_option);
        const user_dataValues = Underscore.pluck(user_result,"dataValues");
        const search_img_obj = {
            bind_id: course_id_result,
            bind_type: 5,
            is_first: 1
        };
        const sql_img_option = {
            where: search_img_obj,
            attributes:['bind_id','images_url'],
        };
        const img_result = await ctx.model.SaiImages.findAll(sql_img_option);
        const img_dataValues = Underscore.pluck(img_result,"dataValues");
        const search_video_obj = {
            course_id: course_id_result,
        };
        const sql_video_option = {
            where: search_video_obj,
            attributes:['course_id','play_times'],
        };
        const video_result = await ctx.model.ViSectionVideo.findAll(sql_video_option);
        const video_dataValues = Underscore.pluck(video_result,"dataValues");
        let course_list = [];
        Underscore.map(course_dataValues_result,function (item) {
            const image_data = Underscore.where(img_dataValues,{bind_id:item.course_id});
            const video_data = Underscore.where(video_dataValues,{course_id:item.course_id});
            const user_data = Underscore.where(user_dataValues,{user_id:item.user_id});
            let play_times = 0;
            for(let i=0;i<video_data.length;i++)
            {
                play_times+=video_data[i].play_times;
            }
            let data = {
                course_id : item.course_id,
                course_name : item.course_name,
                specialty_name : user_data[0].specialty_name,
                add_time : Moment(item.add_time).format('YYYY-MM-DD HH:mm:ss'),
                images_url : image_data[0].images_url,
                play_times : play_times,
                real_name : user_data[0].real_name
            };
            course_list.push(data);
        });
        if(order_status ===1)
        {
            course_list = Underscore.sortBy(course_list,function (item) {
                return -item.play_times;
            })
        }
        if (!course_list) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            let final_data = {};
            final_data.course_list = course_list;
            send_json = ctx.helper.success("查询成功", final_data);
        }
        return send_json;
    }
    async GetHistoryCourseList(params){
        const {ctx} = this;
        let send_json = {};
        const {user_id} = params;

        const search_course_obj = {
            course_id: course_id_result,
        };
        const sql_video_option = {
            where: search_video_obj,
            attributes:['course_id','play_times'],
        };
        const video_result = await ctx.model.ViSectionVideo.findAll(sql_video_option);

    }
}

module.exports = CourseService;