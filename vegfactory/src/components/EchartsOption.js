import echarts from 'echarts';
import moment from 'moment';
import {observable, computed, action} from 'mobx';
import {toJS} from 'mobx';

class EchartsOption{
  @observable simData = ['','','','','','','','','','','','','','','','','','','',''];
  @observable simdataDate = ['','','','','','','','','','','','','','','','','','','',''];
  @observable lightIntensity = 20;
  @observable selectCity = '广东';
  @computed get randomData() {
    return {
      name: new Date(),
      value: [
        moment().format("YYYY/MM/DD HH:mm:ss"),
        10 + Math.random() * 10
      ]
    }
  }
  @computed get Options() {
    return {
      monitor1:{
        title: {
          text: '动态数据 + 时间坐标轴'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            }
        },
        xAxis: {
          data: toJS(this.simdataDate),
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          }
        },
        series: [{
          data: toJS(this.simData),
          type: 'scatter',
          symbolSize: function (data) {
            return data/2;
          },
          label: {
            emphasis: {
              show: true,
              formatter: function (param) {
                return param.data[3];
              },
              position: 'top'
            }
          },
          itemStyle: {
            normal: {
              shadowBlur: 10,
              shadowColor: 'rgba(120, 36, 50, 0.5)',
              shadowOffsetY: 5,
              color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                offset: 0,
                color: 'rgb(251, 118, 123)'
              }, {
                offset: 1,
                color: 'rgb(204, 46, 72)'
              }])
            }
          }
        }]
      },
      monitor2:{
        title: {
          text: '柱状图动画延迟'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            }
        },
        xAxis: {
          data: toJS(this.simdataDate),
          silent: false,
          splitLine: {
            show: false
          }
        },
        yAxis: {
        },
        series: [{
          name: '值',
          type: 'bar',
          data: toJS(this.simData),
          animationDelay: function (idx) {
            return idx;
          }
        }],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
          return idx;
        }
      },
      Lightcontrol:{
        tooltip : {
          formatter: "{a} <br/>{b} : {c}%"
        },
        legend:{
          left:20
        },
        series: [
          {
            name: '红光',
            type: 'gauge',
            startAngle: 135,
            endAngle: -45,
            center: ['15%', '40%'],
            detail: {formatter:'{value}%'},
            data: [{value: this.lightIntensity, name: '强度'}],
            axisLine:{
              show:true,
              lineStyle:{
                color:[[1, '#FF0033']],
                width:8
              },
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowBlur: 10
            },
            pointer: {
              width:5
            },
            title: {
              offsetCenter: [0, '-30%'],       // x, y，单位px
            },
            splitLine: {           // 分隔线
              length:20,         // 属性length控制线长
              lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            itemStyle:{
              normal:{
                color:'#99CCFF'
              }
            }
          },
          {
            name: '蓝光',
            type: 'gauge',
            endAngle: 45,
            center: ['40%', '40%'],
            detail: {formatter:'{value}%'},
            data: [{value: this.lightIntensity, name: '强度'}],
            axisLine:{
              show:true,
              lineStyle:{
                color:[[1, '#0033FF']],
                width:8
              },
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowBlur: 10
            },
            pointer: {
              width:5
            },
            title: {
              offsetCenter: [0, '-30%'],       // x, y，单位px
            },
            splitLine: {           // 分隔线
              length:20,         // 属性length控制线长
              lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            itemStyle:{
              normal:{
                color:'#99CCFF'
              }
            }
          },
          {
            name: '绿光',
            type: 'gauge',
            startAngle:135,
            endAngle:-45,
            center: ['63%', '40%'],
            detail: {formatter:'{value}%'},
            data: [{value: this.lightIntensity, name: '强度'}],
            axisLine:{
              show:true,
              lineStyle:{
                color:[[1, '#33CC00']],
                width:8
              },
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowBlur: 10
            },
            pointer: {
              width:5
            },
            title: {
              offsetCenter: [0, '-30%'],       // x, y，单位px
            },
            splitLine: {           // 分隔线
              length:20,         // 属性length控制线长
              lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            itemStyle:{
              normal:{
                color:'#99CCFF'
              }
            }
          },
          {
            name: '紫光',
            type: 'gauge',
            endAngle:45,
            center: ['90%', '40%'],
            detail: {formatter:'{value}%'},
            data: [{value: this.lightIntensity, name: '强度'}],
            axisLine:{
              show:true,
              lineStyle:{
                color:[[1, '#993399']],
                width:8
              },
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowBlur: 10
            },
            pointer: {
              width:5
            },
            title: {
              offsetCenter: [0, '-30%'],       // x, y，单位px
            },
            splitLine: {           // 分隔线
              length:20,         // 属性length控制线长
              lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            itemStyle:{
              normal:{
                color:'#99CCFF'
              }
            }
          }
        ],
        draggable: true
      },
      Onekey:{
        series: [
          {
            name: '中国',
            type: 'map',
            map: 'china',
            selectedMode:'single',
            data:[{
              name:toJS(this.selectCity),
              selected:true
            }]
          }
        ]
      }
    }
  }
  @action changelightIntensity(value){
    this.lightIntensity = value
  }
}

export default EchartsOption;
