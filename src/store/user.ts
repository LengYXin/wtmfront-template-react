/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2018-09-12 18:52:54
 * @modify date 2018-09-12 18:52:54
 * @desc [description]
*/
import { ColumnProps } from "antd/lib/table";
import { action, observable, runInAction, toJS } from "mobx";
import { HttpBasics } from 'core/HttpBasics';
import { message } from 'antd';
const Http = new HttpBasics('/user/');
export default class Store {
    constructor() {

    }
    @observable loding = true;
    @observable isLogin = true;
    @observable User = {

    };
    @action.bound
    async Login(params) {
        this.User = params;
        // const result = await Http.post("doLogin", params).toPromise();
        runInAction(() => {
            // this.User = result;
            this.isLogin = true;
            
        });
    }
    @action.bound
    async outLogin() {
        this.isLogin = false;
    }

}
