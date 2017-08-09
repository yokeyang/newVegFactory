import React,{Component} from 'react';
import {Row, Col, Calendar,Modal,Button} from 'antd';
import '../App.css';
import moment from 'moment';

class History extends Component{
  constructor(props){
    super(props);
    this.state = {
      value: moment('2017-07-12')
    }
  }
  dayInfo = (date) => {
    let dayInfo = [
      {content:'最后操作的操作员',value:`Bob`},
      {content:'红光峰值',value:`80`},
      {content:'绿光峰值',value:`70`},
      {content:'蓝光峰值',value:`60`},
      {content:'紫光峰值',value:`70`},
      {content:'平均温度',value:`20℃`},
      {content:'平均二氧化碳浓度',value:`20`},
      {content:'平均适度',value:`30`},
      {content:'平均光照强度',value:`40`},
    ]
    const modal = Modal.success({
      title: `这是${date.month() + 1}月${date.date()}日的统计情况`,
      content: (
        <ul className="HistoryInfo">
          {
            dayInfo.map(item => (
              <li key={item.content}>
               {item.content}：{item.value}
              </li>
            ))
          }
       </ul>
      ),
    });
    setTimeout(() => modal.destroy(), 10000);
  }
  getlistData = (value) =>{
    let red = 20;
    let green = 30;
    let blue = 50;
    let purple = 10;
    let listData = [];
    if(!this.disabledDate(value)){
      listData = [
        {color:'red',content:`红光平均强度：${red}`},
        {color:'green',content:`绿光平均强度：${green}`},
        {color:'blue',content:`蓝光平均强度：${blue}`},
        {color:'purple',content:`紫光平均强度：${purple}`}
      ]
    }
    return listData
  }
  renderData = (value) =>{
    let listData = this.getlistData(value);
    return(
      <ul className="events">
       {
         listData.map(item => (
           <li key={item.content}>
             <span className={`event-${item.color}`}>●</span>
             {item.content}
           </li>
         ))
       }
     </ul>
    )
  }
  componentDidMount(){
  }
  disabledDate=(current)=>{
    return current.valueOf() < Date.now() - 30 * 86400000 || current.valueOf() > Date.now();
  }
  render(){
    return(
      <Row>
        <Col xs = {{span:24}} sm = {{span:24}} md = {{span: 24}} lg = {{span:24}}>
          <Calendar onSelect = {this.dayInfo} dateCellRender = {this.renderData} disabledDate = {this.disabledDate} />
        </Col>
      </Row>
    )
  }
}
export default History;
