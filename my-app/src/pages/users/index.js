import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Table, Popconfirm, Modal, message, InputNumber, Select, DatePicker } from 'antd';
import './index.css';
import { getUser, create, update,deleteData } from '../../api'; 
import dayjs from 'dayjs';

const Users = () => {
  const [modalType, setModalType] = useState(0); // 0: add, 1: edit
  const [listData, setListData] = useState({
    name: ''
  });
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editData, setEditData] = useState(null);

  const handleClick = (type, rowData) => {
    setModalOpen(true);
    if (type === 'add') {
      setModalType(0);
      form.resetFields(); // Reset Form
    } else {
      setModalType(1);
      setEditData(rowData);
      form.setFieldsValue({
        ...rowData,
        birth: dayjs(rowData.birth)
      }); // Fill out the form
    }
  };

  const handleFinish = (values) => {
    setListData({ name: values.keyword });
  };
  useEffect(()=>{
    getTableData()
  },[listData])

  const handleDelete = ({id}) => {
    // Delete people
    deleteData({id}).then(()=>{
      getTableData()
    })
  };

  const handleOk = () => {
    form.validateFields().then((val) => {
      val.birth = dayjs(val.birth).format('YYYY-MM-DD');
     
      if (modalType === 1) {
        update({ ...editData, ...val }).then(() => {
          message.success('User edit successful');
          handleCancel();
          getTableData(); // Reload table data
        }).catch(error => {
          console.error('Failed to update user:', error);
        });
      } else {
        create(val).then(() => {
          message.success('User added successfully');
          handleCancel();
          getTableData(); // Retrieve table data again
        }).catch(error => {
          console.error('Failed to add user:', error);
        });
      }
    }).catch((error) => {
      console.error('Validation failed:', error);
    });
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const columns = [{
    title: 'Name',
    dataIndex: 'name'
  }, {
    title: 'Age',
    dataIndex: 'age'
  }, {
    title: 'Sex',
    dataIndex: 'sex',
    render: (val) => {
      return val ? 'Woman' : 'Man';
    }
  }, {
    title: 'Birthday',
    dataIndex: 'birth'
  }, {
    title: 'Address',
    dataIndex: 'addr'
  }, {
    title: 'Action',
    render: (rowData) => {
      return (
        <div className='flex-box'>
          <Button style={{ marginRight: '5px' }} onClick={() => handleClick('edit', rowData)}>Edit</Button>
          <Popconfirm
            title='Prompt'
            description='This action will delete the user. Do you agree?'
            okText='Confirm'
            cancelText='Cancle'
            onConfirm={() => handleDelete(rowData)}
          >
            <Button type='primary' danger>Delete</Button>
          </Popconfirm>
        </div>
      );
    }
  }];

  const getTableData = () => {
    getUser(listData).then(({ data }) => {
     
      setTableData(data.list);
    }).catch(error => {
      console.error("Request failed.", error);
    });
  };

  useEffect(() => {
    getTableData();
  }, [listData]);

  return (
    <div className='user'>
      <div className='flex-box space-between'>
        <Button type='primary' onClick={() => handleClick('add')}>+Add</Button>
        <Form layout='inline' onFinish={handleFinish}>
          <Form.Item name='keyword'>
            <Input placeholder='Enter username.' />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' type='primary'>Search</Button>
          </Form.Item>
        </Form>
      </div>
      <Table columns={columns} dataSource={tableData} rowKey={'id'} />
      <Modal
        open={isModalOpen}
        title={modalType ? 'Edit' : 'Add'}
        onOk={handleOk}
        onCancel={handleCancel}
        okText='Confirm'
        cancelText='Cancle'>
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          labelAlign='left'>
          <Form.Item
            label='Name'
            name='name'
            rules={[{ required: true, message: 'Please enter your name.' }]}
          >
            <Input placeholder='Please enter your name.' />
          </Form.Item>
          <Form.Item
            label='Age'
            name='age'
            rules={[
              { required: true, message: 'Please enter your age.' },
              { type: 'number', message: 'Age must be number' }
            ]}
          >
            <InputNumber placeholder='Please enter your name.' />
          </Form.Item>
          <Form.Item
            label='Sex'
            name='sex'
            rules={[{ required: true, message: 'Please chose your sex' }]}
          >
            <Select
              placeholder='Please chose your sex'
              options={[
                { value: 0, label: 'Man' },
                { value: 1, label: 'Woman' }
              ]}
            />
          </Form.Item>
          <Form.Item
            label='birthday'
            name='birth'
            rules={[{ required: true, message: 'Please select a date of birth.' }]}
          >
            <DatePicker placeholder='Please choose' format='YYYY/MM/DD' />
          </Form.Item>
          <Form.Item
            label='Address'
            name='addr'
            rules={[{ required: true, message: 'Please write your address' }]}
          >
            <Input placeholder='Write your address' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Users;
