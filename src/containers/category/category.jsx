import React, { Component } from 'react'
import { Button, Card, message, Table, Modal, Form, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { reqCategoryList } from '../../api/index'
import { PAGE_SIZE } from '../../config/index'

const {Item} = Form

export default class Category extends Component {
    state = {
        categoryList: [],
        visible: false,
        operType: ''//操作类型（新增、修改）
    }
    formRef = React.createRef()

    update = (a) => {
        console.log(a)
    }
    getCategotyList = async () => {
        let result = await reqCategoryList()
        const { status, data, msg } = result
        if (status === 0) {
            this.setState({ categoryList: data })
        } else {
            message.error(msg, 1)
        }
    }

    showAdd = () => {
        this.setState({
            operType: 'add',
            visible: true,
        });
    };

    showUpdate = () => {
        this.setState({
            operType: 'update',
            visible: true,
        });
    };

    handleOk = async() => {
        const {operType} = this.state
        if(operType === 'add'){

        }
        if(operType === 'update'){
            
        }
        const values = await this.formRef.current.validateFields()
        console.log(values)
        this.formRef.current.resetFields()
        this.setState({
            visible: false,
        });
    };

    handleCancel = () => {
        this.formRef.current.resetFields()
        this.setState({
            visible: false,
        });
    };

    componentDidMount() {
        this.getCategotyList()
    }

    render() {
        const dataSource = this.state.categoryList
        const {visible, operType} = this.state

        const columns = [
            {
                title: '分类名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                //dataIndex: 'age',
                key: 'age',
                render: (a) => {
                    return (
                        <Button type="link" onClick={this.showUpdate}>修改分类</Button>
                    )
                },
                width: '25%',
                align: 'center'
            },
        ];
        return (
            <div>
                <Card
                    extra={<Button type="primary" onClick={this.showAdd} icon={<PlusOutlined />}>添加</Button>}
                >
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        rowKey="_id"
                        pagination={{ pageSize: PAGE_SIZE }}
                        bordered
                    />;
                </Card>
                <Modal 
                    title={operType === 'add' ? '新增分类':'修改分类'}
                    visible={visible} 
                    onOk={this.handleOk} 
                    onCancel={this.handleCancel}
                    okText="确定"
                    cancelText="取消"
                >
                    <Form ref={this.formRef} name="normal_login" className="login-form" onFinish={this.onFinish}>
                        <Item name="username" rules={[
                            { required: true, whitespace: true, message: '分类名必须输入' }]}>

                            <Input
                                placeholder="请输入分类名"
                            />
                        </Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
