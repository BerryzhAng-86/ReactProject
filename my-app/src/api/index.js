import http from './axios';

export const getData = () => {
  return http.request({
    url: '/home/getdata',
    method: 'get'
  });
};

export const getUser = (params) => {
  return http.request({
    url: '/user/getuser',
    method: 'get',
    params
  });
};

export const create = (data) => {
  return http.request({
    url: '/user/create',
    method: 'post',
    data
  });
};

export const update = (data) => {
  return http.request({
    url: '/user/update',
    method: 'post',
    data
  });
};

export const deleteData = (data) => {
  return http.request({
    url: '/user/deleteData',
    method: 'post',
    data
  });
};

export const getMenu=(data)=>{
  return http.request({
    url: '/permission/getMenu',
    method: 'post',
    data
  });
}