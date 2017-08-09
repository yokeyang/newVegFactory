import React, {Component} from 'react';
import Swiper from 'swiper';
import { Card,Table, Button } from 'antd';
import reqwest from 'reqwest';
import '../App.css';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  sorter: true,
  render: name => `${name.first} ${name.last}`,
  width: '20%',
}, {
  title: 'Gender',
  dataIndex: 'gender',
  filters: [
    { text: 'Male', value: 'male' },
    { text: 'Female', value: 'female' },
  ],
  width: '20%',
}, {
  title: 'Email',
  dataIndex: 'email',
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
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }
  fetch = (params = {}) => {
    console.log(params)
    this.setState({ loading: true });
    reqwest({
      url: 'https://randomuser.me/api',
      method: 'get',
      data: {
        results: 10,
        ...params,
      },
      type: 'json',
    }).then((data) => {
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      console.log(pagination);
      pagination.total = 20;
      this.setState({
        loading: false,
        data: data.results,
        pagination,
      });
    });
  }
  componentDidMount(){
    this.fetch();
    new Swiper('.swiper-container', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true
    });
  }
  render(){
    return(
      <div className="swiper-container">
        <div className="swiper-wrapper">
            <div className="swiper-slide">
              <Card title="Tom" bordered={false} style={{ width: '90%' }}>
                <Table columns={columns}
                  rowKey={record => record.registered}
                  dataSource={this.state.data}
                  pagination={this.state.pagination}
                  loading={this.state.loading}
                  onChange={this.handleTableChange}
                />
              </Card>
            </div>
            <div className="swiper-slide">
              <Card title="Jerry" bordered={false} style={{ width: '90%' }}>
                <Table columns={columns}
                  rowKey={record => record.registered}
                  dataSource={this.state.data}
                  pagination={this.state.pagination}
                  loading={this.state.loading}
                  onChange={this.handleTableChange}
                />
              </Card>
            </div>
            <div className="swiper-slide">
              <Card title="Bob" bordered={false} style={{ width: '90%' }}>
                <Table columns={columns}
                  rowKey={record => record.registered}
                  dataSource={this.state.data}
                  pagination={this.state.pagination}
                  loading={this.state.loading}
                  onChange={this.handleTableChange}
                />
              </Card>
            </div>
            <div className="swiper-slide">
              <Card title="Raul" bordered={false} style={{ width: '90%' }}>
                <Table columns={columns}
                  rowKey={record => record.registered}
                  dataSource={this.state.data}
                  pagination={this.state.pagination}
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
