import React, { Component } from 'react';
import {Layout, Menu, Breadcrumb, Icon, Avatar} from 'antd';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import {Route} from 'react-router';
import './App.css';
import Monitor from './components/Monitor';
import Lightcontrol from './components/Lightcontrol';
import Record from './components/Record';
import History from './components/History';
import Onekey from './components/Onekey';
import $ from 'jquery';

const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
class App extends Component {
  constructor() {
    super();
    this.state = {
      collapsed:document.documentElement.clientWidth <= 1100?true:false,
      mode: 'inline',
      Breadcrumb: ['首页'],
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  onCollapse = (collapsed) => {
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  }
  onClick = (item, key, keyPath) => {
    this.setState({Breadcrumb:item.keyPath})
  }
  render() {
    return (
      <Router>
        <Layout style = {{height:'100vh'}}>
          <Sider collapsedWidth={0} trigger = {null} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo">蔬菜工厂</div>
            <Menu theme="dark" mode={this.state.mode} onClick = {this.onClick}>
              <Menu.Item key="实时监控">
                <Link to = "/Monitor">
                  <Icon type="area-chart" />
                  <span className="nav-text">
                    实时监控
                  </span>
                </Link>
              </Menu.Item>
              <SubMenu key="远程控制" title={<span><Icon type="desktop" /><span className="nav-text">远程控制</span></span>}>
                <Menu.Item key="光线控制">
                  <Link to = "/Lightcontrol">
                    <Icon type="bulb" />
                    <span className="nav-text">光线控制</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="传感器控制">
                  <Link to = "/Sensorcontrol">
                    <Icon type="hourglass" />
                    <span className="nav-text">传感器控制</span>
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="用户记录" title={<span><Icon type="team" /><span className="nav-text">用户记录</span></span>}>
                <Menu.Item key="操作记录">
                  <Link to = "/Record">
                    <Icon type="pushpin-o" />
                    <span className="nav-text">操作记录</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="历史记录">
                  <Link to = "/History">
                    <Icon type="solution" />
                    <span className="nav-text">历史记录</span>
                  </Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="一键控制">
                <Link to = "/Onekey">
                  <Icon type="key" />
                  <span className="nav-text">一键控制</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header className = "head">
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <Avatar className = "Avatar" size = "large" icon="user" />
            </Header>
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '12px 0' }}>
                {this.state.Breadcrumb.reverse().map((item,index) => {
                  return(
                    <Breadcrumb.Item key = {item + index}>{item}</Breadcrumb.Item>
                  )
                })}
              </Breadcrumb>
              <div style={{ padding: 24, background: '#fff', minHeight: '80vh' }}>
                <Route path="/Monitor" component={Monitor} />
                <Route path="/Lightcontrol" component={Lightcontrol} />
                <Route path="/Record" component={Record} />
                <Route path="/History" component={History} />
                <Route path="/Onekey" component={Onekey} />
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
               Created by 布谷鸟团队
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}
export default App;
