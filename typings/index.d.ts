/**
 * Swagger 解析格式
 */
interface ISwaggerModel {
    idKey: string,    //唯一标识
    address: string,    //地址控制器
    columns: any[],    //teble 列
    search: any[],     //搜索条件
    // edit: {},    //编辑字段
    install: any[],    //添加字段
    update: any[],      //修改字段
    buttonShow: {     //按钮 
        add: boolean,
        import: boolean,
        delete: boolean
    }
}
/**
 * 公共属性
 */
interface ICommon {
    address?: string;
    params?: {
        [key: string]: any
    }
}
/**
 * 自定义属性
 */
interface IAttribute {
    // 可用
    available?: boolean,
    // 可编辑
    update?: boolean,
    // 公共属性
    common?: ICommon
}
/**
 * 当前环境 true：生产
 */
declare var PRODUCTION: boolean;
/**
 * API地址
 */
declare var APIADDRESS: string;
declare module "*.png" {
    const value: any;
    export = value;
}
declare module "*.svg" {
    const value: any;
    export = value;
}
declare module "*.json" {
    const value: any;
    export default value;
}
declare var VConsole: any;
