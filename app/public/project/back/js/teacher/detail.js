
var quill;
var teacherId = localStorage.getItem('sai_teacher_id') || '';
var infoStatus = localStorage.getItem('sai_teacher_info_status') || '';

var getDataFromServer = function (vmObj) {
    var args = {
        "teacher_id": parseInt(vmObj.selectTeacherId),
    };
    sai.post('/back/api/teacher/getTeacherDetail', args, function (response) {
        console.log(response);
        var res = response.data.obj;
        console.log(res);
        vmObj.loading = false;
        vmObj.ruleForm.teacher_number = res.teacher_number;
        vmObj.ruleForm.real_name = res.real_name;
        vmObj.ruleForm.teacher_birthday = res.teacher_birthday;
        vmObj.ruleForm.id_card_number = res.id_card_number;
        vmObj.ruleForm.telephone = res.telephone;
        vmObj.ruleForm.specialty_id = res.specialty_id;
        vmObj.ruleForm.select_sex = res.sex;
        vmObj.ruleForm.select_value = res.teacher_static;
    });
};

var getSpecialtyList = function (vmObj) {
    var args = {
        "school_id":parseInt(admin_school_id)
    };
    sai.post('/back/api/teacher/getSpecialtyList', args, function (res) {
        console.log(res);
        vmObj.loading = false;
        vmObj.specialty_list = res.data.obj.specialty_list;
    })
};
//新增或编辑班级详情
var postTeacherDetail = function (vmObj) {
    var args = {
        "teacher_id": teacherId,
        "teacher_number": vmObj.ruleForm.teacher_number,
        "real_name": vmObj.ruleForm.real_name,
        "teacher_birthday": vmObj.ruleForm.teacher_birthday,
        "id_card_number": vmObj.ruleForm.id_card_number,
        "telephone": vmObj.ruleForm.telephone,
        "specialty_id": vmObj.ruleForm.specialty_id,
        "sex": vmObj.ruleForm.select_sex,
        "teacher_static": vmObj.ruleForm.select_value
    };
    sai.post('/back/api/teacher/postTeacherDetail', args, function (res) {
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
                teacher_id:'',
                teacher_number:'',
                real_name:'',
                teacher_birthday: '',
                id_card_number:'',
                telephone: '',
                specialty_id: '',

                select_sex:'',
                select_value:'',

            },
        rules: {
            teacher_number: [
                {required: true, message: '请填写教工号'},
            ],
            real_name: [
                {required: true, message: '请填写姓名'},
            ],
            teacher_birthday: [
                {required: true, message: '请填写生日'},
            ],
            select_sex: [
                {required: true, message: '请选择性别'},
            ],
            select_value: [
                {required: true, message: '请选择任教状态'},
            ],
            id_card_number: [
                {required: true, message: '请填写身份证'},
            ],
            telephone: [
                {required: true, message: '请填写电话'},
            ],
            specialty_id: [
                {required: true, message: '请填选择专业'},
            ]
        },

        infoStatus: infoStatus,//判断流程是编辑还是新建
        selectTeacherId :teacherId,
        alterTimes: 0,  //监控是否有修改过
        specialty_list: [],
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
        teacher_static_list:[
            {
                'value': 0,
                'label': '否'
            },
            {
                'value': 1,
                'label': '是'
            }
        ],

    },
    created: function () {
        getSpecialtyList(this);
        if (this.selectTeacherId != "") {
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
                    postTeacherDetail(that);
                } else {
                    that.$message.warning('请填写正确完善的教师信息');
                    return false;
                }
            });

        },
        back: function () {
            loadPartList('/back/page/teacher/list?' + this.getUrl(), $("#container-box"));
        },
        getUrl: function () {
            var query = "keywords={0}&page_index={1}&page_size={2}".format( keywords, page_index, page_size);
            return query;
        },
    }
});
