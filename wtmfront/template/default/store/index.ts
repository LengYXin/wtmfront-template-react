import { action, observable, runInAction, toJS } from "mobx";
import { HttpBasics } from "core/HttpBasics";
import { message } from "antd";
import storeBasice from 'core/storeBasice';
import Swagger from '../pageConfig.json';
export class Store extends storeBasice {
    constructor() {
        super({
            // api 地址前缀
            address: '{{{ address }}}'
        });
    }
    /** swagger 解析数据结构 */ 
    Swagger = Swagger
    /** 数据 ID 索引 */
    IdKey ='{{{ idKey }}}';
    pageButtons = {{{JSONStringify pageButtons }}}
}
export default new Store();