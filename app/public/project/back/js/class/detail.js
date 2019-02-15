
var quill;
var classId = localStorage.getItem('sai_class_id') || '';
var infoStatus = localStorage.getItem('sai_class_info_status') || '';

var getDataFromServer = function (vmObj) {
    var args = {
        "class_id": parseInt(vmObj.selectGoodsId),
    };
    sai.post('/back/api/classs/getClassDetail', args, function (response) {
        console.log(response);
        var res = response.data.obj;
        vmObj.loading = false;
        vmObj.ruleForm.class_name = res.class_name;
        vmObj.ruleForm.specialty_id = res.specialty_id;
        vmObj.ruleForm.specialty_name = res.specialty_name;
        vmObj.ruleForm.teacher_id = res.head_teacher;
        vmObj.ruleForm.real_name = res.real_name;
        vmObj.ruleForm.teacher_count = res.teacher_count;
        vmObj.ruleForm.student_count = res.student_count;
        getTeacherList(vmObj);
    })
};
var getSpecialtyList = function (vmObj) {
    var args = {
        "school_id":admin_school_id
    };
    sai.post('/back/api/classs/getSpecialtyList', args, function (res) {
        console.log(res);
        vmObj.loading = false;
        vmObj.specialty_list = res.data.obj.specialty_list;
    })
};

var getTeacherList = function (vmObj) {
    var args = {
        "specialty_id":parseInt(vmObj.ruleForm.specialty_id)
    };
    sai.post('/back/api/classs/getTeacherList', args, function (res) {
        console.log(res);
        vmObj.loading = false;
        vmObj.teacher_list = res.data.obj.teacher_list;
    })
};
//新增或编辑班级详情
var postClassDetail = function (vmObj) {
    var args = {
        "class_id": classId,
        "class_name": vmObj.ruleForm.class_name,
        "specialty_id": vmObj.ruleForm.specialty_id,
        "teacher_id": vmObj.ruleForm.teacher_id
    };
    sai.post('/back/api/classs/postClassDetail', args, function (res) {
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
                class_id:'',
                class_name:'',
                specialty_id: '',
                specialty_name: '',
                teacher_id:'',
                real_name: '',
                teacher_count: '',
                student_count: '',

            },
        rules: {
            class_name: [
                {required: true, message: '请填写班级名称'},
            ],
            specialty_id: [
                {required: true, message: '请选择所属专业'},
            ],

            teacher_id: [
                {required: true, message: '请填选择班主任'},
            ]
        },
        infoStatus: infoStatus,//判断流程是编辑还是新建
        selectGoodsId: classId,
        alterTimes: 0,  //监控是否有修改过
        specialty_list: [],
        teacher_list: [],

    },
    created: function () {
        getSpecialtyList(this);
        if (this.selectGoodsId != "") {
            getDataFromServer(this);
        } else {
            // getConfigList(this);
        }
    },
    methods: {
        selChange(val){
            console.log(this.ruleForm.specialty_id);
            getTeacherList(this);
        },
        submitInfo: function (ruleForm) {
            var that=this;
            this.$refs[ruleForm].validate(function(valid){
                if (valid) {
                    postClassDetail(that);
                } else {
                    that.$message.warning('请填写正确完善的专业信息');
                    return false;
                }
            });

        },
        back: function () {
            loadPartList('/back/page/class/list?' + this.getUrl(), $("#container-box"));
        },
        getUrl: function () {
            var query = "keywords={0}&page_index={1}&page_size={2}".format( keywords, page_index, page_size);
            return query;
        },
    }
});
