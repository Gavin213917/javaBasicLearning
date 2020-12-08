Ext.require('Ext.chart.*');
Ext.require(['Ext.Window', 'Ext.fx.target.Sprite', 'Ext.layout.container.Fit']);

Ext.onReady(function () {
   // store1.loadData(generateData(8));
    
	//store1.loadData();
    var chart = Ext.create('Ext.chart.Chart', {
            xtype: 'chart',
            renderTo: $("#gxyqxt")[0],
            width: 250,
            height: 100,
            style: 'background:#fff',
            animate: true,
            store: store1,
            shadow: true,
            theme: 'Category1',
            legend: {
                position: 'right'
            },
            axes: [{
                type: 'Numeric',
                minimum: 0,
                position: 'left',
                fields: ['ssy', 'szy'],
                //title: '血压值',
                minorTickSteps: 1,
                grid: {
                    odd: {
                        opacity: 1,
                        fill: '#ddd',
                        stroke: '#bbb',
                        'stroke-width': 0.5
                    }
                }
            }, {
            	hidden:true,
                type: 'Category',
                position: 'bottom',
                fields: ['month']//,
                //title: '血压变化情况'
            }],
            series: [{
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                xField: 'month',
                yField: 'ssy',
                markerConfig: {
                    type: 'cross',
                    size: 1,
                    radius: 1,
                    'stroke-width': 0
                }
            }, {
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                smooth: true,
                //fill: true,
                xField: 'month',
                yField: 'szy',
                markerConfig: {
                    type: 'cross',
                    size: 1,
                    radius: 1,
                    'stroke-width': 0
                }
            }]
        });
    
    var chart2 = Ext.create('Ext.chart.Chart', {
        xtype: 'chart',
        renderTo: $("#tnbqxt")[0],
        width: 250,
        height: 100,
        style: 'background:#fff',
        animate: true,
        store: store2,
        shadow: true,
        theme: 'Category1',
        legend: {
            position: 'right'
        },
        axes: [{
            type: 'Numeric',
            minimum: 0,
            position: 'left',
            fields: ['fpg'],
           // title: '血压值',
            minorTickSteps: 1,
            grid: {
                odd: {
                    opacity: 1,
                    fill: '#ddd',
                    stroke: '#bbb',
                    'stroke-width': 0.5
                }
            }
        }, {
        	hidden:true,
            type: 'Category',
            position: 'bottom',
            fields: ['month']//,
            //title: '血压变化情况'
        }],
        series: [{
            type: 'line',
            highlight: {
                size: 7,
                radius: 7
            },
            axis: 'left',
            xField: 'month',
            yField: 'fpg',
            markerConfig: {
                type: 'cross',
                size: 1,
                radius: 1,
                'stroke-width': 0
            }
        }]
    });
    
});
