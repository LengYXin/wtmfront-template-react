/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2018-09-10 05:01:20
 * @modify date 2018-09-10 05:01:20
 * @desc [description]
*/
import { Tabs } from 'antd';
import * as React from 'react';
import Info from './components/info';
import List from './components/list';
// import Create from './components/create';
import Create from './create/index';
import Store from './store';
import "./style.less";
const TabPane = Tabs.TabPane;
// @DragDropContext(HTML5Backend)
export default class IApp extends React.Component<any, any> {
    componentDidMount() {
        Store.swaggerDoc.init();
        Store.swaggerDoc.getModel();
    }
    onChange(key) {
        if (key == 3) {
            Store.swaggerDoc.getContainers();
        }
    }
    public render() {
        return (
            <div className="sam-container-manage">
                <Tabs defaultActiveKey="2" onChange={this.onChange.bind(this)} >
                    <TabPane tab="基础信息" key="1">
                        <Info />
                    </TabPane>
                    <TabPane tab="创建组件" key="2">
                        <Create />
                    </TabPane>
                    <TabPane tab="组件列表" key="3">
                        <List />
                    </TabPane>
                </Tabs>
            </div>

        );
    }
}
