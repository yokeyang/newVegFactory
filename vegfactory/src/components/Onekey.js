import React, {Component} from 'react';
import { Select, Slider,Switch,Button } from 'antd';
import echarts from 'echarts';
import { Row, Col} from 'antd';
import 'echarts/map/js/china.js';
import EchartsOption from './EchartsOption';
import {toJS} from 'mobx';
import $ from 'jquery';
const Option = Select.Option;
let Options = new EchartsOption();
class Onekey extends Component{
  constructor(props){
    super(props)
    this.state = {
      city:Options.selectCity,
      veg:'Baicai',
      lights:{red:{},blue:{},green:{},purple:{}}
    }
  }
  oncityChange = (value) =>{
    Options.selectCity = value.label;
    echarts.init(this.main).setOption(toJS(Options.Options.Onekey))
    this.setState({city:value.label},()=>{
      this.fetch({
        location:value.label,
        veg:this.state.veg
      })
    })
  }
  onvegChange = (value) => {
    this.fetch({
      location:this.state.city,
      veg:value.key
    })
    this.setState({
      veg:value.key
    })
  }
  componentWillMount(){
    this.fetch({
      location:this.state.city,
      veg:this.state.veg
    })
  }
  fetch = (params={}) =>{
    $.ajax({
      url: '/api/onekey',
      type: 'GET',
      dataType: 'json',
      async:false,
      data: {
        ...params
      }
    })
    .done((data)=> {
      console.log(this.state.city)
      this.setState({
        lights:data['lights'][this.state.city][this.state.veg]
      })
    })
    .fail(()=> {
      console.log("error");
    })
  }
  componentDidMount(){
    var myChart = echarts.init(this.main)
    myChart.setOption(toJS(Options.Options.Onekey))
    myChart.on('click', params =>{
      let city = params.name;
      this.setState({
        city:city
      },()=>{
        this.fetch({
          location:city,
          veg:this.state.veg
        })
      })
    })
  }

  onSliderChange = (color,value) =>{
    let lights = this.state.lights
    lights[color]['value'] = value
    this.setState({lights})
  }

  render(){
    return(
      <Row>
        <Col xs = {{span:24}} sm = {{span:24}} md = {{span: 24}} lg = {{span:16}}>
          <div ref = {(div) => {this.main = div}} style={{width: '100%', minHeight: '60vh'}}></div>
        </Col>
        <Col xs = {{span:24}} sm = {{span:24}} md = {{span: 24}} lg = {{span:8}}>
          <Col span = {24}>
            <h2>选择地区：</h2>
            <Select labelInValue onSearch = {this.onSearch} onChange = {this.oncityChange} value = {{ key:`${this.state.city}`,label: `${this.state.city}`}} defaultValue={{ key:'Guangdong',label:'广东'}} style={{ width: "100%" }}>
              <Option value="Hunan">湖南</Option>
              <Option value="Guangdong">广东</Option>
              <Option value="Hubei">湖北</Option>
            </Select>
            <h3 style = {{marginTop:'1em'}}>广东水果的资源十分丰富，是全国著名的水果之乡，全省作为经济作物栽培的水果品种有四、五十种之多。其中，柑桔、荔枝、香蕉、菠萝被誉为“岭南四大名果”。</h3>
          </Col>
          <Col style = {{marginTop:'1em'}}span = {24}>
            <h2>选择植株：</h2>
            <Select labelInValue onChange = {this.onvegChange} value={{ key: `${this.state.veg}`}} style={{ width: "100%" }}>
              <Option value="Baicai">白菜</Option>
              <Option value="Bocai">菠菜</Option>
              <Option value="qingcai">青菜</Option>
            </Select>
            <h3 style = {{marginTop:'1em'}}>广东水果的资源十分丰富，是全国著名的水果之乡，全省作为经济作物栽培的水果品种有四、五十种之多。其中，柑桔、荔枝、香蕉、菠萝被誉为“岭南四大名果”。</h3>
          </Col>
          <Col style = {{marginTop:'1em'}}span = {24}>
            <Col span = {3}>
              <h3>红光</h3>
            </Col>
            <Col span = {12}>
              <Switch defaultChecked = {this.state.lights['red']['checked']} />
            </Col>
            <Col span = {24}>
              <Slider min={0} max={100} step = {10} onChange = {this.onSliderChange.bind(null,'red')} value = {this.state.lights['red']['value']} />
            </Col>
          </Col>
          <Col style = {{marginTop:'1em'}}span = {24}>
            <Col span = {3}>
              <h3>蓝光</h3>
            </Col>
            <Col span = {12}>
              <Switch defaultChecked = {this.state.lights['blue']['checked']} />
            </Col>
            <Col span = {24}>
              <Slider min={0} max={100} step = {10} onChange = {this.onSliderChange.bind(null,'blue')} value = {this.state.lights['blue']['value']} />
            </Col>
          </Col>
          <Col style = {{marginTop:'1em'}}span = {24}>
            <Col span = {3}>
              <h3>绿光</h3>
            </Col>
            <Col span = {12}>
              <Switch defaultChecked = {this.state.lights['green']['checked']} />
            </Col>
            <Col span = {24}>
              <Slider min={0} max={100} step = {10} onChange = {this.onSliderChange.bind(null,'green')} value = {this.state.lights['green']['value']} />
            </Col>
          </Col>
          <Col style = {{marginTop:'1em'}}span = {24}>
            <Col span = {3}>
              <h3>紫光</h3>
            </Col>
            <Col span = {12}>
              <Switch defaultChecked = {this.state.lights['purple']['checked']} />
            </Col>
            <Col span = {24}>
              <Slider min={0} max={100} step = {10} onChange = {this.onSliderChange.bind(null,'purple')} value = {this.state.lights['purple']['value']} />
            </Col>
          </Col>
          <Col style = {{marginTop:'1em'}}span = {24}>
            <Col span = {12}>
              <Button type="primary" size = "large">设置</Button>
            </Col>
            <Col span = {12}>
              <Button type="primary" size = "large" ghost>使用默认配置</Button>
            </Col>
          </Col>
        </Col>
      </Row>
    )
  }
}

export default Onekey;
