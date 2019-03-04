const Service = require('egg').Service;
const Underscore=require("underscore");
const Moment = require("moment");
const constant = require('../../public/common/constant');

class CommunityService extends Service {
    async getCommunityList(params) {
        const {ctx} = this;
        let send_json = {};
        const {user_id,speech_place} = params;
        const search_user_obj={
            user_id:user_id
        };
        const sql_user_option = {
            where: search_user_obj,
            attributes: ['user_type']
        };
        const user_detail = await ctx.model.SaiUser.findOne(sql_user_option);
        let user_id_list = [];
        if(user_detail.user_type ===1)
        {
            const search_student_obj={
                user_id:user_id
            };
            const sql_student_option = {
                where: search_student_obj,
                attributes: ['specialty_id','class_id']
            };
            const student_detail = await ctx.model.ViBackStudentDetail.findOne(sql_student_option);
            if(speech_place===1) {
                const search_id_obj={
                    class_id:student_detail.class_id
                };
                const sql_id_option = {
                    where: search_id_obj,
                    attributes: ['user_id']
                };
                const id_result = await ctx.model.ViBackStudentDetail.findAll(sql_id_option);
                const id_dataValues = Underscore.pluck(id_result,'dataValues');
                const id_list_class = Underscore.pluck(id_dataValues,'user_id');
                user_id_list=id_list_class;
            }else if(speech_place ===0) {
                const search_id_obj={
                    specialty_id:student_detail.specialty_id
                };
                const sql_id_option = {
                    where: search_id_obj,
                    attributes: ['user_id']
                };
                const student_id_result = await ctx.model.ViBackStudentDetail.findAll(sql_id_option);
                const teacher_id_result = await ctx.model.ViTeacher.findAll(sql_id_option);
                const student_id_dataValues = Underscore.pluck(student_id_result,'dataValues');
                const student_id_list = Underscore.pluck(student_id_dataValues,'user_id');
                const teacher_id_dataValues = Underscore.pluck(teacher_id_result,'dataValues');
                const teacher_id_list = Underscore.pluck(teacher_id_dataValues,'user_id');
                user_id_list=student_id_list.concat(teacher_id_list);
            }
        }else if(user_detail.user_type===2){
            const search_teacher_obj={
                user_id:user_id
            };
            const sql_teacher_option = {
                where: search_teacher_obj,
                attributes: ['specialty_id']
            };
            const teacher_detail = await ctx.model.ViTeacher.findOne(sql_teacher_option);
            if(speech_place===1) {
                const search_id_obj={
                    specialty_id:teacher_detail.specialty_id
                };
                const sql_id_option = {
                    where: search_id_obj,
                    attributes: ['user_id']
                };
                const id_result = await ctx.model.ViTeacher.findAll(sql_id_option);
                const id_dataValues = Underscore.pluck(id_result,'dataValues');
                const id_list = Underscore.pluck(id_dataValues,'user_id');
                user_id_list=id_list;
            }else if(speech_place ===0) {
                const search_id_obj={
                    specialty_id:teacher_detail.specialty_id
                };
                const sql_id_option = {
                    where: search_id_obj,
                    attributes: ['user_id']
                };
                const student_id_result = await ctx.model.ViBackStudentDetail.findAll(sql_id_option);
                const teacher_id_result = await ctx.model.ViTeacher.findAll(sql_id_option);
                const student_id_dataValues = Underscore.pluck(student_id_result,'dataValues');
                const student_id_list = Underscore.pluck(student_id_dataValues,'user_id');
                const teacher_id_dataValues = Underscore.pluck(teacher_id_result,'dataValues');
                const teacher_id_list = Underscore.pluck(teacher_id_dataValues,'user_id');
                user_id_list=student_id_list.concat(teacher_id_list);
            }
        }
        const search_speech_obj={
            user_id:user_id_list,
            speech_place:speech_place,
            delete_status:0
        };
        const sql_speech_option = {
            where: search_speech_obj,
            attributes: ['speech_id','speech_type_id','speech_content','add_time','user_id'],
            order:[['add_time']]
        };
        const speech_result = await ctx.model.SaiSpeech.findAll(sql_speech_option);
        const speech_dataValues_result = Underscore.pluck(speech_result,'dataValues');
        const speech_id_result = Underscore.pluck(speech_dataValues_result,'speech_id');
        const speech_type_id_result = Underscore.pluck(speech_dataValues_result,'speech_type_id');
        const search_u_obj={
            user_id:user_id_list,
            delete_status:0
        };
        const sql_u_option = {
            where: search_u_obj,
            attributes: ['avatar_url','nick_name','user_id']
        };
        const u_result = await ctx.model.SaiUser.findAll(sql_u_option);
        const u_dataValues_result = Underscore.pluck(u_result,'dataValues');
        //言论类别
        const search_speech_type_obj={
            speech_type_id:speech_type_id_result,
            delete_status:0
        };
        const sql_speech_type_option = {
            where: search_speech_type_obj,
            attributes: ['speech_type_id','speech_type_name']
        };
        const speech_type_result = await ctx.model.SaiSpeechType.findAll(sql_speech_type_option);
        const speech_type_dataValues_result = Underscore.pluck(speech_type_result,'dataValues');
        //每个言论的点赞人数
        const search_star_obj={
            speech_id:speech_id_result,
            delete_status:0
        };
        const sql_star_option = {
            where: search_star_obj,
            attributes: ['speech_id']
        };
        const star_result = await ctx.model.SaiSpeechStar.findAll(sql_star_option);
        const star_dataValues_result = Underscore.pluck(star_result,'dataValues');
        //用户是否点赞列表
        const search_u_star_obj={
            speech_id:speech_id_result,
            user_id:user_id,
            delete_status:0
        };
        const sql_u_star_option = {
            where: search_u_star_obj,
            attributes: ['speech_id']
        };
        const u_star_result = await ctx.model.SaiSpeechStar.findAll(sql_u_star_option);
        const u_star_dataValues_result = Underscore.pluck(u_star_result,'dataValues');
        //图片列表
        const search_images_obj={
            bind_type:2,
            bind_id:speech_id_result,
            delete_status:0
        };
        const sql_images_option = {
            where: search_images_obj,
            attributes: ['images_id','images_url','bind_id']
        };
        const images_result = await ctx.model.SaiImages.findAll(sql_images_option);
        const images_dataValues_result = Underscore.pluck(images_result,'dataValues');
        //评论
        const search_comment_obj={
            speech_id:speech_id_result
        };
        const sql_comment_option = {
            where: search_comment_obj,
            attributes: ['speech_id','user_id','user_name','user_id_replay','user_name_replay','comment_content']
        };
        const comment_result = await ctx.model.ViSpeechComment.findAll(sql_comment_option);
        const comment_dataValues_result = Underscore.pluck(comment_result,'dataValues');
        let speech_list =[];
        Underscore.map(speech_dataValues_result,function (item1) {
            const speech_type_data = Underscore.where(speech_type_dataValues_result,{speech_type_id:item1.speech_type_id});
            console.log(speech_type_data);
            const speech_user_data = Underscore.where(u_dataValues_result,{user_id:item1.user_id});
            const star_data = Underscore.where(star_dataValues_result,{speech_id:item1.speech_id});
            const u_star_data = Underscore.where(u_star_dataValues_result,{speech_id:item1.speech_id});
            const images_data = Underscore.where(images_dataValues_result,{bind_id:item1.speech_id});
            const comment_data = Underscore.where(comment_dataValues_result,{speech_id:item1.speech_id});
            let star_status = 0;
            if(u_star_data[0])
                star_status = 1;
            let images_list =[];
            for(let i=0;i<images_data.length;i++)
            {
                let data={
                    images_id:images_data[i].images_id,
                    images_url:images_data[i].images_url,
                };
                images_list.push(data);
            }
            let comment_list =[];
            for(let i=0;i<comment_data.length;i++)
            {
                let data={
                    user_id:comment_data[i].user_id,
                    user_name:comment_data[i].user_name,
                    user_id_replay:comment_data[i].user_id_replay,
                    user_name_replay:comment_data[i].user_name_replay,
                    comment_content:comment_data[i].comment_content
                };
                comment_list.push(data);
            }
            let data = {
                speech_id :item1.speech_id,
                avatar_url :speech_user_data[0].avatar_url,
                nick_name :speech_user_data[0].nick_name,
                speech_type_name :speech_type_data[0].speech_type_name,
                speech_content :item1.speech_content,
                add_time :Moment(item1.add_time).format('YYYY-MM-DD HH:mm:ss'),
                star_count :star_data.length,
                star_status:star_status,
                images_list :images_list,
                comment_list :comment_list
            };
            speech_list.push(data);
        });
        if (!speech_list) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            let final_data = {};
            final_data.speech_list = speech_list;
            send_json = ctx.helper.success("查询成功", final_data);
        }
        return send_json;

    }
    async getUserSpeech(params) {
        const {ctx} = this;
        let send_json = {};
        const {user_id,speech_place,user_id_others} = params;
        const search_user_obj={
            user_id:user_id_others,
            delete_status:0
        };
        const sql_user_option = {
            where: search_user_obj,
            attributes: ['avatar_url']
        };
        const user_detail = await ctx.model.SaiUser.findOne(sql_user_option);
        const search_speech_obj={
            user_id:user_id_others,
            speech_place:speech_place,
            delete_status:0
        };
        const sql_speech_option = {
            where: search_speech_obj,
            attributes: ['speech_id','speech_type_id','speech_content','add_time','user_id'],
            order:[['add_time']]
        };
        const speech_result = await ctx.model.SaiSpeech.findAll(sql_speech_option);
        const speech_dataValues_result = Underscore.pluck(speech_result,'dataValues');
        const speech_id_result = Underscore.pluck(speech_dataValues_result,'speech_id');
        const speech_type_id_result = Underscore.pluck(speech_dataValues_result,'speech_type_id');
        const search_u_obj={
            user_id:user_id_others,
            delete_status:0
        };
        const sql_u_option = {
            where: search_u_obj,
            attributes: ['avatar_url','nick_name','user_id']
        };
        const u_result = await ctx.model.SaiUser.findAll(sql_u_option);
        const u_dataValues_result = Underscore.pluck(u_result,'dataValues');
        //言论类别
        const search_speech_type_obj={
            speech_type_id:speech_type_id_result,
            delete_status:0
        };
        const sql_speech_type_option = {
            where: search_speech_type_obj,
            attributes: ['speech_type_id','speech_type_name']
        };
        const speech_type_result = await ctx.model.SaiSpeechType.findAll(sql_speech_type_option);
        const speech_type_dataValues_result = Underscore.pluck(speech_type_result,'dataValues');
        //每个言论的点赞人数
        const search_star_obj={
            speech_id:speech_id_result,
            delete_status:0
        };
        const sql_star_option = {
            where: search_star_obj,
            attributes: ['speech_id']
        };
        const star_result = await ctx.model.SaiSpeechStar.findAll(sql_star_option);
        const star_dataValues_result = Underscore.pluck(star_result,'dataValues');
        //用户是否点赞列表
        const search_u_star_obj={
            speech_id:speech_id_result,
            user_id:user_id,
            delete_status:0
        };
        const sql_u_star_option = {
            where: search_u_star_obj,
            attributes: ['speech_id']
        };
        const u_star_result = await ctx.model.SaiSpeechStar.findAll(sql_u_star_option);
        const u_star_dataValues_result = Underscore.pluck(u_star_result,'dataValues');
        //图片列表
        const search_images_obj={
            bind_type:2,
            bind_id:speech_id_result,
            delete_status:0
        };
        const sql_images_option = {
            where: search_images_obj,
            attributes: ['images_id','images_url','bind_id']
        };
        const images_result = await ctx.model.SaiImages.findAll(sql_images_option);
        const images_dataValues_result = Underscore.pluck(images_result,'dataValues');
        //评论
        const search_comment_obj={
            speech_id:speech_id_result
        };
        const sql_comment_option = {
            where: search_comment_obj,
            attributes: ['speech_id','user_id','user_name','user_id_replay','user_name_replay','comment_content']
        };
        const comment_result = await ctx.model.ViSpeechComment.findAll(sql_comment_option);
        const comment_dataValues_result = Underscore.pluck(comment_result,'dataValues');
        let speech_list =[];
        Underscore.map(speech_dataValues_result,function (item1) {
            const speech_type_data = Underscore.where(speech_type_dataValues_result,{speech_type_id:item1.speech_type_id});
            const speech_user_data = Underscore.where(u_dataValues_result,{user_id:item1.user_id});
            const star_data = Underscore.where(star_dataValues_result,{speech_id:item1.speech_id});
            const u_star_data = Underscore.where(u_star_dataValues_result,{speech_id:item1.speech_id});
            const images_data = Underscore.where(images_dataValues_result,{bind_id:item1.speech_id});
            const comment_data = Underscore.where(comment_dataValues_result,{speech_id:item1.speech_id});
            let star_status = 0;
            if(u_star_data[0])
                star_status = 1;
            let images_list =[];
            for(let i=0;i<images_data.length;i++)
            {
                let data={
                    images_id:images_data[i].images_id,
                    images_url:images_data[i].images_url,
                };
                images_list.push(data);
            }
            let comment_list =[];
            for(let i=0;i<comment_data.length;i++)
            {
                let data={
                    user_id:comment_data[i].user_id,
                    user_name:comment_data[i].user_name,
                    user_id_replay:comment_data[i].user_id_replay,
                    user_name_replay:comment_data[i].user_name_replay,
                    comment_content:comment_data[i].comment_content
                };
                comment_list.push(data);
            }
            let data = {
                speech_id :item1.speech_id,
                avatar_url :speech_user_data[0].avatar_url,
                nick_name :speech_user_data[0].nick_name,
                speech_type_name :speech_type_data[0].speech_type_name,
                speech_content :item1.speech_content,
                add_time :Moment(item1.add_time).format('YYYY-MM-DD HH:mm:ss'),
                star_count :star_data.length,
                star_status:star_status,
                images_list :images_list,
                comment_list :comment_list
            };
            speech_list.push(data);
        });
        if (!speech_list) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            let final_data = {};
            final_data.speech_list = speech_list;
            final_data.avatar_url = user_detail.avatar_url;
            send_json = ctx.helper.success("查询成功", final_data);
        }
        return send_json;

    }
    async postSpeechComment(params){
        const {ctx} = this;
        let send_json = {};
        const { user_id, user_id_replay, speech_id, comment_content } = params;
        const create_obj={
            speech_id:speech_id,
            user_id:user_id,
            user_id_replay:user_id_replay,
            comment_content:comment_content,
            add_time:new Date()
        };
        const create_detail = await ctx.model.SaiComment.create(create_obj);
        if (!create_detail) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            send_json = ctx.helper.success("插入成功", {});
        }
        return send_json;

    }
    async getSpeechTypeList(params){
        const {ctx} = this;
        let send_json = {};
        const search_speech_type_obj={
            delete_status:0
        };
        const sql_speech_type_option = {
            where: search_speech_type_obj,
            attributes: ['speech_type_id','speech_type_name']
        };
        const speech_type_result = await ctx.model.SaiSpeechType.findAll(sql_speech_type_option);
        if (!speech_type_result) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            send_json = ctx.helper.success("查询成功", speech_type_result);
        }
        return send_json;

    }
    async postSpeech(params){
        const {ctx} = this;
        let send_json = {};
        const { user_id, speech_content, speech_place, speech_type_id, images_list } = params;
        const create_obj_one={
            user_id:user_id,
            speech_content:speech_content,
            speech_place:speech_place,
            add_time:new Date(),
            speech_type_id:speech_type_id
        };
        const create_detail_one = await ctx.model.SaiSpeech.create(create_obj_one);

        let create_list=[];
        for (let i = 0;i<images_list.length;i++)
        {
            let data = {
                bind_id:create_detail_one.speech_id,
                bind_type:2,
                add_time:new Date(),
                update_time:new Date(),
                is_first:1
            };
            data.images_url = images_list[i];
            create_list.push(data);
        }
        const create_detail_two = await ctx.model.SaiImages.bulkCreate(create_list);
        if (!create_detail_two||!create_detail_one) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            send_json = ctx.helper.success("插入成功", {});
        }
        return send_json;

    }

}

module.exports = CommunityService;