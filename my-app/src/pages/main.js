// src/pages/main.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import ComAside from '../compoment/comaside/index'; // Corrected path
import ComHeader from '../compoment/comheader/index'; // Corrected path
import { Layout, theme } from 'antd';
import { MyProvider } from '../appcontext.js/index'; // Corrected path
import { RouterAuth } from '../router/routerAuth';

const { Content } = Layout;

const Main = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <MyProvider>
       <RouterAuth>
      <Layout className='main-container'>
       
        <ComAside />
        <Layout>
          <ComHeader />
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      </RouterAuth>
    </MyProvider>
  );
};

export default Main;
