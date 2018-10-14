/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2018-10-12 22:23:07
 * @modify date 2018-10-12 22:23:07
 * @desc [description]
*/
import { Alert, Button, Divider, Tabs } from 'antd';
import { observer } from 'mobx-react';
import * as React from 'react';
import Drop from '../../../components/drop/drop';
import Store from '../../store';
import Info from './info';
import ModelList from './modelList';
const { swaggerDoc, decompose } = Store;
const TabPane = Tabs.TabPane;
@observer
export default class IApp extends React.Component<any, any> {
  private handleDrop(item) {
    // 首次编辑
    if (item.type == "sourceTags") {
      decompose.onAnalysisTag(item.model);
    } else {
      // 以编辑修改
      decompose.onSetModel(item.model);
    }
  }
  public render() {
    return (
      <div>
        <Drop
          accepts={["sourceTags", "readyTags"]}
          onDrop={item => this.handleDrop(item)}
        >
          <ModelBody key={decompose.Model.name + decompose.Model.key} />
        </Drop>
      </div>
    );
  }
}
@observer
class ModelBody extends React.Component<any, any> {
  state = {
    activeKey: "1"
  }
  infoForm = null;
  onSave() {
    this.infoForm.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        values.menuName = values.menuName || values.componentName;
        decompose.onSaveInfo(values);
        decompose.onSave()
      } else {
        this.setState({ activeKey: "1" })
      }
    });

  }
  onInfoSubmit() {

  }
  render() {
    if (!decompose.Model.address) {
      return <Alert
        message=""
        description="拖拽左侧的数据模型到中间的编辑区域"
        type="info"
      />
    }
    return (
      <>
        <div><span style={{ color: "#cf1322", fontWeight: 600 }}>{decompose.Model.name}  </span><Divider type="vertical" />  <Button icon="save" onClick={this.onSave.bind(this)}>保存</Button></div>
        <Tabs
          // defaultActiveKey="1"
          activeKey={this.state.activeKey}
          onChange={activeKey => this.setState({ activeKey })}
        >
          <TabPane tab="基础配置" key="1">
            <Info onSubmit={this.onInfoSubmit.bind(this)} onForm={e => this.infoForm = e} />
          </TabPane>
          <TabPane tab="模型配置" key="2" >
            <Tabs defaultActiveKey="1" >
              <TabPane tab="数据" key="1">
                <ModelList type="columns" />
              </TabPane>
              <TabPane tab="搜索条件" key="2">
                <ModelList type="search" />
              </TabPane>
              <TabPane tab="添加&修改" key="3">
                <ModelList type="install" />
              </TabPane>
              <TabPane tab="操作权限" key="4">
                <ModelList type="btn" />
              </TabPane>
            </Tabs>
          </TabPane>
        </Tabs>
      </>

    );
  }
}

