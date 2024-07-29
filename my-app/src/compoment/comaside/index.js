// src/component/comaside/index.js
import React, { useContext } from 'react';
import MenuConfig from '../../config';
import * as Icon from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { MyContext } from '../../appcontext.js/index'; // Corrected path

const { Sider } = Layout;

// dynamically get icon components according to Ant Design requirements
const iconToElement = (name) => React.createElement(Icon[name]);

const items = MenuConfig.map((icon) => {
  const child = {
    key: icon.path,
    icon: iconToElement(icon.icon),
    label: icon.label,
  };
  if (icon.children) {
    child.children = icon.children.map((item) => ({
      key: item.path,
      label: item.label,
      icon: iconToElement(item.icon),
    }));
  }
  return child;
});

const ComAside = () => {
  const navigate = useNavigate();
  const { close } = useContext(MyContext);

  const selectMenu = (e) => {
    navigate(e.key);
  };

  return (
    <Sider trigger={null} collapsible collapsed={close}>
      <h3 className='app-name'>{close ? 'bakedBackend' : 'General Backend Management Platform'}</h3>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={items}
        style={{ height: '90%' }}
        onClick={selectMenu}
      />
    </Sider>
  );
};

export default ComAside;
