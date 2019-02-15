const Service = require('egg').Service;
const Underscore=require("underscore");

class UserService extends Service {
    //获取菜单 todo 根据角色获取

    async getColumnList(admin_rank) {
        let send_json = {};
        const columnGroup = await this.ctx.model.SaiColumn.findAll({
            where: {
                column_rank:{$gte: admin_rank}//大于0的权限
            }
        });
        this.ctx.logger.info('some request data: %j', columnGroup);
        const columnDataFinal=[];
        //parentGroup是父级栏目的集合
        const parentGroup=Underscore.where(columnGroup,{"column_parent_id":0});
        //map循环
        Underscore.map(parentGroup,function (item) {
            const columnIdTemp=item.column_id;
            const childrenGroup=Underscore.where(columnGroup,{"column_parent_id":columnIdTemp});
            const columnObj={
                adminmenu_id:columnIdTemp,
                parent_id:0,
                menu_name:item.column_name,
                menu_url:item.column_url,
                permission_level:item.column_rank,
                menu_list:childrenGroup
            };
            columnDataFinal.push(columnObj);
        });
        if (columnDataFinal.length===0){
            send_json = this.ctx.helper.failed(-1, "菜单为空");
        }

        send_json = this.ctx.helper.success("查询成功", columnDataFinal);
        return send_json;
    }

}

module.exports = UserService;
