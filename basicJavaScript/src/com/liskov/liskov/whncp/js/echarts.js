//环状饼图
function chartPie01(id,data,color,type){
    var myChart=echarts.init(document.getElementById(id));
    var count = 0;
    $.each(data,function(index,item){
        count += item.value;
    })
    var option = {
        color: color,
        tooltip: {
            show:true,
            textStyle: {
                fontSize:12
            },
            formatter: function(params){
                var str = '';
                if(type=='rklj'){
                    str += '入库累计 : ' + count + '<br>';
                }else if(type=='hj'){
                    str += '合计 : ' + count + '<br>';
                }
                $.each(data,function(index,item){
                    str += item.name + ' : ' + item.value + '<br>';
                })
                return str;
            },
            position: ['0', '0']
        },
        series: [
            {
                name:'',
                type:'pie',
                radius: ['68%', '85%'],
                center: ['50%', '45%'],
                avoidLabelOverlap: true,
                hoverAnimation: false,
                label: {
                    normal: {
                        show: false
                    }
                },
                data: data
            }
        ]
    };

    myChart.setOption(option);

    return myChart;
}
//散点图
function chartScatter(id,xdata,ydata,data1,data2,data3,color1,color2,color3){
    var myChart=echarts.init(document.getElementById(id));
    var option = {
        tooltip: {
            position: 'top',
            formatter: function (params) {
                return xdata[params.value[0]] + ' : ' + ydata[params.value[1]] + '\n' + params.value[2];
            }
        },
        grid: {
            left: 20,
            bottom: 30,
            right: 50,
            top: 20,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: xdata,
            boundaryGap: false,
            axisLine: {
                show: true,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed'
                }
            }
        },
        yAxis: {
            type: 'category',
            data: ydata,
            splitLine: {
                show: true
            },
            axisLine: {
                show: false
            },
            axisTick:{
                show: false
            },
            axisLabel:{
                margin: 30
            }
        },
        dataZoom: [
            {
                type: 'slider',
                show: true,
                xAxisIndex: [0],
                bottom:0,
                height:10,
                showDetail: false,
                start: 0,
                end: 80
            },
            {
                type: 'inside',
                realtime: true,
                start: 0,
                end: 100
            }
        ],
        series: [{
            name: '',
            type: 'scatter',
            symbolSize: function (val) {
                if(val[2] * 0.2>0&&val[2] * 0.2<10){
                    return 10;
                }else if(val[2] * 0.2==0){
                    return 0;
                }else if(val[2] * 0.2>80){
                    return 90;
                }else{
                    return val[2] * 0.2;
                }
            },
            itemStyle:{
                normal:{color:color1},
            },
            data: data1,
            animationDelay: function (idx) {
                return idx * 5;
            }
        },
            {
                name: '',
                type: 'scatter',
                symbolSize: function (val) {
                    if(val[2] * 0.2>0&&val[2] * 0.2<10){
                        return 10;
                    }else if(val[2] * 0.2==0){
                        return 0;
                    }else if(val[2] * 0.2>80){
                        return 90;
                    }else{
                        return val[2] * 0.2;
                    }
                },
                itemStyle:{
                    normal:{color:color2},
                },
                data: data2,
                animationDelay: function (idx) {
                    return idx * 5;
                }
            },
            {
                name: '',
                type: 'scatter',
                symbolSize: function (val) {
                    if(val[2] * 0.2>0&&val[2] * 0.2<10){
                        return 10;
                    }else if(val[2] * 0.2==0){
                        return 0;
                    }else if(val[2] * 0.2>80){
                        return 90;
                    }else{
                        return val[2] * 0.2;
                    }
                },
                itemStyle:{
                    normal:{color:color3},
                },
                data: data3,
                animationDelay: function (idx) {
                    return idx * 5;
                }
            }
        ]
    };

    myChart.setOption(option);

    return myChart;
}
