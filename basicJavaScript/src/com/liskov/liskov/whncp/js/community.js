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
                radius: ['65%', '85%'],
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
            bottom: 10,
            right: 20,
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
            }
        },
        series: [{
            name: '',
            type: 'scatter',
            symbolSize: function (val) {
                return val[2] * 2;
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
                    return val[2] * 2;
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
                    return val[2] * 2;
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

//散点图（单）
function chartScatter2(id,data){
    var myChart=echarts.init(document.getElementById(id));
    var option = {
        grid: {
            left: 40,
            bottom: 10,
            right: 80,
            top: 40,
            containLabel: true
        },
        xAxis: {
            name: '管理人数.人',
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#999',
                    type: 'dashed'
                }
            },
            axisTick:{
                show: false
            }
        },
        yAxis: {
            name: '医学观察完整率.%',
            axisLine: {
                show: true,
                lineStyle: {
                    type: 'dashed'
                }
            },
            axisTick:{
                show: false
            },
            axisLine:{
                show: false
            }
        },
        series: [{
            symbolSize: 20,
            itemStyle:{
                normal:{color:'#c6be72'},
            },
            data: data,
            type: 'scatter'
        }]
    };

    myChart.setOption(option);

    return myChart;
}


//折线图
function chartScatter3(id,color1,color2,color3){
    var myChart=echarts.init(document.getElementById(id));
    var xList = eval($("#xDates").text());
    var allManageList = eval($("#allManageList").text());
    var curManageList = eval($("#curManageList").text());
    var curTraceList = eval($("#curTraceList").text());
    option = {
        title: {
            text: '',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}'
        },
        legend: {
            left: 'center',
            data: ['累计管理人数', '当日推送人数', '当日纳管人数']
        },
        dataZoom: {
            show: true,
            realtime: true,
            height: 10,
            start: 0,
            end: 100
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xList
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '累计管理人数',
                itemStyle:{
                    normal:{color:color1}
                },
                type: 'line',
                data: allManageList
            },
            {
                name: '当日推送人数',
                itemStyle:{
                    normal:{color:color2}
                },
                type: 'line',
                data: curTraceList
            }
            ,
            {
                name: '当日纳管人数',
                itemStyle:{
                    normal:{color:color3}
                },
                type: 'line',
                data: curManageList
            }
        ]
    };


    myChart.setOption(option);

    return myChart;
}

//饼状图
function chartPie02(id,color){
    var myChart=echarts.init(document.getElementById(id));
    option = {
        color:color,
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            left: 'center',
            data: ['0-4天', '5-8天', '9-14天', '14+天']
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: [
                    {value: $("#D04").text(), name: '0-4天'},
                    {value: $("#D58").text(), name: '5-8天'},
                    {value: $("#D814").text(), name: '9-14天'},
                    {value: $("#D14").text(), name: '14+天'}
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    myChart.setOption(option);

    return myChart;
}