import { action, observable, runInAction, toJS } from "mobx";
import { HttpBasics } from "core/HttpBasics";
import { message } from "antd";
import StoreBasice from 'core/StoreBasice';
import Swagger from '../pageConfig.json';
export class Store extends StoreBasice {
    constructor() {
        super({
            // api 地址前缀
            address: '/student/'
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
    "export": true
}
}
export default new Store();