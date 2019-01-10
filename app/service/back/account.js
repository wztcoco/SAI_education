const Service = require('egg').Service;
class UserService extends Service {

    async loginBack(account,password) {
        const { ctx } = this;
        let send_json = {};
        const user = await this.ctx.model.SaiAdmin.findOne({
            where: { admin_name: account, admin_pwd: password}
        });
        if (user === null) {
            send_json = ctx.helper.failed(-1, "帐号密码错误或该帐号未注册");
        } else {
            if (user.delete_status === 1){
                send_json = ctx.helper.failed(-1, "无法登录，此用户已被禁用");
            }
            else {
                const userInfo = {
                    "admin_id":user.admin_id,
                    "admin_name":user.admin_name,
                    "admin_rank":user.admin_rank,
                    "school_id":user.admin_school
                };
                send_json = ctx.helper.success("登录成功", userInfo);
            }
        }
        return send_json;
    }

    async loginOutBack(params) {
        const json_res = {
            data: {},
            msg: {
                error: '',
                prompt: '退出登录成功',
            },
            retcode: 1,
        };
        return json_res;
    }
}

module.exports = UserService;
