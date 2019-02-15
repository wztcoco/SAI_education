
var quill;
var specialtyId = localStorage.getItem('sai_specialty_id') || '';
var infoStatus = localStorage.getItem('sai_specialty_info_status') || '';

var getDataFromServer = function (vmObj) {
    var args = {
        "specialty_id": parseInt(vmObj.selectGoodsId),
    };
    sai.post('/back/api/specialty/getSpecialtyDetail', args, function (response) {
        console.log(response);
        var res = response.data.obj;
        vmObj.loading = false;
        vmObj.ruleForm.specialty_name = res.specialty_name;
        vmObj.ruleForm.specialty_code = res.specialty_code;
        vmObj.ruleForm.specialty_principal = res.specialty_principal;
        vmObj.ruleForm.specialty_intro = res.specialty_intro;
        vmObj.ruleForm.class_count = res.class_count;
        vmObj.ruleForm.teacher_count = res.teacher_count;
        vmObj.ruleForm.student_count = res.student_count;
    })
};

//新增或编辑专业详情
var postSpecialtyDetail = function (vmObj) {
    var args = {
        "specialty_id": specialtyId,
        "specialty_name": vmObj.ruleForm.specialty_name,
        "specialty_code": vmObj.ruleForm.specialty_code,
        "specialty_intro": vmObj.ruleForm.specialty_intro,
        "school_id":admin_school_id
    };
    sai.post('/back/api/specialty/postSpecialtyDetail', args, function (res) {
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
                specialty_name: '',
                specialty_code: '',
                specialty_principal: '',
                specialty_intro: '',
                class_count: '',
                teacher_count: '',
                student_count: ''
            },
        rules: {
            specialty_name: [
                {required: true, message: '请填写专业名称'},
            ],
            specialty_code: [
                {required: true, message: '请填写专业代码'},
            ],

            specialty_intro: [
                {required: true, message: '请填写专业介绍'},
            ]
        },
        infoStatus: infoStatus,//判断流程是编辑还是新建
        selectGoodsId: specialtyId,
        alterTimes: 0,  //监控是否有修改过

    },
    created: function () {
        if (this.selectGoodsId != "") {
            getDataFromServer(this);
        } else {
            // getConfigList(this);
        }
    },
    methods: {
        submitInfo: function (ruleForm) {
            var that=this;
            this.$refs[ruleForm].validate(function(valid){
                if (valid) {
                    postSpecialtyDetail(that);
                } else {
                    that.$message.warning('请填写正确完善的专业信息');
                    return false;
                }
            });

        },
        back: function () {
            loadPartList('/back/page/specialty/list?' + this.getUrl(), $("#container-box"));
        },
        getUrl: function () {
            var query = "keywords={0}&page_index={1}&page_size={2}".format( keywords, page_index, page_size);
            return query;
        },
    }
});
