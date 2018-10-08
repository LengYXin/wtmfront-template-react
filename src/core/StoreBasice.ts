/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2018-09-12 18:52:27
 * @modify date 2018-09-12 18:52:27
 * @desc [description]
 */
import { message } from 'antd';
import { action, computed, observable, runInAction} from 'mobx';
import NProgress from 'nprogress';
import wtmfront from 'wtmfront.json';
import Common from './Common';
import { HttpBasics } from './HttpBasics';
import SwaggerModel from "./SwaggerModel";
export default class Store extends SwaggerModel {
   constructor(public StoreConfig) {
    super();
    //获取对应模块的columns
    this.getColumns()
  }
  /** 公共数据类 */
  Common = Common
  /** Ajax   */
  Http = new HttpBasics(APIADDRESS + this.StoreConfig.address)
  /** 数据 ID 索引 */
  IdKey = 'id'
  /** 日期格式 */
  dateFormat = 'YYYY-MM-DD'
  /** 日期时间格式 */
  dateTimeFormat = 'YYYY-MM-DD HH:mm:ss'
  /** 按钮功能 */
  pageButtons: IPageButton = {
    install: true,
    update: true,
    delete: true,
    import: true,
    export: true,
    columns:true
  }
  /** 搜索数据 */
  searchParams: any = {
    // pageNo: 1,
    // pageSize: 1
  }
  /** table 数据源 */
  @observable dataSource = {
    count: 0,
    list: [],
    pageNo: 1,
    pageSize: 10
  }
  /** table 已选择 keys */
  @observable selectedRowKeys = []
  /**  详情 */
  @observable details: any = {}
  /** 页面动作 */
  @observable pageState = {
    visibleEdit: false,//编辑显示 抽屉的显示隐藏
    visiblePort: false,//导入显示
    loading: false,//数据加载
    loadingEdit: false,//数据提交
    isUpdate: false,//编辑状态  判断是增加还是修改
    isColumns:false//自定义columns状态
  }
  /** 勾选的columns */
  @observable columnsSelect={
      columns:[],
      entity:""
    }

