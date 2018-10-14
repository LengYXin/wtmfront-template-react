/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2018-09-10 05:01:05
 * @modify date 2018-09-10 05:01:05
 * @desc [description]
*/
import { notification, Button } from 'antd';
import lodash from 'lodash';
import { action, toJS, observable } from 'mobx';
import wtmfront from 'wtmfront.json';
import update from 'immutability-helper';
import swaggerDoc from './swaggerDoc';
const initData: ISwaggerModel = {
    key: null,
    name: null,
    componentName: null,
    menuName: null,
    icon: null,
    description: null,
    template: "default",
    actions: {
        install: true,
        update: true,
        delete: true,
        import: true,
        export: true
    },
    idKey: "id",    //唯一标识
    address: null,    //地址控制器
    columns: [],    //teble 列
    search: [],     //搜索条件
    // edit: {},    //编辑字段
    install: [],    //添加字段
    update: [],    //修改字段

}
class ObservableStore {
    /**
     * 构造
     */
    constructor() {

    }
    GUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    // 已解析模型
    ModelMap = new Map<string, any>();
    @observable ModelJSON = {};
    @observable visible = {
        ModelJSON: false
    };
    /** 当前编辑模型 */
    @observable Model: ISwaggerModel = lodash.cloneDeep(initData);
    /** 就绪待生成模型 */
    @observable readyModel: ISwaggerModel[] = [];
    /** 选择的 tag  swagger 原始 格式数据*/
    @observable selectTag = {
        description: "",//备注
        name: "",//控制器
        paths: []//控制器下地址
    };
    /** json */
    @action.bound
    onShowModelJSON(value) {
        console.info("ShowModelJSON", toJS(value));
        this.ModelJSON = JSON.stringify(value, null, 4);
        this.onVisible("ModelJSON", true);
    }
    /** 功能改变 */
    @action.bound
    changeButton(attr, flag: boolean) {
        this.Model.actions[attr] = flag
    }
    /** 重置数据 模型 */
    @action.bound
    onReset() {
        this.Model = lodash.cloneDeep(initData);
        this.selectTag = {
            description: "",
            name: "",
            paths: []
        };
    }
    @action.bound
    onSetModel(Model) {
        this.Model = Model;
    }
    /** 保存模型 */
    @action.bound
    onSaveInfo(info) {
        this.Model.componentName = info.componentName;
        this.Model.template = info.template;
        this.Model.menuName = info.menuName;
        this.Model.icon = info.icon;
    }
    /** 清空 */
    @action.bound
    onEmpty() {
        this.readyModel = [];
    }
    /** 删除 */
    @action.bound
    onDelete(index) {
        this.readyModel.splice(index, 1);
    }
    /** 保存模型 */
    @action.bound
    onSave() {
        let res = false;
        if (lodash.isNil(this.Model.key)) {
            const index = lodash.findIndex(this.readyModel, x => x.componentName == this.Model.componentName);
            if (index == -1) {
                res = true;
                this.Model.key = this.GUID();
                this.readyModel.push(this.Model);
            } else {
                notification.error({
                    key: "decompose",
                    message: `组件 ${this.Model.componentName} 已经存在`,
                    description: '',
                })
            }
        } else {
            const index = lodash.findIndex(this.readyModel, x => x.key == this.Model.key);
            this.readyModel.splice(index, 1, this.Model);
            res = true;
        }
        if (res) {
            notification.success({
                key: "decompose",
                message: `组件 ${this.Model.componentName} 已保存`,
                description: '',
            })
            this.onReset();
        }
    }
    /** swaggerDoc */
    definitions = null;// toJS(this.swaggerDoc.docData.definitions);
    @action.bound
    onVisible(key: "ModelJSON", value = !this.visible[key]) {
        this.visible[key] = value;
    }
    /**
     * 解析 tag
     * @param selectTag 
     */
    onAnalysis(index) {
        // console.time();
        if (!this.definitions) {
            this.definitions = toJS(swaggerDoc.docData.definitions);
        }
        const selectTag = this.selectTag = toJS(swaggerDoc.docData.tags[index]);
        if (this.ModelMap.has(selectTag.name)) {
            this.Model = this.ModelMap.get(selectTag.name);
        } else {
            this.analysisAddress();
            this.analysisColumns();
            this.analysisSearch();
            this.analysisEdit();
            this.ModelMap.set(selectTag.name, toJS(this.Model));
        }
        // console.timeEnd();
        console.log("--------------------------", this);
        return this.Model;
    }
    @action.bound
    onAnalysisTag(tag) {
        console.log(toJS(tag));
        if (!this.definitions) {
            this.definitions = toJS(swaggerDoc.docData.definitions);
        }
        const selectTag = this.selectTag = toJS(tag);
        if (this.ModelMap.has(selectTag.name)) {
            this.Model = this.ModelMap.get(selectTag.name);
        } else {
            this.Model = lodash.cloneDeep(initData);
            this.analysisAddress();
            this.analysisColumns();
            this.analysisSearch();
            this.analysisEdit();
            this.Model.name = this.selectTag.name;
            this.Model.description = this.selectTag.description;
            this.ModelMap.set(selectTag.name, toJS(this.Model));
        }
        // console.timeEnd();
        console.log("--------------------------", toJS(this.Model));
        return this.Model;
    }
    /**
     * 解析 路径地址前缀
     */
    @action.bound
    analysisAddress(tag = this.selectTag) {
        const path = lodash.find(tag.paths, (o) => lodash.includes(o.key, wtmfront.standard.search.name));
        this.Model.address = path.key.replace(wtmfront.standard.search.name, "");
    }
    /**
     * 解析 表格列字段
     */
    @action.bound
    analysisColumns(tag = this.selectTag) {
        const path = lodash.find(tag.paths, (o) => lodash.includes(o.key, wtmfront.standard.search.name));
        // 结果索引
        const responses = lodash.find(path.responses, 'schema');
        const definitions = this.analysisDefinitions(responses, true);

        this.Model.columns = lodash.toArray(definitions.properties);
    }
    /**
     * 解析 编辑列字段
     */
    @action.bound
    analysisEdit(tag = this.selectTag) {
        const pathInstall = lodash.find(tag.paths, (o) => lodash.includes(o.key, wtmfront.standard.install.name));
        const pathUpdate = lodash.find(tag.paths, (o) => lodash.includes(o.key, wtmfront.standard.install.name));
        // 结果索引
        const install = lodash.find(pathInstall.parameters, 'schema');
        const definitionsInstall = this.analysisDefinitions(install);
        // 结果索引
        const update = lodash.find(pathUpdate.parameters, 'schema');
        const definitionsUpdate = this.analysisDefinitions(update);
        this.Model.install = lodash.toArray(definitionsInstall.properties);
        this.Model.update = lodash.toArray(definitionsUpdate.properties);
    }
    /**
    * 解析 搜索列字段
    */
    @action.bound
    analysisSearch(tag = this.selectTag) {
        const path = lodash.find(tag.paths, (o) => lodash.includes(o.key, wtmfront.standard.search.name));
        // 参数 索引
        const parameters = lodash.find(path.parameters, 'schema');
        const schema = lodash.find(parameters, '$ref');
        const key = schema.$ref.match(/#\/definitions\/\S+\W(\w+)\W+/)[1];
        const definitions = lodash.cloneDeep(this.definitions[key]);
        this.setAttribute(definitions);
        this.Model.search = lodash.toArray(definitions.properties);
    }
    /**
     *  解析 模型
     * @param parameters 索引
     * @param isColumns 是否表格
     */
    analysisDefinitions(parameters, isColumns = false) {
        // const parameters = lodash.find(path.parameters, 'schema');
        const schema = lodash.find(parameters, '$ref');
        let key = schema.$ref.replace("#/definitions/", "");
        let definitions = this.definitions[key];
        if (isColumns) {
            try {
                // 匹配  AData«List«Corp»» 返回的列表数据结构
                key = definitions.properties.data.$ref.match(/#\/definitions\/\S+\W(\w+)\W+/)[1];
                definitions = this.definitions[key];
            } catch (error) {
                notification['error']({
                    key: "decompose",
                    message: '无法获取列表数据结构  解析失败',
                    description: '',
                });
                console.error(error);
            }
        }
        definitions = lodash.cloneDeep(definitions);
        this.setAttribute(definitions);
        return definitions
    }
    common = "/common/combo"
    /**
     * 设置属性 
     * @param definitions 
     */
    setAttribute(definitions) {
        lodash.forEach(definitions.properties, (value, key) => {
            value.rules = [];
            // 添加验证
            if (!value.allowEmptyValue) {
                value.rules.push({ required: true, message: `Please input your ${value.key}!` });
            }
            if (typeof value.minLength != 'undefined') {
                value.rules.push({ min: value.minLength, message: `min length ${value.minLength}!` });
            }
            if (typeof value.maxLength != 'undefined') {
                value.rules.push({ max: value.maxLength, message: `max length ${value.maxLength}!` });
            }
            let attribute: IAttribute = {
                // 可用
                available: true,
                // 可编辑
                update: true,
                // 绑定模型公共地址
                // commonAddress: this.swaggerDoc.common,
            };
            // console.log(value)
            if (value.example && value.example.combo) {
                attribute.common = {
                    address: this.common,
                    params: {
                        id: value.example.combo
                    }
                }
            }
            value.attribute = attribute;
            value.key = key;
            // console.log(x);
        })
    }
    /**
     * 交换模型位置
     */
    @action.bound
    onExchangeModel(type: "columns" | "search" | "install" | "update" | "btn", dragIndex: number, hoverIndex: number) {
        let dataSource = toJS(this.Model[type]);
        const drag = dataSource[dragIndex];
        // const hover = dataSource[hoverIndex];
        // dataSource = lodash.fill(dataSource, drag, hoverIndex, hoverIndex + 1);
        // dataSource = lodash.fill(dataSource, hover, dragIndex, dragIndex + 1);
        // update

        this.Model[type] = update(dataSource, {
            $splice: [[dragIndex, 1], [hoverIndex, 0, drag]]
        }) as any;
    }
}
export default new ObservableStore();