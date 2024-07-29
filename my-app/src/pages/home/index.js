import React, { useEffect, useState, useRef } from 'react';
import { Col, Row, Card, Table } from 'antd';
import * as Icon from '@ant-design/icons';
import './home.css';
import { getData } from '../../api/index';
import Echart from '../../compoment/eccharts';

const countData = [
  {
    "name": "Orders paid today",
    "value": 1234,
    "icon": "CheckCircleOutlined",
    "color": "#2ec7c9"
  },
  {
    "name": "Orders collected today",
    "value": 3421,
    "icon": "ClockCircleOutlined",
    "color": "#ffb980"
  },
  {
    "name": "Unpaid orders today",
    "value": 1234,
    "icon": "CloseCircleOutlined",
    "color": "#5ab1ef"
  },
  {
    "name": "Orders paid this month",
    "value": 1234,
    "icon": "CheckCircleOutlined",
    "color": "#2ec7c9"
  },
  {
    "name": "Orders collected this month",
    "value": 3421,
    "icon": "ClockCircleOutlined",
    "color": "#ffb980"
  },
  {
    "name": "Unpaid orders this month",
    "value": 1234,
    "icon": "CloseCircleOutlined",
    "color": "#5ab1ef"
  }
];


const columns = [
  {
    title: 'Lesson',
    dataIndex: 'name'
  },
  {
    title: 'Purchase today',
    dataIndex: 'todayBuy'
  },
  {
    title: 'Purchase this month',
    dataIndex: 'monthBuy'
  },
  {
    title: 'Total purchases',
    dataIndex: 'totalBuy'
  }
];


const iconToelement = (name) => React.createElement(Icon[name]);

const Home = () => {
  const userimg = require('../../assets/images/user.png');
  const [tableData, setTableData] = useState([]);
  const [echartData, setEchartData] = useState({});
  const chartRef = useRef(null);

  useEffect(() => {
    getData().then(({ data }) => {
      console.log(data, 'res');
      const { tableData, orderData, userData, videoData } = data.data;
      setTableData(tableData);

      // 对于echart的组装
      const order = orderData;
      const xData = order.date;
      const keyArray = Object.keys(order.data[0]);
      const series = [];
      keyArray.forEach(key => {
        series.push({
          name: key,
          data: order.data.map(item => item[key]),
          type: 'line'
        });
      });

      const userSeries = [
        {
          name: 'Add data',
          data: userData.map(item => item.new),
          type: 'bar'
        },
        {
          name: 'Active users',
          data: userData.map(item => item.active),
          type: 'bar'
        }
      ];

      const videoSeries = [
        {
          name: 'Video data',
          data: videoData,
          type: 'pie'
        }
      ];

      setEchartData({
        order: {
          xData,
          series
        },
        user: {
          xData: userData.map(item => item.date),
          series: userSeries
        },
        video: {
          series: videoSeries
        }
      });
    });
  }, []);

  return (
    <Row className='home'>
      <Col span={8}>
        <Card hoverable>
          <div className='user'>
            <img src={userimg} alt="user" />
            <div className='userinfo'>
              <p className='name'>Admin</p>
              <p className='access'>Manager</p>
            </div>
          </div>
          <div className='login-info'>
            <p>Last login time:<span>2024-6</span></p>
            <p>Last login location:<span>Shang Hai</span></p>
          </div>
        </Card>
        <Card>
          <Table columns={columns} dataSource={tableData} pagination={false} rowKey={"name"} />
        </Card>
      </Col>
      <Col span={16}>
        <div className='num'>
          {countData.map((item, index) => (
            <Card key={index}>
              <div className='icon-box' style={{ background: item.color }}>{iconToelement(item.icon)}</div>
              <div className='detail'>
                <p className='num'>${item.value}</p>
                <p className='txt'>{item.name}</p>
              </div>
            </Card>
          ))}
        </div>
        {echartData.order && <Echart chartData={echartData.order} style={{ height: '280px' }} />}
        <div className='graph' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {echartData.user && <Echart chartData={echartData.user} style={{ height: '240px', flex: '1 1 48%' }} />}
          {echartData.video && <Echart chartData={echartData.video} style={{ height: '260px', flex: '1 1 48%' }} isAxisChart={false} />}
        </div>
      </Col>
    </Row>
  );
}

export default Home;
