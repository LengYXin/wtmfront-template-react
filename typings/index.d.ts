/**
 * 页面按钮
 */
interface IActions {
    /** 添加按钮 */
    install: boolean;
    /** 添加修改 */
    update: boolean;
    /** 删除按钮 */
    delete: boolean;
    /** 导入按钮 */
    import: boolean;
    /** 导出按钮 */
    export: boolean;
    [key: string]: boolean
}
/**
 * Swagger 解析格式
 */
interface ISwaggerModel {
    /** 模型唯一key */
    key?: string;
    /** 模型名称 swagger */
    name?: string;
    /** 控制器备注 */
    description?: string;
    /** 组件名称 编辑输入 */
    componentName?: string;
    /** 组件icon */
    icon?: string;
    /** 菜单名称 */
    menuName?: string;
    /** 模板 */
    template?: string;
    /** 操作权限 */
    actions?: IActions
    /** 数据 id 唯一标识  */
    idKey?: string;
    /** 地址前缀 */
    address?: string;
    /** teble 列 属性 */
    columns?: any[];
    /** 搜索条件 */
    search?: any[];
    /** 数据插入属性 */
    install?: any[];
    /** 数据修改属性 */
    update?: any[];

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
    available?: boolean;
    // 可编辑
    update?: boolean;
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
declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.css";
declare module "*.json";
declare var VConsole: any;
