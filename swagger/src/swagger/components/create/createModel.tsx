/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2018-09-10 04:47:48
 * @modify date 2018-09-10 04:47:48
 * @desc [description]
*/
import { Button, Select, Tabs, message, Spin, Divider, Table } from 'antd';
import { action } from "mobx";
import { observer } from 'mobx-react';
import * as React from 'react';
import { } from 'react-dnd';
import Store from '../../store';
import BindModel from './components/bindModel';
import ModelList from './components/modelList';
import { Action } from 'rxjs/scheduler/Action';
const TabPane = Tabs.TabPane;
const { swaggerDoc, decompose } = Store;
const Option = Select.Option;
@observer
export default class App extends React.Component<any, any> {
    constructor(props) {
        super(props)
        console.log(swaggerDoc)
        // ModelStore.getModel();
    }
    handleSubmit() {
        // ModelStore.Submit();
        // decompose.onAnalysis()
        if (decompose.Model.columns.length > 0) {
            swaggerDoc.create({ model: decompose.Model })
        } else {
            message.warn("请选择模型");
        }
    }
    prev() {
        swaggerDoc.updateStepsCurrent(-1);
    }
    render() {
        return <Spin spinning={swaggerDoc.swaggerLoading}>
            <ModelSelect />
            <ModelBody />
            <BindModel />
            <div style={{ textAlign: "right" }}>
                <Button onClick={this.prev.bind(this)}>
                    上一步
              </Button>
                <Divider type="vertical" />
                <Button onClick={this.handleSubmit.bind(this)}>
                    提交
              </Button>
            </div>
        </Spin>
    }
}
/**
 * model选择
 */
@observer
class ModelSelect extends React.Component<any, any> {
    /**
     * 切换 mode
     * @param
     */
    @action.bound
    handleChange(index) {
        decompose.onAnalysis(index);
    }
    render() {
        return (
            <Select
                placeholder='选择模型'
                style={{ width: '100%' }}
                onChange={this.handleChange.bind(this)}>
                {swaggerDoc.docData.tags.map((x, i) => {
                    return <Option key={i} value={i}>{x.name}</Option>
                })}
            </Select>
        );
    }
}
@observer
class ModelBody extends React.Component<any, any> {
    render() {
        return (
            <Tabs defaultActiveKey="1" >
                <TabPane tab="Table" key="1">
                    <ModelList type="columns" />
                </TabPane>
                <TabPane tab="Search" key="2">
                    <ModelList type="search" />
                </TabPane>
                <TabPane tab="Add" key="3">
                    <ModelList type="install" />
                </TabPane>
                <TabPane tab="button" key="4">
                    <ModelList type="btn" />
                </TabPane>
            </Tabs>
        );
    }
}


