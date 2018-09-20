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
        "title": "职位ID",
        "dataIndex": "posID",
        "format": ""
    },
    {
        "title": "职责ID",
        "dataIndex": "dutyID",
        "format": ""
    },
    {
        "title": "密码",
        "dataIndex": "password",
        "format": ""
    },
    {
        "title": "部门组织ID",
        "dataIndex": "deptGroup",
        "format": ""
    },
    {
        "title": "创建用户ID",
        "dataIndex": "createUser",
        "format": ""
    },
    {
        "title": "创建日期",
        "dataIndex": "createDate",
        "format": "date-time"
    },
    {
        "title": "修改用户ID",
        "dataIndex": "updateUser",
        "format": ""
    },
    {
        "title": "修改日期",
        "dataIndex": "updateDate",
        "format": "date-time"
    }
]
    pageButtons = {
    "install": true,
    "update": true,
    "delete": true,
    "import": true,
    "export": false
}
}
export default new Store();