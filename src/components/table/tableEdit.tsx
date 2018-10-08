/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2018-09-12 18:53:26
 * @modify date 2018-09-12 18:53:26
 * @desc [description]
*/
import { Alert, Button, Divider, Drawer, Form, Icon, Modal, Popconfirm, Row, Select, Spin, Tabs, Upload, List, Checkbox } from 'antd';
import { FormComponentProps, WrappedFormUtils } from 'antd/lib/form/Form';
import Store from 'core/StoreBasice';
import lodash from 'lodash';
import { observer } from 'mobx-react';
import moment from 'moment';
import * as React from 'react';
import DataEntry from './dataEntry';
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const Dragger = Upload.Dragger;
@observer
export default class TableEditComponent extends React.Component<{ Store: Store }, any> {
  Store = this.props.Store;
  /**
   * 表单 item
   * @param param0 
   */
  renderItem({ form, initialValue }: renderItemParams) {

  }
  /**
   * 渲染按钮组
   */
  renderButtons(): JSX.Element | JSX.Element[] {
    const button = [];
    const { pageButtons, selectedRowKeys } = this.Store;
    const deletelength = selectedRowKeys.length;
    if (pageButtons.install) {
      button.push(<Button icon="folder-add" onClick={this.Store.onModalShow.bind(this.Store, {})}>添加</Button>)
    }
    if (pageButtons.import) {
      button.push(<Button icon="cloud-download" onClick={() => { this.Store.onPageState("visiblePort", true) }}>  导入 / 导出 </Button>)
    }
    if (pageButtons.delete) {
      button.push(
        <Popconfirm placement="right" title={`Sure to delete ? length : (${deletelength}) `} onConfirm={this.onDelete.bind(this)} okText="Yes" cancelText="No">
          <Button icon="delete" disabled={deletelength < 1}>
            批量删除
           </Button>
        </Popconfirm>
      )
    }
    return button.map((x, i) => {
      return <React.Fragment key={i}>
        {x}
        <Divider type="vertical" />
      </React.Fragment>
    })
  }
  /**
   * 多选删除事件
   */
  private async onDelete() {
    const params = this.Store.dataSource.list.filter(x => this.Store.selectedRowKeys.some(y => y == x.key));
    await this.Store.onDelete(params)
  }
  render() {
    return (
      <Row>
        {this.renderButtons()}
        <EditComponent {...this.props} renderItem={this.renderItem.bind(this)} />
        <PortComponent {...this.props} />
      </Row>
    );
  }
}
/**
 * 编辑
 */
@observer
class EditComponent extends React.Component<{ Store: Store, renderItem: (params: renderItemParams) => React.ReactElement<any> }, any> {
  Store = this.props.Store;
  WrappedFormComponent = Form.create()(FormComponent);
  render() {
    return (
      <Drawer
        title={this.Store.pageState.isUpdate ? '修改' : '添加'}
        width={500}
        placement="right"
        closable={false}
        onClose={() => this.Store.onPageState("visibleEdit", false)}
        visible={this.Store.pageState.visibleEdit}
        className="app-table-edit-drawer"
        destroyOnClose={true}
      >
        <this.WrappedFormComponent {...this.props} renderItem={this.props.renderItem} />
        <HideInstall Store={this.Store} />
      </Drawer>
    );
  }
}
@observer
class HideInstall extends React.Component<{ Store: Store }, any> {
  Store = this.props.Store;
  state = {
    visible: false
  }
  onVisible() {
    this.setState(state => {
      return { visible: !state.visible }
    });
  }
  onChange(checkedValues) {
    this.Store.appendInstall = checkedValues
  }
  render() {
    return (
      <>
        <div className="app-hide-install" title="展示隐藏属性" onClick={this.onVisible.bind(this)}>
          <Icon type="edit" theme="outlined" />
        </div>
        <Drawer
          title="隐藏属性"
          width={320}
          onClose={this.onVisible.bind(this)}
          closable={false}
          visible={this.state.visible}
          className="app-hide-install-drawer"
        >
          <Checkbox.Group defaultValue={this.Store.appendInstall.map(x => x.key)} onChange={this.onChange.bind(this)}>
            <List
              bordered
              dataSource={this.Store.hideInstall}
              renderItem={item => (<List.Item>
                <Checkbox value={item.key} >{item.description}</Checkbox>
              </List.Item>)}
            />
          </Checkbox.Group>
        </Drawer>
      </>

    );
  }
}
/**
 * 表单
 */
