import React, {Component} from 'react';
import {Switch, Row, Col, Slider, InputNumber} from 'antd';
import echarts from 'echarts';
import EchartsOption from './EchartsOption';
import {toJS} from 'mobx';

let Options = new EchartsOption();
class Lightcontrol extends Component{
  constructor(props){
    super(props);
    this.state = {
      inputValue: 0
    }
  }
  valueChange = (value) =>{
    Options.changelightIntensity(value);
    console.log(toJS(Options.Options.Lightcontrol));
    echarts.init(this.conr).setOption(toJS(Options.Options.Lightcontrol));
    this.setState({
      inputValue: value,
    });
  }
  componentDidMount(){
    let myChart = echarts.init(this.charts)
    Options.getlightIntensity();
    myChart.setOption(toJS(Options.Options.Lightcontrol))
    this.timer = setInterval(()=>{
      for (var i = 0; i < 1; i++) {
        Options.getlightIntensity();
      }
      myChart.setOption(toJS(Options.Options.Lightcontrol))
    }, 2000);
  }
  checkChange = (checked) =>{
    console.log(`switch to ${checked}`);
  }
  sliderChange = (sign,value) => {
    console.log(sign,value)
  }
  componentWillUnmount(){
    clearInterval(this.timer)
  }
  render(){
    const marks = {
      0:'0%',
      10:'10%',
      20:'20%',
      30:'30%',
      40:'40%',
      50:'50%',
      60:'60%',
      70:'70%',
      80:'80%',
      90:'90%',
      100:'100%',
      '-10': {
        style: {
          color: '#f50',
        },
        label: <strong>关闭</strong>,
      },
    }
    let Width = {
        width:document.body.clientWidth <= 1500?'100%':'none',
        marginLeft:document.body.clientWidth <= 1500?'0':'none'
      }
    return(
      <div>
        <Row>
        {/*表*/}
          <Col xs = {{span:24}} md = {{span:24}} lg = {{span:24}}>
            <div ref = {(div)=>{this.charts = div}} style = {{width:'100%',minHeight:300}}></div>
          </Col>
          <Col xs = {{span:24}} md = {{span:24}} lg = {{span:5,offset:1}} style = {Width}>
            <h3 style = {{marginBottom:'2em'}}>
              红光：(R)抑制节间伸长，促进横向分枝和分蘖，延迟花分化，增加花色素苷、叶绿素和类胡萝卜素。红光可以引起拟南芥根系的正向光性运动。红光在植物对生物和非生物胁迫的抗性上具有积极作用。
            </h3>
            <Slider marks = {marks} min = {-10} max = {100} step = {10} onChange = {this.sliderChange.bind(null,'type')}></Slider>
          </Col>
          <Col xs = {{span:24}} md = {{span:24}} lg = {{span:5,offset:1}} style = {Width}>
            <h3 style = {{marginBottom:'2em'}}>
              蓝光：增加白光中的蓝光份额可以缩短节间、缩小叶面积、降低相对生长速率和提高氮/碳比率。高等植物叶绿素合成和叶绿体形成以及具有高叶绿素a/b比与低类胡萝卜素水平的阳生叶绿体都需要蓝光。
            </h3>
            <Slider marks = {marks} min = {-10} max = {100} step = {10} onChange = {this.sliderChange}></Slider>
          </Col>
          <Col xs = {{span:24}} md = {{span:24}} lg = {{span:5,offset:1}} style = {Width}>
            <h3 style = {{marginBottom:'2em'}}>
              绿光：在绿光超过50%时抑制植物生长，而在绿光比例低于24%时则加强植物生长。绿光可以逆转蓝光促进的气孔开放;一个暗淡的绿光脉冲可以使黑暗中生长的幼苗加速伸长，即促进茎伸长。
            </h3>
            <Slider marks = {marks} min = {-10} max = {100} step = {10} onChange = {this.sliderChange}></Slider>
          </Col>
          <Col xs = {{span:24}} md = {{span:24}} lg = {{span:5,offset:1}} style = {Width}>
            <h3 style = {{marginBottom:'2em'}}>
              紫光：紫外辐射减少植物叶面积、抑制下胚轴伸长、降低光合作用和生产力，使植物易受病原体攻击，但是可以诱导类黄酮合成及防御机制，UV-B可以有效地促进花色素苷合成。
            </h3>
            <Slider marks = {marks} min = {-10} max = {100} step = {10} onChange = {this.sliderChange}></Slider>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Lightcontrol;