  @action.bound
   async getColumns(){
    let result:any[] = await new HttpBasics().create(wtmfront["publicColumns"]["get"]).toPromise()
    let model=this.StoreConfig.address.match(/\/(\w+)\//)[1]
     result=result.filter((item)=>item.entity===model)
     if(result.length===0){
       result=[
         {
           columns:[],
           entity:model
         }
       ]
     }
     runInAction(() => {
      this.columnsSelect = result[0] 
    this.onPageState("loading", false)

    })
    return result[0]
    }


  /**
   *  修改页面动作状态 抽屉的显示隐藏
   * @param key 
   * @param value 
   */
  @action.bound
  onPageState(
    key: "visibleEdit" | "visiblePort" | "loading" | "loadingEdit" | "isUpdate"|"isColumns",
    value?: boolean) {
    const prevVal = this.pageState[key];
    if (prevVal == value) {
      return
    }
    if (typeof value == "undefined") {
      value = !prevVal;
    }
    this.pageState[key] = value;
  }
  /**
   * table 选择 行 
   * @param selectedRowKeys 选中的keys
   */
  @action.bound
  onSelectChange(selectedRowKeys) {
    this.selectedRowKeys = selectedRowKeys
    console.log(this.selectedRowKeys);
  }
  /**
   * 编辑
   * 需要重写的方法 使用 runInAction 实现 修改Store
   * 使用 @action.bound 装饰器的方法不可重写
   * @param details 详情 有唯一 key 判定为修改
   */
  async onModalShow(details = {}) {
  //  if (details[this.IdKey] == null) {
    if(JSON.stringify(details)==="{}"){
      //增加
      this.onPageState("isUpdate", false)
      this.onPageState("isColumns", false)
    }else if(details["columns"]==="columns"){
      //自定义列表
      this.onPageState("isColumns", true)
      this.onPageState("isUpdate", false)
      let columns = await this.onGetColumns()//勾选的列
     runInAction(() => {
      this.columnsSelect=columns
    })
    }
     else {
       //修改
      this.onPageState("isUpdate", true)
      this.onPageState("isColumns", false)
      details = await this.onGetDetails(details)
    }
    runInAction(() => {
      this.details = details
    })
    this.onPageState("visibleEdit", true)
  }

/**
   * 加载columns列表项
   */
  async onGetColumns() {
    this.onPageState("loadingEdit", true)
    let result=this.getColumns()
    this.onPageState("loadingEdit", false)
    return result
  }
/**设置columns列表项
 * columns:勾选的字段数组
 */
  @action.bound
  async setColumns(columns){
    let model=this.StoreConfig.address.match(/\/(\w+)\//)[1]
    let columnsObj={
      columns,
      entity:model
    }
  //this.columnsSelect[0].columns=columns;
    this.onPageState("loadingEdit", true)
     this.onPageState("loading", true)
    const result = await new HttpBasics().create(wtmfront["publicColumns"]["set"],columnsObj).toPromise()
   // console.log(this.columnsSelect)
    if(result===1){
      //重新获取一次
      this.getColumns()
      this.onPageState("isColumns", false)
      this.onPageState("visibleEdit", false)
    }
    this.onPageState("loadingEdit", false)
  }


  /**
   * 加载数据 列表
   * @param params 搜索参数
   */
  async onGet(params?) {
    if (this.pageState.loading == true) {
      return message.warn('数据正在加载中')
    }
    this.onPageState("loading", true)
    this.searchParams = { ...this.searchParams, ...params }
    // 页码 参数特殊处理,不需要从 search 字段中传递
    let pageNo = this.dataSource.pageNo,
      pageSize = this.dataSource.pageSize
    if (this.searchParams.pageNo) {
      pageNo = this.searchParams.pageNo
      delete this.searchParams.pageNo
    }
    if (this.searchParams.pageSize) {
      pageSize = this.searchParams.pageSize
      delete this.searchParams.pageSize
    }
    const result = await this.Http.create(wtmfront.standard.search, {
      pageNo: pageNo,
      pageSize: pageSize,
      search: this.searchParams
    }).map(result => {
      if (result.list) {
        result.list = result.list.map((x, i) => {
          return { key: i, ...x }
        })
      }
      return result
    }).toPromise()
    runInAction(() => {
      this.dataSource = result || this.dataSource
      this.onPageState("loading", false)
    })
    return result
  }
  /**
   * 详情
   * @param params 数据实体
   */
  async onGetDetails(params) {
    console.log(params)
    this.onPageState("loadingEdit", true)
    const result = await this.Http.create(wtmfront.standard.details, params).toPromise()
    this.onPageState("loadingEdit", false)
    return result || {}
  }
  /**
   * 编辑数据
   * @param params 数据实体
   */
  async onEdit(params) {
    if (this.pageState.loadingEdit) {
      return
    }
    const details = { ...this.details, ...params }
    this.onPageState("loadingEdit", true)
    // 添加 | 修改
    if (this.pageState.isUpdate) {
      return await this.onUpdate(details)
    }
    return await this.onInstall(details)
  }
  /**
   * 添加数据
   * @param params 数据实体
   */
  async onInstall(params) {
    const result = await this.Http.create(wtmfront.standard.install, params).toPromise()
    if (result) {
      message.success('添加成功')
      // 刷新数据
      this.onGet()
      this.onPageState("visibleEdit", false)
    } else {
      message.error('添加失败')
    }
    this.onPageState("loadingEdit", false)
    return result
  }
  /**
   * 更新数据
   * @param params 数据实体
   */
  async onUpdate(params) {
    const result = await this.Http.create(wtmfront.standard.update, params).toPromise()
    if (result) {
      message.success('更新成功')
      // 刷新数据
      this.onGet()
      this.onPageState("visibleEdit", false)
    } else {
      message.error('更新失败')
    }
    this.onPageState("loadingEdit", false)
    return result
  }
  /**
   * 删除数据
   * @param params 需要删除的数据集合 取 所有的 id
   */
  async onDelete(params: any[]) {
    params = params.map(x => x[this.IdKey])
    const result = await this.Http.create(wtmfront.standard.delete, params).toPromise()
    if (result) {
      message.success('删除成功')
      this.onSelectChange([]);
      // 刷新数据
      this.onGet();
    } else {
      message.success('删除失败')
    }
    return result
  }
  /**
   * 导入 配置 参数
   * https://ant.design/components/upload-cn/#components-upload-demo-picture-style
   */
  @computed get importConfig() {
    const action = this.Http.address + wtmfront.standard.import.name
    return {
      name: 'file',
      multiple: true,
      action: action,
      onChange: info => {
        const status = info.file.status
        // NProgress.start();
        if (status !== 'uploading') {
          console.log(info.file, info.fileList)
        }
        if (status === 'done') {
          const response = info.file.response
          // NProgress.done();
          if (response.status == 200) {
            // 刷新数据
            this.onGet();
            message.success(`${info.file.name} file uploaded successfully.`)
          } else {
            message.error(`${info.file.name} ${response.message}`)
          }
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`)
        }
      }
    }
  }
  /**
   * 导出
   * @param params 筛选参数
   */
  async onExport(params = this.searchParams) {
    await this.Http.download({
      url: APIADDRESS + this.StoreConfig.address + wtmfront.standard.export.name,
      body: params
    })
  }
  /**
  * 模板
  */
  async onTemplate() {
    //   url: APIADDRESS + this.StoreConfig.address + wtmfront.standard.template.name,
    await this.Http.download({
      url: APIADDRESS + this.StoreConfig.address + wtmfront.standard.template.name,
    })
  }
  /**
   * 获取公共属性
   */
  async getCombo(parmas: ICommon) {
    return await Common.getCombo(parmas)
  }
}
