
//获取全部班级列表
var getDataFromServer = function (vmObj) {
    var args = {
        "keywords": vmObj.keywords,
        "page_index":vmObj.pageIndex,
        "page_size":vmObj.pageSize,
        "school_id":admin_school_id
    };
    sai.post('/back/api/classs/getClassList', args, function (res) {
        console.log(res);
        vmObj.loading = false;
        vmObj.tableData = res.data.obj.class_list;
        vmObj.total = res.data.obj.total;
    })
};

//删除专业信息
var deleteClass = function (idList,vmObj) {
    var args = {
        "class_id_list":idList,
        "operate_id": admin_id,
    };
    sai.post('/back/api/classs/deleteClass', args, function (res) {
        console.log(res);
        vmObj.loading = false;
        if (res.data.retcode === 1) {
            vmObj.$message({
                type: 'success',
                message: '删除成功'
            });
            getDataFromServer(vmObj);
        }
        else {
            vmObj.$message.error('删除失败');
        }
    })
};
var vm = new Vue({
    el: ".sai-container",
    delimiters: ['${', '}'],
    data: {
        rules:{

        },
        sels: [],
        total: null,
        tableData: [],
        keywords: keywords,
        pageIndex: parseInt(page_index),
        pageSize: parseInt(page_size),
        pageSizesArr:PAGE_SIZE_ARR,
        detailDialogFormVisible: false,
        dialogLoading: true,
        idList:[]
    },
    created: function () {
        getDataFromServer(this);
    },
    methods: {
        handleSizeChange:function(val) {
            //一定要用this，才能找到当前vm
            this.pageSize=val;
            this.pageIndex=1;
            this.loading=true;
            getDataFromServer(this);
        },
        //下一页
        handleCurrentChange:function(val) {
            //一定要用this，才能找到当前vm
            this.pageIndex=val;
            this.loading=true;
            getDataFromServer(this);
        },
        //搜索
        search:function () {
            this.pageIndex=1;
            this.loading=true;
            getDataFromServer(this);
        },
        deleteStatus: function () {
            var that=this;
            var changeIdList = _.pluck(this.sels,'class_id');
            this.idList=_.map(changeIdList,function (item) {
                return parseInt(item);
            });
            this.$confirm('是否删除选中的班级', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                console.log(that.idList);
                deleteClass(that.idList,that);
            });

        },
        //增加班级
        addInfo:function () {
            localStorage.setItem('sai_class_info_status', 'add');
            localStorage.setItem('sai_class_id', '');
            loadPartList('/back/page/class/detail?' + this.getUrl(), $("#container-box"));
        },
        //编辑商品
        editInfo: function (id) {
            localStorage.setItem('sai_class_info_status', 'edit');
            localStorage.setItem('sai_class_id', id);
            loadPartList('/back/page/class/detail?' + this.getUrl(), $("#container-box"));
        },
        //删除
        deleteInfo:function (row) {
            var that=this;
            //更新用户状态，弹窗确认
            console.log(row);
            this.$confirm('是否删除选中的该班级', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                that.idList.push(row);
                console.log(that.idList);
                deleteClass(that.idList,that);
            });

        },
        getUrl: function () {
            //列表页需要记住的参数
            var query = "keywords={0}&page_index={1}&page_size={2}".format(this.keywords, this.pageIndex, this.pageSize);
            return query;
        },
        selsChange(sels) {
            this.sels = sels
        },
        handleCurrentChange(row, event, column) {
            this.$refs.multipleTable.toggleRowSelection(row)
        }


    }

});
