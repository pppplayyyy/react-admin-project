import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './css/login.less'
import logo from './images/logo.png'
const Item = Form.Item

export default class Login extends Component {
    onFinish = (values) => {
        console.log('Received values of form: ', values);
    }

    validatePwd = (rule, value, callback) => {
        console.log('validatePwd()', rule, value)
        if (!value) {
            callback('密码必须输入')
        } else if (value.length < 4) {
            callback('密码长度不能小于4位')
        } else if (value.length > 12) {
            callback('密码长度不能大于12位')
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('密码必须是英文、数字或下划线组成')
        } else {
            callback() // 验证通过
        }
    }
        render() {
            return (
                <div className="login">
                    <header className="login-header">
                        <img src={logo} alt="logo" />
                        <h1>React项目: 后台管理系统</h1>
                    </header>
                    <section className="login-content">
                        <h2>用户登陆</h2>
                        <Form name="normal_login" className="login-form" onFinish={this.onFinish}>
                            <Item name="username" rules={[
                                { required: true, whitespace: true, message: '用户名必须输入' },
                                { min: 4, message: '用户名至少4位' },
                                { max: 12, message: '用户名最多12位' },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' }]}>

                                <Input
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    placeholder="用户名"
                                />
                            </Item>
                            <Item name="password" rules={[{ validator: this.validatePwd }]}>
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="密码"
                                />
                            </Item>
                            <Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登陆
                                </Button>
                            </Item>
                        </Form>
                    </section>
                </div>
            )
        }
    }
