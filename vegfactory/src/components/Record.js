import React, {Component} from 'react';
import Swiper from 'swiper';
import { Card,Table, Button } from 'antd';
import '../App.css';
import $ from 'jquery';

const columns = [{
  title: '日期',
  dataIndex: 'time',
  width: '20%'
}, {
  title: '操作装置',
  dataIndex: 'machine',
  width: '20%',
  filters: [{
    text: '灯光',
    value: 'light',
    children:[{
      text:'红光',
      value:'红光'
    },{
      text:'蓝光',
      value:'蓝光'
    },{
      text:'绿光',
      value:'绿光'
    },{
      text:'紫光',
      value:'紫光'
    }]
  }],
  onFilter: (value, record) => record.machine.indexOf(value) === 0,
}, {
  title: '操作',
  dataIndex: 'action',
}];

class Record extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: [],
      pagination: {},
      loading: false,
    }
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      page: pagination.current,
    });
  }
  fetch = (params = {}) => {
    this.setState({ loading: true })
    const _this = this
    $.ajax({
      url: '/api/history',
      type: 'GET',
      dataType: 'json',
      data: {
        results: 20,
        ...params
      }
    })
    .done(function(data) {
      const pagination = { ..._this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = 20
      _this.setState({
        loading: false,
        data: data.result,
        pagination,
      });
    })
    .fail(function() {
      console.log("error");
    })
  }
  componentDidMount(){
    this.fetch()
    const _this = this
    new Swiper('.swiper-container', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        onSlideChangeEnd: function(swiper){
          console.log(1)
          _this.fetch()
        }
    });
  }
  render(){
    return(
      <div className="swiper-container">
        <div className="swiper-wrapper">
            <div className="swiper-slide">
              <Card title="Tom" bordered={false} style={{ width: '90%' }}>
                <Table columns={columns}
                  key={1}
                  dataSource={this.state.data}
                  loading={this.state.loading}
                  onChange={this.handleTableChange}
                />
              </Card>
            </div>
            <div className="swiper-slide">
              <Card title="Jerry" bordered={false} style={{ width: '90%' }}>
                <Table columns={columns}
                  key={2}
                  dataSource={this.state.data}
                  loading={this.state.loading}
                  onChange={this.handleTableChange}
                />
              </Card>
            </div>
            <div className="swiper-slide">
              <Card title="Bob" bordered={false} style={{ width: '90%' }}>
                <Table columns={columns}
                  key={3}
                  dataSource={this.state.data}
                  loading={this.state.loading}
                  onChange={this.handleTableChange}
                />
              </Card>
            </div>
        </div>
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
    </div>
    )
  }
};
export default Record;
// handleTableChange = (pagination, filters, sorter) => {
//   const pager = { ...this.state.pagination };
//   pager.current = pagination.current;
//   this.setState({
//     pagination: pager,
//   });
//   this.fetch({
//     results: pagination.pageSize,
//     page: pagination.current,
//     sortField: sorter.field,
//     sortOrder: sorter.order,
//     ...filters,
//   });
// }
// fetch = (params = {}) => {
//   console.log(params)
//   this.setState({ loading: true });
//   reqwest({
//     url: 'https://randomuser.me/api',
//     method: 'get',
//     data: {
//       results: 10,
//       ...params,
//     },
//     type: 'json',
//   }).then((data) => {
//     const pagination = { ...this.state.pagination };
//     // Read total count from server
//     // pagination.total = data.totalCount;
//     console.log(data.results);
//     pagination.total = 20;
//     this.setState({
//       loading: false,
//       data: data.results,
//       pagination,
//     });
//   });
// }
