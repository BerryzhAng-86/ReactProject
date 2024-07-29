// src/component/comheader/index.js
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, Avatar, Dropdown } from 'antd';
import { MyContext } from '../../appcontext.js/index';  // Corrected path


const { Header } = Layout;

const ComHeader = () => {
  const navigate=useNavigate()
  const { close, SetClose } = useContext(MyContext);

  const logout = () => {
    // clear token
    localStorage.removeItem('token')
    navigate('/login')

  };

  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer">
          Personal Center
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a onClick={logout} target="_blank" rel="noopener noreferrer">
          Log Out
        </a>
      ),
    },
  ];

  const setCollapse = () => {
    SetClose(!close);
  };

  return (
    <Header className='header-container'>
      <Button
        onClick={setCollapse}
        type="text"
        icon={close ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        style={{
          fontSize: '16px',
          width: 64,
          height: 32,
          backgroundColor: 'white',
        }}
      />
      <Dropdown menu={{ items }}>
        <Avatar src={<img size={36} src={require('../../assets/images/user.png')} alt="user" />} />
      </Dropdown>
    </Header>
  );
};

export default ComHeader;
