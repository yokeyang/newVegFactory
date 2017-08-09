import React, {Component} from 'react';
import echarts from 'echarts';
import { Row, Col} from 'antd';
import 'echarts/lib/component/tooltip';
import EchartsOption from './EchartsOption';
import {toJS} from 'mobx';

class Monitor extends Component {
  componentDidMount(){
    let Options = new EchartsOption();
    let data = Options.simData;
    let dataDate = Options.simdataDate;
    let randomData = Options.randomData;
    let myChart1 = echarts.init(this.main1);
    let myChart2 = echarts.init(this.main2);
    console.log(toJS(Options.simdataDate));
    myChart1.setOption(toJS(Options.Options.monitor1));
    myChart2.setOption(toJS(Options.Options.monitor2));
    setInterval(function () {
      for (var i = 0; i < 1; i++) {
          data.shift();
          data.push(toJS(Options.randomData.value[1]));
          dataDate.shift();
          dataDate.push(toJS(Options.randomData.value[0]));
      }
      myChart1.setOption(toJS(Options.Options.monitor1));
      myChart2.setOption(toJS(Options.Options.monitor2));
    }, 1000);
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
