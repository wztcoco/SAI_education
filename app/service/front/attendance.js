const Service = require('egg').Service;
const Underscore=require("underscore");
const Moment = require("moment");
const constant = require('../../public/common/constant');

class AttendanceService extends Service {
    async getAttendanceCourseList(params) {
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
            attributes: ['course_id','course_name','classroom_name','course_start_time','course_end_time']
        };
        const user_course = await ctx.model.ViStudentCourse.findAll(sql_course_option);
        const user_course_list = Underscore.pluck(user_course,"dataValues");
        const user_course_id_list = Underscore.pluck(user_course_list,"course_id");
        let date0 = Moment(date).format('YYYY-MM-DD HH:mm:ss');
        let date1 = date.getFullYear()+'-'+(date.getMonth()>8?(date.getMonth()+1):('0'+(date.getMonth()+1)))+'-'+date.getDate()+' 00:00:00';
        const search_attendance_obj={
            course_id:user_course_id_list,
            attendance_time:{$gte: date1},
            delete_status:0
        };
        const sql_attendance_option = {
            where: search_attendance_obj,
            attributes: ['attendance_id','course_id','attendance_time']
        };
        const user_attendance = await ctx.model.SaiAttendance.findAll(sql_attendance_option);
        const user_attendance_list = Underscore.pluck(user_attendance,"dataValues");
        const user_attendance_id_list = Underscore.pluck(user_attendance_list,"attendance_id");
        const user_course_id_list_final = Underscore.pluck(user_attendance_list,"course_id");

