import { action, observable, runInAction, toJS } from "mobx";
import { HttpBasics } from "core/HttpBasics";
import { message } from "antd";
import storeBasice from 'core/storeBasice';
import Swagger from '../pageConfig.json';
export class Store extends storeBasice {
    constructor() {
        super({
            // api 地址前缀
            address: '/baseProductinfo/'
        });
    }
    /** swagger 解析数据结构 */ 
    Swagger = Swagger
    /** 数据 ID 索引 */
    IdKey ='id';
    pageButtons = {
    "install": true,
    "update": true,
    "delete": true,
    "import": true,
    "export": true,
    "columns": true
}
}
export default new Store();