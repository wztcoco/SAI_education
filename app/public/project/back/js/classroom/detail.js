
var quill;
var classroomId = localStorage.getItem('sai_classroom_id') || '';
var infoStatus = localStorage.getItem('sai_classroom_info_status') || '';

var getDataFromServer = function (vmObj) {
    var args = {
        "classroom_id": parseInt(vmObj.selectClassroomId),
    };
    sai.post('/back/api/classroom/getClassroomDetail', args, function (response) {
        console.log(response);
        var res = response.data.obj;
        vmObj.loading = false;
        vmObj.ruleForm.classroom_name = res.classroom_name;
        vmObj.ruleForm.classroom_intro = res.classroom_intro;
        vmObj.ruleForm.classroom_area = res.classroom_area;
        vmObj.ruleForm.classroom_type = res.classroom_type;
    })
};
//新增或编辑班级详情
var postClassroomDetail = function (vmObj) {
    var args = {
        "school_id":admin_school_id,
        "classroom_id": classroomId,
        "classroom_name": vmObj.ruleForm.classroom_name,
        "classroom_intro": vmObj.ruleForm.classroom_intro,
        "classroom_area": vmObj.ruleForm.classroom_area,
        "classroom_type": vmObj.ruleForm.classroom_type
    };
    sai.post('/back/api/classroom/postClassroomDetail', args, function (res) {
        console.log(res);
        vmObj.loading = false;
        if (res.data.retcode === 1) {
            vmObj.$message({
                type: 'success',
                message: '更新成功'
            });
            vmObj.back();
            if(vmObj.infoStatus==='edit')
            {
                getDataFromServer(vmObj);
            }

        }
        else {
            vmObj.$message.error('更新失败');
        }
    })
};
var vm = new Vue({
    el: '#container',
    delimiters: ['${', '}'],
    data: {
        ruleForm:
            {
                classroom_name:'',
                classroom_intro:'',
                classroom_area: '',
                classroom_type: '',

            },
        rules: {
            classroom_name: [
                {required: true, message: '请填写教室名称'},
            ],
            classroom_intro: [
                {required: true, message: '请选择教室介绍'},
            ],
            classroom_area: [
                {required: true, message: '请选择教室地址'},
            ],
            classroom_type: [
                {required: true, message: '请填选择教室类别'},
            ]
        },
        infoStatus: infoStatus,//判断流程是编辑还是新建
        selectClassroomId: classroomId,
        alterTimes: 0,  //监控是否有修改过，
        classroom_type_list:[
            {
                'value': 0,
                'label': '普通教室'
            },
            {
                'value': 1,
                'label': '实验室'
            },
            {
                'value': 2,
                'label': '办公室'
            }
        ],

    },
    created: function () {
        if (this.selectClassroomId != "") {
            getDataFromServer(this);
        } else {
            // getConfigList(this);
        }
    },
    methods: {
        selChange(val){
        },
        submitInfo: function (ruleForm) {
            var that=this;
            this.$refs[ruleForm].validate(function(valid){
                if (valid) {
                    postClassroomDetail(that);
                } else {
                    that.$message.warning('请填写正确完善的教室信息');
                    return false;
                }
            });

        },
        back: function () {
            loadPartList('/back/page/classroom/list?' + this.getUrl(), $("#container-box"));
        },
        getUrl: function () {
            var query = "keywords={0}&page_index={1}&page_size={2}".format( keywords, page_index, page_size);
            return query;
        },
    }
});
