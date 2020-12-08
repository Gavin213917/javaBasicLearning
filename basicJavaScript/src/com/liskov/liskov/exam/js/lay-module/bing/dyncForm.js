/**
 * 动态表单生成插件
 * 说明：initData是二维数组
 * [
 *   [
 *      {type:hidden,id:'',name:'',value:''},
 *      {type:template,template:'#'},
 *      {type:text,label:'',id:'',name:'',value:'',required:true|false,verify:function(){return errMessage},class:'',style:''...},
 *      {type:password,label:'',id:'',name:'',value:'',required:true|false,verify:function(){return errMessage},class:'',style:''...},
 *      {type:year,range:true|false,label:'',id:'',name:'',value:'',format:'',required:true|false,verify:function(){return errMessage},class:'',style:''...},
 *      {type:month,range:true|false,label:'',id:'',name:'',value:'',format:'',required:true|false,verify:function(){return errMessage},class:'',style:''...},
 *      {type:time,range:true|false,label:'',id:'',name:'',value:'',format:'',required:true|false,verify:function(){return errMessage},class:'',style:''...},
 *      {type:date,range:true|false,label:'',id:'',name:'',value:'',format:'',required:true|false,verify:function(){return errMessage},class:'',style:''...},
 *      {type:datetime,range:true|false,label:'',id:'',name:'',value:'',format:'',required:true|false,verify:function(){return errMessage},class:'',style:''...},
 *      {type:switch,label:'',id:'',name:'',value:'',required:true|false,verify:function(){return errMessage}...},
 *      {type:select,label:'',id:'',name:'',value:'',data:[],required:true|false,verify:function(){return errMessage},class:'',style:''...},
 *      {type:checkbox,label:'',id:'',name:'',value:'',data:[],required:true|false,verify:function(){return errMessage},class:'',style:''...},
 *      {type:radio,label:'',id:'',name:'',value:'',data:[],required:true|false,verify:function(){return errMessage},class:'',style:''...},
 *      {type:textarea,label:'',id:'',name:'',value:'',required:true|false,verify:function(){return errMessage},class:'',style:''...},
 *   ],
 * ]
 */
layui.define(["element", "laytpl", "form", "jquery"], function (exports) {
    var element = layui.element,
        $ = layui.$,
        laytpl = layui.laytpl,
        layer = layui.layer;

    let dyncForm = {
        /**
         * 初始化
         * @param options.formSelector 表单选择器
         * @param options.formData 表单数据
         * @param options.initData:{[[{},{}],[{},{}]]} 初始化表单数据
         * @param options.initFun:function(){} 初始化函数
         */
        render: function (options) {
        }
    };

    //暴露接口
    exports('dyncForm', dyncForm);
});