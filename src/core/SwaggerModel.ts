import { message } from 'antd';
import { action, computed, observable, runInAction } from 'mobx';
import NProgress from 'nprogress';
import wtmfront from 'wtmfront.json';
import Common from './Common';
import lodash from 'lodash';
import { HttpBasics } from './HttpBasics';
interface Ifield {
    type: string;
    description: string;
    allowEmptyValue: boolean;
    rules: any[];
    attribute: any;
    key: string;
    format: string;
}
interface Icolumns {
    title: string;
    dataIndex: string;
    format: string
}
/**
 * swagger 模型信息
 */
export default class SwaggerModel {
    constructor() {
        console.log(this);
    }
    /**
     * swagger 解析信息 
     */
    Swagger: ISwaggerModel;
    /**
    * 列属性配置
    */
    private _columns: Icolumns[];
    public get columns(): Icolumns[] {
        // 取出 所有标记可用的 table选项
        if (!this._columns) {
            this._columns = this.Swagger.columns.filter(x => x.attribute.available).map(x => {
                return {
                    title: x.description,
                    dataIndex: x.key,
                    format: x.format || '',
                }
            })
        }
        return this._columns
    }
    /**
     * 添加属性
     */
    private _install: Ifield[];
    public get install(): Ifield[] {
        if (!this._install) {
            this._install = this.Swagger.install.filter(x => x.attribute.available)
        }
        return this._install;
    }
    /**
     * 隐藏的添加属性
     */
    private _hideInstall: Ifield[];
    public get hideInstall(): Ifield[] {
        if (!this._hideInstall) {
            this._hideInstall = this.Swagger.install.filter(x => !x.attribute.available)
        }
        return this._hideInstall;
    }
    /**
     * 需要追加的添加属性。
     */
    @observable
    private _appendInstall: Ifield[];
    @computed
    public get appendInstall(): Ifield[] {
        if (!this._appendInstall) {
            this._appendInstall = [];
        }
        return this._appendInstall;
    }
    public set appendInstall(value: Ifield[]) {
        this._appendInstall = lodash.filter(this.Swagger.install, x => lodash.includes(value, x.key));
    }

}