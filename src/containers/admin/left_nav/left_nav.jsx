import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createSaveTitleAction} from '../../../redux/action_creators/menu_action'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Button } from 'antd';
import {
    HomeOutlined,
    AppstoreOutlined,
    UnorderedListOutlined,
    ToolOutlined,
} from '@ant-design/icons';
import logo from '../../../static/imgs/logo.png'
import menuList from '../../../config/menu_config'
import './left_nav.less'

const { SubMenu, Item } = Menu;
@connect(
    state => ({}),
    {
        saveTitle: createSaveTitleAction
    }
)
@withRouter
class LeftNav extends Component {
    //用于创建菜单
    createMenu = (target) => {
        return target.map((item) => {
            if (!item.children) {
                return (
                    <Item key={item.key} icon={item.icon} onClick={() => {this.props.saveTitle(item.title)}}>
                        <Link to={item.path}>{item.title}</Link>
                    </Item>
                )
            } else {
                return (
                    <SubMenu key={item.key} icon={item.icon} title={item.title}>
                        {this.createMenu(item.children)}
                    </SubMenu>
                )
            }
        })
    }
    render() {
        return (
            <div>
                <header className="nav-header">
                    <img src={logo}></img>
                    <h1>商品管理系统</h1>
                </header>
                <Menu
                    defaultSelectedKeys={this.props.location.pathname.split('/').reverse()[0]}
                    defaultOpenKeys={this.props.location.pathname.split('/')}
                    mode="inline"
                    theme="dark"
                >
                    {/* <Item key="home" icon={<HomeOutlined />}>
                        <Link to="/admin/home">首页</Link>
                    </Item>
                    <SubMenu key="prod_about" icon={<AppstoreOutlined />} title="商品">
                        <Item key="category" icon={<UnorderedListOutlined />}>
                            <Link to="/admin/prod_about/category">分类管理</Link>
                        </Item>
                        <Item key="product" icon={<ToolOutlined />}>
                            <Link to="/admin/prod_about/product">商品管理</Link>
                        </Item>
                    </SubMenu> */}
                    {
                        this.createMenu(menuList)
                    }
                </Menu>
            </div>
        )
    }
}
export default LeftNav