@observer
class FormComponent extends React.Component<Props, any> {
  Store = this.props.Store;
  /**
    * 提交数据
    */
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values = mapValues(values, this.Store.dateFormat)
        this.Store.onEdit(values);
      }
    });
  }
  /**
   * 获取 数据类型默认值
   * @param key 属性名称
   * @param type 属性值类型
   */
  initialValue(key, type) {
    const value = this.Store.details[key];
    switch (type) {
      case 'int32':
        return value == null ? 0 : value;
        break;
      case 'date-time':
        return this.moment(value);
        break;
      default://默认字符串
        return value || ''
        break;
    }
  }

  /**
   * 时间转化
   * @param date 
   */
  moment(date) {
    if (date == '' || date == null || date == undefined) {
      date = moment(new Date(), this.Store.dateFormat);
    }
    if (typeof date == 'string') {
      date = moment(date, this.Store.dateFormat)
    } else {
      date = moment(date)
    }
    return date
  }
  /**
   * 表单 项
   */
  renderItem() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    let renderItem = this.props.renderItem({ form: this.props.form, initialValue: this.initialValue.bind(this) }) as any;
    // 没有传递 表单项 由框架解析
    if (typeof renderItem == "undefined") {
      renderItem = this.Store.install.map(x => <FormItem label={x.description} {...formItemLayout} key={x.key}>
        {getFieldDecorator(x.key, {
          rules: x.rules,
          initialValue: this.initialValue(x.key, x.format),
        })(
          <DataEntry {...this.props} {...x} common={x.attribute.common} />
        )}
      </FormItem>);
    }
    const appendInstall = this.Store.appendInstall.map(x => <FormItem label={x.description} {...formItemLayout} key={x.key}>
      {getFieldDecorator(x.key, {
        rules: x.rules,
        initialValue: this.initialValue(x.key, x.format),
      })(
        <DataEntry {...this.props} {...x} common={x.attribute.common} />
      )}
    </FormItem>);
    return <>
      {renderItem}
      {appendInstall}
    </>
  }
  componentWillUnmount() {
    this.Store.onPageState("loadingEdit", false)
  }
  render() {
    return (

      <Form onSubmit={this.handleSubmit} className="app-table-edit-form">
        <Spin spinning={this.Store.pageState.loadingEdit}>
          {this.renderItem()}
        </Spin>
        <div className="app-drawer-btns" >
          <Button onClick={() => this.Store.onPageState("visibleEdit", false)} >取消 </Button>
          <Divider type="vertical" />
          <Button loading={this.Store.pageState.loadingEdit} type="primary" htmlType="submit"  >提交 </Button>
        </div>
      </Form>
    );
  }
}
/**
 * 导入导出
 */
@observer
class PortComponent extends React.Component<{ Store: Store }, any> {
  Store = this.props.Store;

  render() {
    return (
      <Modal
        title="Import&Export"
        centered
        visible={this.Store.pageState.visiblePort}
        // destroyOnClose={true}
        closable={false}
        onOk={() => { this.Store.onPageState("visiblePort", false) }}
        onCancel={() => { this.Store.onPageState("visiblePort", false) }}
        className="app-table-port-modal"
      >
        <Tabs defaultActiveKey="Import">
          <TabPane tab={<span><Icon type="cloud-upload" />Import</span>} key="Import">
            <div className="app-table-port-tab-pane">
              <Button icon="download" block size="large" onClick={() => { this.Store.onTemplate() }}>模板</Button>
              <Divider />
              <Dragger {...this.Store.importConfig}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">单击或拖动文件到该区域上载</p>
              </Dragger>
            </div>
          </TabPane>

          <TabPane tab={<span><Icon type="cloud-download" />Export</span>} key="Export">
            <div className="app-table-port-tab-pane">
              <Alert message="导出当前筛选条件下的数据" type="info" showIcon />
              <Divider />
              <Button icon="download" block size="large" onClick={() => { this.Store.onExport() }}>download</Button>
            </div>
          </TabPane>
        </Tabs>
      </Modal>
    );
  }
}

export interface renderItemParams {
  form: WrappedFormUtils,
  initialValue?: (key: string, type: string) => any;
}
export interface Props extends FormComponentProps {
  Store: Store,
  renderItem: (params: renderItemParams) => React.ReactElement<any>
}
/**
 * 处理数据类型
 * @param values 
 */
export function mapValues(values, dateFormat) {
  return lodash.mapValues(
    // 去除空值
    lodash.pickBy(values, data => !lodash.isNil(data)),
    data => {
      // if (data instanceof moment) {
      //   console.log(data);
      //   data = moment(data.format(dateFormat))
      // }
      if (Array.isArray(data) && data.some(x => x instanceof moment)) {
        // data = data.map(x => moment(x.format(dateFormat)).valueOf()).join(',')
        data = data.map(x => x.valueOf()).join(',')
      }
      return data.valueOf()
    }
  );
}