Ext.require(['Ext.data.*']);

Ext.onReady(function() {
    
    window.store1 = Ext.create('Ext.data.JsonStore', {
    	storeId: 'myStore',
    	autoLoad : true,
    	proxy: {
            type: 'ajax',
            url: 'comboBoxAjaxAction!getGxySuiFangXueYa.action?cardId=' + $("#gxyCard").val(),
            reader: {
                type: 'json',
                root: 'data',
                idProperty: 'month'
            }
        },
       // data: generateData(),
        fields: [ 'ssy', 'month','szy']
        
    });
   
    window.store2 = Ext.create('Ext.data.JsonStore', {
    	autoLoad : true,
    	proxy: {
            type: 'ajax',
            url: 'comboBoxAjaxAction!getTnbSuiFangXueTang.action?cardId=' + $("#tnbCard").val(),
            reader: {
                type: 'json',
                root: 'data',
                idProperty: 'month'
            }
        },
       // data: generateData(),
        fields: [ 'fpg', 'month']
        
    });
    
});
