import { action, observable, runInAction, toJS } from "mobx";
import { HttpBasics } from "core/HttpBasics";
import { message } from "antd";
import storeBasice from 'core/storeBasice';
export class Store extends storeBasice {
    constructor() {
        super({
            // api 地址前缀
            address: '/user/'
        });
    }
    /** 数据 ID 索引 */
    IdKey ='id';
    /** table 列配置  title dataIndex 必备字段 其他为api 返回默认字段*/
    columns = [
    {
        "title": "用户ID",
        "dataIndex": "id",
        "format": ""
    },
    {
        "title": "公司ID",
        "dataIndex": "corpID",
        "format": ""
    },
    {
        "title": "用户名",
        "dataIndex": "userName",
        "format": ""
    },
    {
        "title": "手机号",
        "dataIndex": "mobileNo",
        "format": ""
    },
    {
        "title": "座机号",
        "dataIndex": "telNo",
        "format": ""
    },
    {
        "title": "邮箱",
        "dataIndex": "email",
        "format": ""
    },
    {
        "title": "使用与否",
        "dataIndex": "useYN",
        "format": "int32"
    },
    {
        "title": "密码",
        "dataIndex": "password",
        "format": ""
    }
]
    pageButtons = {
    "install": true,
    "update": true,
    "delete": true,
    "import": true,
    "export": true
}
}
export default new Store();