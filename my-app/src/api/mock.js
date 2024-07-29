import Mock from 'mockjs';
import homeApi from './mockServeData/home';  // 确保路径正确
import userApi from './mockServeData/user';  // 确保路径正确
import permission from './mockServeData/permission';
// 拦截API请求
Mock.mock(/home\/getdata/, homeApi.getStatisticalData);
Mock.mock(/user\/getuser/, userApi.getUserList);
Mock.mock(/user\/create/, 'post', userApi.createUser);
Mock.mock(/user\/deleteData/, 'post', userApi.deleteUser);
Mock.mock(/user\/batchremove/, 'post', userApi.batchremove);
Mock.mock(/user\/update/, 'post', userApi.updateUser);
Mock.mock(/permission\/getMenu/, 'post', permission.getMenu);

