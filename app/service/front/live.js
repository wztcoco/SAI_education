const Service = require('egg').Service;
const Underscore = require("underscore");
const Moment = require("moment");
const constant = require('../../public/common/constant');

class AnnounceService extends Service {
    async getLiveBannerList(params) {
        const {ctx} = this;
        let send_json = {};
        const {} = params;
        const search_banner_obj = {
            delete_status: 0,
            bind_type: 6
        };
        const sql_banner_option = {
            where: search_banner_obj,
            attributes: ['bind_id', 'images_path', 'images_url']
        };
        const images_result = await ctx.model.SaiImages.findAll(sql_banner_option);

        if (!images_result) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            let final_data = {};
            final_data.banner_list = images_result;
            send_json = ctx.helper.success("查询成功", final_data);
        }
        return send_json;

    }

    async getLiveList(params) {
        const {ctx} = this;
        let send_json = {};
        const {user_id} = params;
        const search_time_obj = {
            user_id: user_id,
        };
        const sql_time_option = {
            where: search_time_obj,
            attributes: ['live_id'],
            order: [['learn_time', 'DESC']]
        };
        const time_result = await ctx.model.ViStudentLiveTime.findAll(sql_time_option);
        const time_dataValues_result = Underscore.pluck(time_result, "dataValues");
        const time_id_result = Underscore.pluck(time_dataValues_result, "live_id");
        const search_live_obj = {
            delete_status: 0
        };
        const sql_live_option = {
            where: search_live_obj,
            attributes: ['live_id', 'live_name'],
            order: [['watch_count', 'DESC']]
        };
        const live_result = await ctx.model.SaiLive.findAll(sql_live_option);
        const live_dataValues_result = Underscore.pluck(live_result, "dataValues");
        const search_img_obj = {
            delete_status: 0,
            bind_type: 7
        };
        const sql_img_option = {
            where: search_img_obj,
            attributes: ['bind_id', 'images_url']
        };
        const img_result = await ctx.model.SaiImages.findAll(sql_img_option);
        const img_dataValues_result = Underscore.pluck(img_result, "dataValues");
        if (!live_dataValues_result) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            let final_data = {};
            let live_list = [];
            Underscore.map(time_id_result, function (item1) {
                const live_data = Underscore.where(live_dataValues_result, {live_id: item1});
                const img_data = Underscore.where(img_dataValues_result, {bind_id: item1});
                let data = {
                    live_id: item1,
                    live_name: live_data[0].live_name,
                    images_url: ""
                };
                if (img_data[0])
                    data.images_url = img_data[0].images_url;
                live_list.push(data);
            });
            const data1 = Underscore.reject(live_dataValues_result, function (item) {
                return (Underscore.contains(time_id_result, item.live_id))
            });
            Underscore.map(data1, function (item2) {
                const img_data = Underscore.where(img_dataValues_result, {bind_id: item2.live_id});
                let data = {
                    live_id: item2.live_id,
                    live_name: item2.live_name,
                    images_url: ""
                };
                if (img_data[0])
                    data.images_url = img_data[0].images_url;
                live_list.push(data);
            });
            final_data.live_list = live_list;
            send_json = ctx.helper.success("查询成功", final_data);
        }
        return send_json;

    }

    async getLiveInfo(params) {
        const {ctx} = this;
        let send_json = {};
        const {live_id, user_id} = params;

        const search_live_obj = {
            live_id: live_id,
            delete_status: 0
        };
        const sql_live_option = {
            where: search_live_obj,
            attributes: ['teacher_id', 'live_time', 'watch_count', 'live_intro', 'live_push', 'live_pull', 'live_name']
        };
        const live_result = await ctx.model.SaiLive.findOne(sql_live_option);
        const update_data = await ctx.model.SaiLive.update({
            watch_count: live_result.watch_count + 1
        }, {
            where: {live_id: live_id}
        });
        const search_teacher_obj = {
            teacher_id: live_result.teacher_id
        };
        const sql_teacher_option = {
            where: search_teacher_obj,
            attributes: ['specialty_name', 'real_name', 'avatar_url']
        };
        const teacher_result = await ctx.model.ViTeacher.findOne(sql_teacher_option);
        const search_barrage_obj = {
            live_id: live_id
        };
        const sql_barrage_option = {
            where: search_barrage_obj,
            attributes: ['nick_name', 'avatar_url', 'barrage_content']
        };
        const barrage_result = await ctx.model.ViBarrage.findAll(sql_barrage_option);
        const barrage_list = Underscore.pluck(barrage_result, 'dataValues');
        let data = {
            teacher_id: live_result.nick_name,
            live_time: Moment(live_result.live_time).format('YYYY-MM-DD'),
            watch_count: live_result.watch_count + 1,
            live_name: live_result.live_name,
            live_intro: live_result.live_intro,
            live_push: live_result.live_push,
            live_pull: live_result.live_pull,
            specialty_name: teacher_result.specialty_name,
            real_name: teacher_result.real_name,
            avatar_url: teacher_result.avatar_url,
            barrage_list: barrage_list
        };
        if (!data) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            send_json = ctx.helper.success("查询成功", data);
        }
        return send_json;

    }

    async getMoreLiveList(params) {
        const {ctx} = this;
        let send_json = {};
        const {order_status} = params;
        const keywords = params.keywords ? params.keywords : "";
        console.log(order_status);
        const search_live_obj = {
            live_name: {$like: '%' + keywords + '%'},
            delete_status: 0
        };
        const sql_live_option = {
            where: search_live_obj,
            attributes: ['teacher_id', 'live_id', 'live_time', 'watch_count', 'live_name']
        };
        if (order_status === 0)
            sql_live_option.order = [['live_time', 'DESC']];
        else
            sql_live_option.order = [['watch_count', 'DESC']];
        const live_result = await ctx.model.SaiLive.findAll(sql_live_option);
        const live_dataValues_list = Underscore.pluck(live_result, 'dataValues');
        const teacher_id_list = Underscore.pluck(live_dataValues_list, 'teacher_id');
        const live_id_list = Underscore.pluck(live_dataValues_list, 'live_id');
        const search_teacher_obj = {
            teacher_id: teacher_id_list
        };
        const sql_teacher_option = {
            where: search_teacher_obj,
            attributes: ['specialty_name', 'real_name', 'teacher_id']
        };
        const teacher_result = await ctx.model.ViTeacher.findAll(sql_teacher_option);
        const teacher_dataValues_list = Underscore.pluck(teacher_result, 'dataValues');
        const search_images_obj = {
            bind_id: live_id_list,
            bind_type: 7
        };
        const sql_images_option = {
            where: search_images_obj,
            attributes: ['bind_id', 'images_url']
        };
        const images_result = await ctx.model.SaiImages.findAll(sql_images_option);
        const images_dataValues_list = Underscore.pluck(images_result, 'dataValues');
        let live_list = [];
        Underscore.map(live_dataValues_list, function (item) {
            const teacher_data = Underscore.where(teacher_dataValues_list, {teacher_id: item.teacher_id});
            const image_data = Underscore.where(images_dataValues_list, {bind_id: item.live_id});
            let data = {
                live_id: item.live_id,
                live_name: item.live_name,
                specialty_name: teacher_data[0].specialty_name,
                real_name: teacher_data[0].real_name,
                live_time: Moment(item.live_time).format('YYYY-MM-DD HH:mm:ss'),
                watch_count: item.watch_count,
                images_url: image_data[0].images_url
            };
            live_list.push(data);
        });
        if (!live_list) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            let final_data = {};
            final_data.live_list = live_list;
            send_json = ctx.helper.success("查询成功", final_data);
        }
        return send_json;

    }

    async postTeacherLive(params) {
        const {ctx} = this;
        let send_json = {};
        const {user_id, live_name, live_intro} = params;
        const search_user_obj = {
            user_id: user_id,
            delete_status: 0
        };
        const sql_user_option = {
            where: search_user_obj,
            attributes: ['teacher_id']
        };
        const user_result = await ctx.model.SaiUserTeacher.findOne(sql_user_option);
        const search_live_obj = {
            teacher_id: user_result.teacher_id,
            delete_status: 0
        };
        const sql_live_option = {
            where: search_live_obj
        };
        const live_result = await ctx.model.SaiLive.findOne(sql_live_option);
        if (live_result) {
            const search_live_obj = {
                teacher_id: user_result.teacher_id,
                delete_status: 0
            };
            const sql_live_option = {
                live_name: live_name,
                live_intro: live_intro,
                live_time: new Date(),
                watch_count: 0
            };
            const live_update_result = await ctx.model.SaiLive.update(sql_live_option, {
                where: search_live_obj
            });
            if (!live_update_result) {
                send_json = this.ctx.helper.failed(-1, "系统内部错误");
            } else {
                send_json = ctx.helper.success("创建成功", {});
            }
            return send_json;
        } else {
            const sql_live_option = {
                live_name: live_name,
                live_intro: live_intro,
                live_time: new Date(),
                watch_count: 0,
                teacher_id: user_result.teacher_id
            };
            const live_create_result = await ctx.model.SaiLive.create(sql_live_option);
            if (!live_create_result) {
                send_json = this.ctx.helper.failed(-1, "系统内部错误");
            } else {
                send_json = ctx.helper.success("创建成功", {});
            }
            return send_json;
        }
    }

    async postLeaveLive(params) {
        const {ctx} = this;
        let send_json = {};
        const {user_id, live_id,learn_time} = params;
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
            live_id:live_id,
            delete_status: 0
        };
        const sql_learn_option = {
            where: search_learn_obj,
            attributes:['learn_time']
        };
        const learn_result = await ctx.model.SaiLiveLearnTime.findOne(sql_learn_option);
        if(learn_result)
        {
            await ctx.model.SaiLiveLearnTime.update({
                learn_time:learn_result.learn_time+learn_time,
                last_learn_time:new Date()
            },{where:search_learn_obj});
        } else {
            await ctx.model.SaiLiveLearnTime.create({
                learn_time:learn_time,
                last_learn_time:new Date(),
                live_id:live_id,
                student_id: user_result.student_id
            });
        }
        const search_live_obj = {
            live_id: live_id,
            delete_status: 0
        };
        const sql_live_option = {
            where: search_live_obj,
            attributes:['watch_count']
        };
        const live_result = await ctx.model.SaiLive.findOne(sql_live_option);
        const result = await ctx.model.SaiLive.update({
            watch_count:live_result.watch_count-1
        },{where:search_live_obj});
        if (!result) {
            send_json = this.ctx.helper.failed(-1, "系统内部错误");
        } else {
            send_json = ctx.helper.success("成功", {});
        }
        return send_json;
    }
}

module.exports = AnnounceService;