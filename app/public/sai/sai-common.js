var sai={
    /**
     *ajax的封装（post）
     * @param funcUrl  请求的方法地址
     * @param argsData 入参
     * @param successFunc 成功的回调函数
     * @param errorFunc 失败的回调函数
     */
    post:function (funcUrl,argsData,successFunc) {
        var UA=navigator.userAgent;
        var TOKEN="dreamtouch";
        axios.post(funcUrl, {
            'args':argsData,
            "token":TOKEN,
            "deviceinfo":UA
        })
            .then(function (res) {
                successFunc(res);
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    /**
     * trim函数表示去除 字符串前后 的空格
     * u3000 空格  u00A0 不间断空格
     * @param str
     * @returns {XML|void|string}
     */
    trim: function (str) {
        return str.replace(/^(\u3000|\s|\t|\u00A0)*|(\u3000|\s|\t|\u00A0)*$/g, "");
    },
    /**
     * 去除字符串所有空格
     */
    trimAll: function (str) {
        return str.replace(/\s/g,"");//去除所有空格
    },
    /**
     * 判断是否为空
     * 先判断是否为undefined，在判断是否为null，最后判断如果是字符串的话，是否是“”
     * 满足以上任何一种则返回true，其余情况返回false
     * @param obj
     * @returns {boolean}
     */
    isEmpty: function (obj) {
        if (obj === undefined) {
            return true;
        } else if (obj === null) {
            return true;
        } else if (typeof obj === "string") {
            if (this.trim(obj) ==="") {
                return true;
            }
        }
        return false;
    },

};


/** 格式化输入字符串**/

//用法: "hello{0}".format('world')；返回'hello world'
String.prototype.format= function(){
    var args = arguments;
    return this.replace(/\{(\d+)\}/g,function(s,i){
        return args[i];
    });
};

/**
 * 局部渲染
 * @param url 路由地址
 * @param dom dom的容器
 * @param callback 回调函数
 * @author COCO
 * @date 2017年7月11日
 */
var loadPartList=function(url, dom,callback){
    $('html,body').animate({scrollTop: 0}, 1);
    var ts = "?ts=" + Date.parse(new Date());
    if (url.indexOf("?") !== -1){url = url.replace('?', ts + "&");}
    else {url = url + ts;}
    dom.load(url, function(response,status,xhr) {
        if(callback&&typeof(callback)==="function"){
            callback(response,status,xhr);
        }
    });
};

/**
 * 枚举格式化
 * @param enumType
 * @param enumValue
 */
var enumFormat=function (enumType,enumValue) {
    var result="——";
    enumType=parseInt(enumType);
    enumValue=parseInt(enumValue);
    for(var i=0;i<VALUE_ENUM_MAPPING.length;i++)
    {
        if(VALUE_ENUM_MAPPING[i].type===enumType)
        {
            var temp=VALUE_ENUM_MAPPING[i].data;
            for(var j=0;j<VALUE_ENUM_MAPPING[i].data.length;j++)
            {
                if(VALUE_ENUM_MAPPING[i].data[j].key===enumValue)
                {
                    result=VALUE_ENUM_MAPPING[i].data[j].value;
                    break;
                }
            }
            break;
        }
    }
    return result;
};

var enumFormatBack=function (enumType,enumValue) {
    var result="未知";

    for(var i=0;i<VALUE_ENUM_MAPPING.length;i++)
    {
        if(VALUE_ENUM_MAPPING[i].type===enumType)
        {
            var temp=VALUE_ENUM_MAPPING[i].data;
            for(var j=0;j<VALUE_ENUM_MAPPING[i].data.length;j++)
            {
                if(VALUE_ENUM_MAPPING[i].data[j].key===enumValue)
                {
                    result=VALUE_ENUM_MAPPING[i].data[j].value;
                    break;
                }
            }
            break;
        }
    }
    return result;
};



/**
 *
 * 显示Toast提示信息
 * @param message 信息内容
 * @param callback 回调函数
 * @param mil 延时，默认1秒钟
 */
var showMessage=function(message,callback,mil){
    mil=mil||1000;
    $("body").append("<div class=\"remind-message-container\" style='z-index: 9999999'><div class=\"remind-message\"><label class=\"reminder\"  id=\"show-massage\">"+message+"</label></div></div>");
    setTimeout(function () {
        $(".remind-message-container").remove();
        if(callback&&typeof(callback)==="function"){
            callback();
        }
    }, mil);
};


Date.prototype.format = function (format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
};

// 全局filter
Vue.filter('enumFormat', function (enumValue,enumType) {
    var result="未知";
    enumType=parseInt(enumType);
    enumValue=parseInt(enumValue);
    for(var i=0;i<VALUE_ENUM_MAPPING.length;i++)
    {
        if(VALUE_ENUM_MAPPING[i].type===enumType)
        {
            var temp=VALUE_ENUM_MAPPING[i].data;
            for(var j=0;j<VALUE_ENUM_MAPPING[i].data.length;j++)
            {
                if(VALUE_ENUM_MAPPING[i].data[j].key===enumValue)
                {
                    result=VALUE_ENUM_MAPPING[i].data[j].value;
                    break;
                }
            }
            break;
        }
    }
    return result;

});
const PAGE_SIZE_GLOBAL=15;
const PAGE_SIZE_ARR=[15, 30, 60, 100];
