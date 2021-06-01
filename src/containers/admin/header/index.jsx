import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import { Button, Modal } from 'antd'
import { FullscreenOutlined, FullscreenExitOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import screenfull from 'screenfull'
import dayjs from 'dayjs'
import {createDeleteUserInfoAction} from '../../../redux/action_creators/login_action'
import menuList from '../../../config/menu_config'
import './css/header.less'
const { confirm } = Modal;

@connect(
    state => ({
        userInfo: state.userInfo,
        title: state.title
    }),
    {
        deleteUser: createDeleteUserInfoAction
    }
)
//把非路由组件包装成路由组件
@withRouter
class Header extends Component {
    state = {
        isFull: false,
        date: dayjs().format('YYYY年 MM月DD日 HH:mm:ss'),
        title: ''
    }

    fullscreen = () => {
        screenfull.toggle()
    }

    logout = () => {
        let {deleteUser} = this.props
        confirm({
            title: '确定退出?',
            icon: <ExclamationCircleOutlined />,
            content: '退出登录需要重新登录信息',
            canelText: '取消',
            okText: '确认',
            onOk() {
              deleteUser()
            },
            onCancel() {
            },
          });
    }

    getTitle = () => {
        console.log('.......')
        let pathKey = this.props.location.pathname.split('/').reverse()[0]
        let title = ''
        menuList.forEach((item) => {
            if(item.children instanceof Array){
                let tmp = item.children.find((citem) => {
                    return citem.key === pathKey
                })
                if(tmp){
                    title = tmp.title
                }
            }else{
                if(pathKey === item.key){
                    title = item.title
                }
            }
        })
        this.setState({title})
    }

    componentDidMount(){
        screenfull.on('change', ()=>{
            let isFull = !this.state.isFull
            this.setState({isFull})
        });
        this.time = setInterval(()=>{
            this.setState({date: dayjs().format('YYYY年 MM月DD日 HH:mm:ss') })
        },1000)
        this.getTitle()
    }

    componentWillUnmount(){
        clearInterval(this.time)
    }

    render() {
        let {isFull} = this.state
        return (
            <header className="header">
                <div className="header-top">
                    <Button size="small" onClick={this.fullscreen}>
                        {isFull ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
                    </Button>
                    <span className="username">欢迎, {this.props.userInfo.user.username}</span>
                    <Button type="link" onClick={this.logout}>退出</Button>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        {this.props.title || this.state.title}
                    </div>
                    <div className="header-bottom-right">
                        {this.state.date}
                        <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="weather"></img>
                        晴天
                    </div>
                </div>
            </header>
        )
    }
}
export default Header
