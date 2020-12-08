/**
 * Created by Administrator on 2014/12/18.
 */
/**
 * Created by Administrator on 2014/11/10.
 */
$.widget('wd.tree',{

    version:'1.0.0',

    options:{
        event:'click',
        effects:null,
        openCallback:function(tree){},
        closeCallback:function(tree){},
        clickCallback:function(tree){

        }
    },

    _create:function(){
        var that = this, element = this.element;
        this.element.on('click','a',function(e){
            var $_parent=$(this).parent();
            var $_parentChildren=$_parent.children('ul');
            var $_icon=$(this).find('.tree-icon');
            if($_parentChildren.length>0){
                if( $_parentChildren.is(':visible')){
                    $_parent.removeClass('active');
                    $_parentChildren.hide();
                    $_icon.removeClass('icon-caret-down').addClass('icon-caret-right');
                    that.options.closeCallback(this);
                }else{
                    $_parent.addClass('active');
                    $_parentChildren.show();
                    $_icon.removeClass('icon-caret-right').addClass('icon-caret-down');
                    that.options.openCallback(this);
                };
                that.options.clickCallback(this,e);
                return false;
            }else{
                that.options.clickCallback(this,e);
                return;
            }

        });
    },
    _destroy: function(){

    },

    _setOption: function(key, value){
        this._super('_setOption', key, value);
    }

});

$(function(){
    $("[data-wd='tree']").tree();
});

