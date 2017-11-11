import React, {Component} from 'react';
import echarts from 'echarts';
import { Row, Col} from 'antd';
import 'echarts/lib/component/tooltip';
import EchartsOption from './EchartsOption';
import {toJS} from 'mobx';

class Monitor extends Component {
  componentDidMount(){
    let Options = new EchartsOption();
    let tempData = Options.tempData;
    let lightData = Options.lightData;
    let time = Options.time;
    let myChart1 = echarts.init(this.main1);
    let myChart2 = echarts.init(this.main2);
    myChart1.setOption(toJS(Options.Options.temp));
    myChart2.setOption(toJS(Options.Options.light));
    this.timer = setInterval(function () {
      tempData.shift();
      tempData.push(toJS(Options.randomData.value[1]).temp);
      lightData.shift();
      lightData.push(toJS(Options.randomData.value[1]).light);
      time.shift();
      time.push(toJS(Options.randomData.value[0]));
      myChart1.setOption(toJS(Options.Options.temp));
      myChart2.setOption(toJS(Options.Options.light));
    }, 1000);
  }
  componentWillUnmount(){
    clearInterval(this.timer)
  }
  render(){
    return(
      <Row>
        <Col xs = {{span:24}} sm = {{span:24}} md = {{span: 24}} lg = {{span:10, offset:1}}>
          <div ref = {(div) => {this.main1 = div}} style={{width: '100%', minHeight: 400}}></div>
        </Col>
        <Col xs = {{span:24}} sm = {{span:24}} md = {{span: 24}} lg = {{span:10, offset:1}}>
          <div ref = {(div) => {this.main2 = div}} style={{width: '100%', minHeight: 400}}></div>
        </Col>
      </Row>
    )
  }
}
export default Monitor;
