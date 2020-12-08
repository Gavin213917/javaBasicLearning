Ext.override(Ext.menu.Menu, {      
    autoWidth : function(){  
       var el = this.el, ul = this.ul;   
       if(!el){      
            return;   
        }      
        var w = this.width;      
        if(w){      
            el.setWidth(w);      
        }else if(Ext.isIE && !Ext.isIE8){   
            //el.setWidth(this.minWidth);      
            var t = el.dom.offsetWidth;      
            el.setWidth(ul.getWidth()+el.getFrameWidth("lr"));      
        }      
    }      
}); 