        const search_attend_obj={
            attendance_id:user_attendance_id_list,
            student_id:user_detail.student_id,
            delete_status:0
        };
        const sql_attend_option = {
            where: search_attend_obj,
            attributes: ['attendance_id']
        };
        const user_attend = await ctx.model.SaiAttendanceStudentBind.findAll(sql_attend_option);
        const user_attend_list = Underscore.pluck(user_attend,"dataValues");
        const user_attend_id_list = Underscore.pluck(user_attend_list,"attendance_id");
        const course_list=[];
        Underscore.map(user_attendance_list,function (item) {
            const course_data = Underscore.where(user_course_list,{course_id:item.course_id});
            const attend_data = Underscore.where(user_attend_list,{attendance_id: item.attendance_id});
            let final_data = {
                attendance_id:item.attendance_id,
                course_start_time:course_data[0].course_start_time,
                course_end_time:course_data[0].course_end_time,
                classroom_name:course_data[0].classroom_name,
                course_name:course_data[0].course_name
            };
            if(attend_data[0]){
                final_data.attendance_status = 1
            }else{
                if(((date-item.attendance_time)/1000/60)>5)
                {
                    final_data.attendance_status = -1
                } else {
                    final_data.attendance_status = 0
                }
            }
            course_list.push(final_data);
        });
        if (!course_list) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            let final_data = {};
            final_data.course_list = course_list;
            send_json = ctx.helper.success("查询成功", final_data);
        }
        return send_json;

    }
    async postAttendance (params) {
        const {ctx} = this;
        let send_json = {};
        const {user_id,longitude,latitude,attendance_id} = params;
        let date = new Date();
        const search_attendance_obj = {
            attendance_id: attendance_id,
            delete_status:0
        };
        const sql_attendance_option = {
            where: search_attendance_obj,
            attributes: ['attendance_longitude', 'attendance_latitude']
        };
        const attendance_detail = await ctx.model.SaiAttendance.findOne(sql_attendance_option);
        const d = constant.getGreatCircleDistance(latitude,longitude,attendance_detail.attendance_latitude,attendance_detail.attendance_longitude);
        if(d>100)
        {
            send_json = this.ctx.helper.failed(-1, "超出签到距离");
        }  else{
            const search_student_obj={
                user_id:user_id
            };
            const sql_student_option = {
                where: search_student_obj,
                attributes: ['student_id']
            };
            const user_detail = await ctx.model.ViBackStudentDetail.findOne(sql_student_option);
            const create_obj={
                attendance_id: attendance_id,
                student_id:user_detail.student_id,
                attendance_time: date
            };
            const create_detail = await ctx.model.SaiAttendanceStudentBind.create(create_obj);

            if (!create_detail) {
                send_json = this.ctx.helper.failed(-1, "系统内部错误");
            } else {
                send_json = ctx.helper.success("签到成功", {});
            }
        }


        return send_json;
    }
    async getLatedAttendanceList(params) {
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
            attributes: ['course_id','course_name']
        };
        const user_course = await ctx.model.ViStudentCourse.findAll(sql_course_option);
        const user_course_list = Underscore.pluck(user_course,"dataValues");
        const user_course_id_list = Underscore.pluck(user_course_list,"course_id");
        const search_attendance_obj={
            course_id:user_course_id_list,
            delete_status:0
        };
        const sql_attendance_option = {
            where: search_attendance_obj,
            attributes: ['attendance_id','course_id']
        };
        const user_attendance = await ctx.model.SaiAttendance.findAll(sql_attendance_option);
        const user_attendance_list = Underscore.pluck(user_attendance,"dataValues");
        const user_attendance_id_list = Underscore.pluck(user_attendance_list,"attendance_id");
        const search_attend_obj={
            attendance_id:user_attendance_id_list,
            student_id:user_detail.student_id,
            delete_status:0
        };
        const sql_attend_option = {
            where: search_attend_obj,
            attributes: ['attendance_id']
        };
        const user_attend = await ctx.model.SaiAttendanceStudentBind.findAll(sql_attend_option);
        const user_attend_list = Underscore.pluck(user_attend,"dataValues");
        const user_attend_id_list = Underscore.pluck(user_attend_list,"attendance_id");
        let course_list=[];
        Underscore.map(user_course,function (item1) {
            const attendance_data = Underscore.where(user_attendance_list,{course_id:item1.course_id});
            const attendance_id_data = Underscore.pluck(attendance_data,"attendance_id");
            const attend_data =Underscore.intersection(user_attend_id_list,attendance_id_data);
            let num = attendance_id_data.length - attend_data.length;
            let data = {};
            if(num)
            {
                data.course_id=item1.course_id;
                data.uncheck_count=num;
                data.course_name=item1.course_name;
                course_list.push(data);
            }

        });
        let final_data = {};
        final_data.course_list = course_list;
        send_json = ctx.helper.success("查询成功", final_data);
        return send_json;
    }
    async getTeacherAttendanceList(params) {
        const {ctx} = this;
        let send_json = {};
        const {user_id} = params;
        let date = new Date();
        const search_school_obj = {
            user_id: user_id
        };
        const sql_school_option = {
            where: search_school_obj,
            attributes: ['school_id']
        };
        const user_detail = await ctx.model.ViTeacher.findOne(sql_school_option);
        const search_semester_obj = {
            semester_start: {$lte: date},
            semester_end: {$gte: date},
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
            delete_status:0
        };
        const sql_course_option = {
            where: search_course_obj,
            attributes: ['course_id','course_name','classroom_name','course_start_time','course_end_time']
        };
        const user_course = await ctx.model.ViCourse.findAll(sql_course_option);
        const user_course_list = Underscore.pluck(user_course,"dataValues");
        const user_course_id_list = Underscore.pluck(user_course_list,"course_id");
        let date0 = Moment(date).format('YYYY-MM-DD HH:mm:ss');
        let date1 = date.getFullYear()+'-'+(date.getMonth()>8?(date.getMonth()+1):('0'+(date.getMonth()+1)))+'-'+date.getDate()+' 00:00:00';
        const search_attendance_obj={
            course_id:user_course_id_list,
            attendance_time:{$gte: date1},
            delete_status:0
        };
        const sql_attendance_option = {
            where: search_attendance_obj,
            attributes: ['attendance_id','course_id']
        };
        const user_attendance = await ctx.model.SaiAttendance.findAll(sql_attendance_option);
        const user_attendance_list = Underscore.pluck(user_attendance,"dataValues");
        let course_list=[];
        Underscore.map(user_course_list,function (item1) {
            let data ={
                course_id:item1.course_id,
                course_start_time:item1.course_start_time,
                course_end_time:item1.course_end_time,
                classroom_name:item1.classroom_name,
                course_name:item1.course_name,
                attendance_status:0
            };
            const course_data = Underscore.where(user_attendance_list,{course_id:item1.course_id});
            if(course_data[0]){
                data.attendance_status = 1
            }
            course_list.push(data);
        });
        if (!course_list) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            let final_data = {};
            final_data.course_list = course_list;
            send_json = ctx.helper.success("查询成功", final_data);
        }
        return send_json;
    }
    async getTeacherAttendanceInfoList(params) {
        const {ctx} = this;
        let send_json = {};
        const {user_id} = params;
        let date = new Date();
        const search_school_obj = {
            user_id: user_id
        };
        const sql_school_option = {
            where: search_school_obj,
            attributes: ['school_id']
        };
        const user_detail = await ctx.model.ViTeacher.findOne(sql_school_option);
        const search_semester_obj = {
            semester_start: {$lte: date},
            semester_end: {$gte: date},
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
            delete_status:0
        };
        const sql_course_option = {
            where: search_course_obj,
            attributes: ['course_id','course_name']
        };
        const user_course = await ctx.model.ViCourse.findAll(sql_course_option);
        const user_course_list = Underscore.pluck(user_course,"dataValues");
        const user_course_id_list = Underscore.pluck(user_course_list,"course_id");
        let date0 = Moment(date).format('YYYY-MM-DD HH:mm:ss');
        let date1 = date.getFullYear()+'-'+(date.getMonth()>8?(date.getMonth()+1):('0'+(date.getMonth()+1)))+'-'+date.getDate()+' 00:00:00';
        const search_attendance_obj={
            course_id:user_course_id_list,
            attendance_time:{$gte: date1},
            delete_status:0
        };
        const sql_attendance_option = {
            where: search_attendance_obj,
            attributes: ['attendance_id','course_id','attendance_time']
        };
        const user_attendance = await ctx.model.SaiAttendance.findAll(sql_attendance_option);
        const user_attendance_list = Underscore.pluck(user_attendance,"dataValues");
        const user_attendance_id_list = Underscore.pluck(user_attendance_list,"attendance_id");
        const user_course_id_list_final = Underscore.pluck(user_attendance_list,"course_id");
        const search_attend_obj={
            attendance_id:user_attendance_id_list,
            delete_status:0
        };
        const sql_attend_option = {
            where: search_attend_obj,
            attributes: ['attendance_id']
        };
        const user_attend = await ctx.model.SaiAttendanceStudentBind.findAll(sql_attend_option);
        const user_attend_list = Underscore.pluck(user_attend,"dataValues");
        const user_attend_id_list = Underscore.pluck(user_attend_list,"attendance_id");
        const course_list=[];
        Underscore.map(user_attendance_list,function (item1) {
            const course_data = Underscore.where(user_attendance_list,{course_id:item1.course_id});
            const attend_data = Underscore.where(user_attend_list,{attendance_id:item1.attendance_id});
            const user_data={
                course_id:item1.course_id,
                attendance_time:Moment(item1.attendance_time).format('YYYY-MM-DD HH:mm:ss'),
                course_name:course_data[0].course_name,
                attendance_count:attend_data.length
            };
            course_list.push(user_data);
        });
        if (!course_list) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            let final_data = {};
            final_data.course_list = course_list;
            send_json = ctx.helper.success("查询成功", final_data);
        }
        return send_json;
    }
    async postStartAttendance(params) {
        const {ctx} = this;
        let send_json = {};
        const {attendance_longitude,attendance_latitude,course_id} = params;
        let date = new Date();
        const create_obj = {
            attendance_time: date,
            attendance_longitude:attendance_longitude,
            attendance_latitude:attendance_latitude,
            course_id:course_id
        };
        const user_detail = await ctx.model.SaiAttendance.create(create_obj);

        if (!user_detail) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            send_json = ctx.helper.success("添加成功", {});
        }
        return send_json;
    }
}

module.exports = AttendanceService;