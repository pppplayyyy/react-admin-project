import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'
import { connect } from 'react-redux'
import { createDeleteUserInfoAction } from '../../redux/action_creators/login_action'
import { reqCategoryList } from '../../api'
import './css/admin.less'
import Header from './header'
import Home from '../../components/home/home'
import Bar from '../bar/bar'
import Category from '../category/category'
import Line from '../line/line'
import Pie from '../pie/pie'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import LeftNav from './left_nav/left_nav'

const { Footer, Sider, Content } = Layout;

@connect(
    state => ({ userInfo: state.userInfo }),
    {
        deleteUserInfo: createDeleteUserInfoAction
    }
)
class Admin extends Component {
    componentDidMount() {
        console.log(this.props)
    }
    logout = () => {
        this.props.deleteUserInfo()
    }
    render() {
        const { user, isLogin } = this.props.userInfo
        if (!isLogin) {
            return <Redirect to='/login' />
        } else {
            return (
                <Layout className="admin">
                    <Sider className="sider">
                        <LeftNav/>
                    </Sider>
                    <Layout>
                        <Header/>
                        <Content className="content">
                            <Switch>
                                <Route path="/admin/home" component={Home}></Route>
                                <Route path="/admin/prod_about/category" component={Category}></Route>
                                <Route path="/admin/prod_about/product" component={Product}></Route>
                                <Route path="/admin/user" component={User}></Route>
                                <Route path="/admin/role" component={Role}></Route>
                                <Route path="/admin/charts/bar" component={Bar}></Route>
                                <Route path="/admin/charts/line" component={Line}></Route>
                                <Route path="/admin/charts/pie" component={Pie}></Route>
                                <Redirect to="admin/home"></Redirect>
                            </Switch>
                        </Content>
                        <Footer className="footer">Footer</Footer>
                    </Layout>
                </Layout>
            )
        }
    }
}

export default Admin

// export default connect(
//     state => ({userInfo: state.userInfo}),
//     {
//         deleteUserInfo:createDeleteUserInfoAction
//     }
// )(Admin)
