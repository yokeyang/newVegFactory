import React, {Component} from 'react';
import { Select, Slider,Switch,Button } from 'antd';
import echarts from 'echarts';
import { Row, Col} from 'antd';
import 'echarts/map/js/china.js';
import EchartsOption from './EchartsOption';
import {toJS} from 'mobx';
const Option = Select.Option;
let Options = new EchartsOption();
class Onekey extends Component{
  constructor(props){
    super(props);
    this.state = {
      city:Options.selectCity
    }
  }
  onChange = (value) =>{
    Options.selectCity = value.label;
    echarts.init(this.main).setOption(toJS(Options.Options.Onekey))
    this.setState({
      city:value.label
    })
  }
  componentDidMount(){
    var myChart = echarts.init(this.main);
    myChart.setOption(toJS(Options.Options.Onekey));
    myChart.on('click', params =>{
      let city = params.name;
      console.log(params);
      this.setState({
        city:city
      })
    });
  }
  render(){
    return(
      <Row>
        <Col xs = {{span:24}} sm = {{span:24}} md = {{span: 24}} lg = {{span:16}}>
          <div ref = {(div) => {this.main = div}} style={{width: '100%', minHeight: '60vh'}}></div>
        </Col>
        <Col xs = {{span:24}} sm = {{span:24}} md = {{span: 24}} lg = {{span:6}}>
          <h2>选择地区：</h2>
          <Select labelInValue onChange = {this.onChange} value = {{ label: this.state.city}} defaultValue={{ label:'广东'}} style={{ width: "100%" }}>
            <Option value="Hunan">湖南</Option>
            <Option value="Guangdong">广东</Option>
            <Option value="Hubei">湖北</Option>
          </Select>
          <h3 style = {{marginTop:'1em'}}>广东水果的资源十分丰富，是全国著名的水果之乡，全省作为经济作物栽培的水果品种有四、五十种之多。其中，柑桔、荔枝、香蕉、菠萝被誉为“岭南四大名果”。</h3>
        </Col>
        <Col style = {{marginTop:'1em'}} xs = {{span:24}} sm = {{span:24}} md = {{span: 24}} lg = {{span:6}}>
          <h2>选择植株：</h2>
          <Select labelInValue defaultValue={{ label:'白菜'}} style={{ width: "100%" }}>
            <Option value="Baicai">白菜</Option>
            <Option value="Bocai">菠菜</Option>
            <Option value="qingcai">青菜</Option>
          </Select>
          <h3 style = {{marginTop:'1em'}}>广东水果的资源十分丰富，是全国著名的水果之乡，全省作为经济作物栽培的水果品种有四、五十种之多。其中，柑桔、荔枝、香蕉、菠萝被誉为“岭南四大名果”。</h3>
        </Col>
        <Col style = {{marginTop:'1em'}} xs = {{span:24}} sm = {{span:24}} md = {{span: 24}} lg = {{span:6}}>
          <Col span = {3}>
            <h3>红光</h3>
          </Col>
          <Col span = {12}>
            <Switch defaultChecked={false} />
          </Col>
          <Col span = {24}>
            <Slider min={0} max={100} step = {10} />
          </Col>
        </Col>
        <Col style = {{marginTop:'1em'}} xs = {{span:24}} sm = {{span:24}} md = {{span: 24}} lg = {{span:6}}>
          <Col span = {3}>
            <h3>蓝光</h3>
          </Col>
          <Col span = {12}>
            <Switch defaultChecked={false} />
          </Col>
          <Col span = {24}>
            <Slider min={0} max={100} step = {10} />
          </Col>
        </Col>
        <Col style = {{marginTop:'1em'}} xs = {{span:24}} sm = {{span:24}} md = {{span: 24}} lg = {{span:6}}>
          <Col span = {3}>
            <h3>绿光</h3>
          </Col>
          <Col span = {12}>
            <Switch defaultChecked={false} />
          </Col>
          <Col span = {24}>
            <Slider min={0} max={100} step = {10} />
          </Col>
        </Col>
        <Col style = {{marginTop:'1em'}} xs = {{span:24}} sm = {{span:24}} md = {{span: 24}} lg = {{span:6}}>
          <Col span = {3}>
            <h3>紫光</h3>
          </Col>
          <Col span = {12}>
            <Switch defaultChecked={false} />
          </Col>
          <Col span = {24}>
            <Slider min={0} max={100} step = {10} />
          </Col>
        </Col>
        <Col style = {{marginTop:'1em'}} xs = {{span:24}} sm = {{span:24}} md = {{span: 24}} lg = {{span:6}}>
          <Col span = {12}>
            <Button type="primary" size = "large">设置</Button>
          </Col>
          <Col span = {12}>
            <Button type="primary" size = "large" ghost>使用默认配置</Button>
          </Col>
        </Col>
      </Row>
    )
  }
}

export default Onekey;
