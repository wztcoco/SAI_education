const Service = require('egg').Service;
const Underscore=require("underscore");
const Moment = require('moment');

class VideoService extends Service {
    async getVideoInfo(params){
        const {ctx} = this;
        let send_json = {};
        const {video_id,user_id} = params;
        const search_video_obj = {
            video_id: video_id,
            delete_status:0
        };
        const sql_video_option = {
            where: search_video_obj,
            attributes:['teacher_id','add_time','play_times','video_intro']
        };
        const video_result = await ctx.model.SaiCourseVideo.findOne(sql_video_option);
        await ctx.model.SaiCourseVideo.update({
            play_times: video_result.play_times+1
        },{where:search_video_obj});
        const search_teacher_obj = {
            teacher_id: video_result.teacher_id
        };
        const sql_teacher_option = {
            where: search_teacher_obj,
            attributes:['specialty_name','nick_name','avatar_url']
        };
        const teacher_result = await ctx.model.ViTeacher.findOne(sql_teacher_option);
        const search_star_obj = {
            video_id: video_id,
            delete_status:0
        };
        const sql_star_option = {
            where: search_star_obj,
        };
        const star_result = await ctx.model.SaiVideoStar.findAndCountAll(sql_star_option);
        const search_collect_obj = {
            video_id: video_id,
            delete_status:0
        };
        const sql_collect_option = {
            where: search_collect_obj,
        };
        const collect_result = await ctx.model.SaiVideoCollect.findAndCountAll(sql_collect_option);
        const search_user_star_obj = {
            video_id: video_id,
            user_id:user_id,
            delete_status:0
        };
        const sql_user_star_option = {
            where: search_user_star_obj,
        };
        const star_user_result = await ctx.model.SaiVideoStar.findOne(sql_user_star_option);
        const search_user_collect_obj = {
            video_id: video_id,
            user_id:user_id,
            delete_status:0
        };
        const sql_user_collect_option = {
            where: search_user_collect_obj,
        };
        const collect_user_result = await ctx.model.SaiVideoCollect.findOne(sql_user_collect_option);
        const search_comment_obj = {
            video_id: video_id,
        };
        const sql_comment_option = {
            where: search_comment_obj,
            attributes:['avatar_url','nick_name','comment_content']
        };
        const comment_result = await ctx.model.ViComment.findAll(sql_comment_option);

        let final_data = {
            teacher_id: video_result.teacher_id,
            specialty_name: teacher_result.specialty_name,
            nick_name: teacher_result.nick_name,
            avatar_url: teacher_result.avatar_url,
            add_time: Moment(video_result.add_time).format('YYYY-MM-DD'),
            play_times: video_result.play_times+1,
            video_intro: video_result.video_intro,
            star_status : 0,
            star_number : star_result.count,
            collect_status : 0,
            collect_number : collect_result.count,
            comment_list: comment_result,
        };
        if(star_user_result)
            final_data.star_status = 1;
        if(collect_user_result)
            final_data.collect_status = 1;
        if (!final_data) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            send_json = ctx.helper.success("查询成功", final_data);
        }
        return send_json;
    }
    async postStar(params){
        const {ctx} = this;
        let send_json = {};
        const {video_id,user_id} = params;
        const search_star_obj = {
            video_id: video_id,
            user_id:user_id,
            delete_status:0
        };
        const sql_star_option = {
            where: search_star_obj,
        };
        const star_result = await ctx.model.SaiVideoStar.findOne(sql_star_option);
        if(star_result) {
            const search_obj = {
                video_id: video_id,
                user_id: user_id,
                delete_status: 0
            };
            const update_option = {
                delete_status:1
            };
            const option_status = await ctx.model.SaiVideoStar.update(update_option,{where:search_obj});
            if (!option_status) {
                send_json = this.ctx.helper.failed(-1, "取消点赞失败");
            } else {
                send_json = ctx.helper.success("取消点赞成功", {});
            }
            return send_json;
        } else{
            const create_obj = {
                video_id: video_id,
                user_id: user_id
            };
            const option_status = await ctx.model.SaiVideoStar.create(create_obj);
            if (!option_status) {
                send_json = this.ctx.helper.failed(-1, "点赞失败");
            } else {
                send_json = ctx.helper.success("点赞成功", {});
            }
            return send_json;
        }

    }
    async postCollect(params){
        const {ctx} = this;
        let send_json = {};
        const {video_id,user_id} = params;
        const search_collect_obj = {
            video_id: video_id,
            user_id:user_id,
            delete_status:0
        };
        const sql_collect_option = {
            where: search_collect_obj,
        };
        const collect_result = await ctx.model.SaiVideoCollect.findOne(sql_collect_option);
        if(collect_result) {
            const search_obj = {
                video_id: video_id,
                user_id: user_id,
                delete_status: 0
            };
            const update_option = {
                delete_status:1
            };
            const option_status = await ctx.model.SaiVideoCollect.update(update_option,{where:search_obj});
            if (!option_status) {
                send_json = this.ctx.helper.failed(-1, "取消收藏失败");
            } else {
                send_json = ctx.helper.success("取消收藏成功", {});
            }
            return send_json;
        } else{
            const create_obj = {
                video_id: video_id,
                user_id: user_id
            };
            const option_status = await ctx.model.SaiVideoCollect.create(create_obj);
            if (!option_status) {
                send_json = this.ctx.helper.failed(-1, "收藏失败");
            } else {
                send_json = ctx.helper.success("收藏成功", {});
            }
            return send_json;
        }

    }
    async postLeaveVideo(params) {
        const {ctx} = this;
        let send_json = {};
        const {user_id, video_id,learn_time} = params;
        const search_user_obj = {
            user_id: user_id,
            delete_status: 0
        };
        const sql_user_option = {
            where: search_user_obj,
            attributes:['student_id']
        };
        const user_result = await ctx.model.SaiUserStudent.findOne(sql_user_option);
        const search_learn_obj = {
            student_id: user_result.student_id,
            video_id:video_id,
            delete_status: 0
        };
        const sql_learn_option = {
            where: search_learn_obj,
            attributes:['learn_time']
        };
        const learn_result = await ctx.model.SaiVideoLearnTime.findOne(sql_learn_option);
        if(learn_result)
        {
            await ctx.model.SaiVideoLearnTime.update({
                learn_time:learn_result.learn_time+learn_time,
                last_learn_time:new Date()
            },{where:search_learn_obj});
        } else {
            await ctx.model.SaiVideoLearnTime.create({
                learn_time:learn_time,
                last_learn_time:new Date(),
                video_id:video_id,
                student_id: user_result.student_id
            });
        }

        send_json = ctx.helper.success("成功", {});
        return send_json;
    }
}

module.exports = VideoService;