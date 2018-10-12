/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2018-07-24 02:18:59
 * @modify date 2018-09-10 02:18:59
 * @desc [description]
*/
/// <reference path="../../typings/index.d.ts" />
import 'babel-polyfill';
require('antd/dist/antd.less')
require('ant-design-pro/dist/ant-design-pro.css')
require('nprogress/nprogress.css')
import * as React from 'react';
import ReactDOM from 'react-dom';
import { notification } from 'antd';
import Swagger from './swagger';
import "./style.less";
notification.config({
  duration: 3,
  top: 60 
});
ReactDOM.render(<Swagger />,
  document.getElementById('root'));
