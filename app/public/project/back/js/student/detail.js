
var quill;
var studentId = localStorage.getItem('sai_student_id') || '';
var infoStatus = localStorage.getItem('sai_student_info_status') || '';

var getDataFromServer = function (vmObj) {
    var args = {
        "student_id": parseInt(vmObj.selectStudentId),
    };
    sai.post('/back/api/student/getStudentDetail', args, function (response) {
        console.log(response);
        var res = response.data.obj;
        console.log(res);
        vmObj.loading = false;
        vmObj.ruleForm.student_number = res.student_number;
        vmObj.ruleForm.real_name = res.real_name;
        vmObj.ruleForm.student_birthday = res.student_birthday;
        vmObj.ruleForm.id_card_number = res.id_card_number;
        vmObj.ruleForm.telephone = res.telephone;
        vmObj.ruleForm.class_id = res.class_id;
        vmObj.ruleForm.select_sex = res.sex;
        vmObj.ruleForm.select_value = res.student_static;
    });
};

var getClassList = function (vmObj) {
    var args = {
        "school_id":parseInt(admin_school_id)
    };
    sai.post('/back/api/student/getClassList', args, function (res) {
        console.log(res);
        vmObj.loading = false;
        vmObj.class_list = res.data.obj.class_list;
    })
};
//新增或编辑班级详情
var postStudentDetail = function (vmObj) {
    var args = {
        "student_id": studentId,
        "student_number": vmObj.ruleForm.student_number,
        "real_name": vmObj.ruleForm.real_name,
        "student_birthday": vmObj.ruleForm.student_birthday,
        "id_card_number": vmObj.ruleForm.id_card_number,
        "telephone": vmObj.ruleForm.telephone,
        "class_id": vmObj.ruleForm.class_id,
        "sex": vmObj.ruleForm.select_sex,
        "student_static": vmObj.ruleForm.select_value
    };
    sai.post('/back/api/student/postStudentDetail', args, function (res) {
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
                student_id:'',
                student_number:'',
                real_name:'',
                student_birthday: '',
                id_card_number:'',
                telephone: '',
                class_id: '',

                select_sex:'',
                select_value:'',

            },
        rules: {
            student_number: [
                {required: true, message: '请填写学号'},
            ],
            real_name: [
                {required: true, message: '请填写姓名'},
            ],
            student_birthday: [
                {required: true, message: '请填写生日'},
            ],
            select_sex: [
                {required: true, message: '请选择性别'},
            ],
            select_value: [
                {required: true, message: '请选择在校状态'},
            ],
            id_card_number: [
                {required: true, message: '请填写身份证'},
            ],
            telephone: [
                {required: true, message: '请填写电话'},
            ],
            class_id: [
                {required: true, message: '请填选择班级'},
            ]
        },

        infoStatus: infoStatus,//判断流程是编辑还是新建
        selectStudentId :studentId,
        alterTimes: 0,  //监控是否有修改过
        class_list: [],
        sex_list:[
            {
                'value': 0,
                'label': '未知'
            },
            {
                'value': 1,
                'label': '男'
            },
            {
                'value': 2,
                'label': '女'
            }
        ],
        student_static_list:[
            {
                'value': 0,
                'label': '不在校'
            },
            {
                'value': 1,
                'label': '在校'
            }
        ],

    },
    created: function () {
        getClassList(this);
        if (this.selectStudentId != "") {
            getDataFromServer(this);
        } else {
            // getConfigList(this);
        }
    },
    methods: {
        selChange(val){
            getClassList(this);
        },
        submitInfo: function (ruleForm) {
            var that=this;
            this.$refs[ruleForm].validate(function(valid){
                if (valid) {
                    postStudentDetail(that);
                } else {
                    that.$message.warning('请填写正确完善的学生信息');
                    return false;
                }
            });

        },
        back: function () {
            loadPartList('/back/page/student/list?' + this.getUrl(), $("#container-box"));
        },
        getUrl: function () {
            var query = "keywords={0}&page_index={1}&page_size={2}".format( keywords, page_index, page_size);
            return query;
        },
    }
});
