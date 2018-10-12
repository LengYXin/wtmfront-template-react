/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2018-10-12 22:23:21
 * @modify date 2018-10-12 22:23:21
 * @desc [description]
*/
import { Icon, List, Tabs, Button } from 'antd';
import { observer } from 'mobx-react';
import * as React from 'react';
// import Box from './Box';
import Drag from '../../../components/drop/drag';
import Store from '../../store';
import ShowCode from '../showCode';
const TabPane = Tabs.TabPane;
const { swaggerDoc, decompose } = Store;
@observer
export default class IApp extends React.Component<any, any> {
  public render() {
    return (
      <Tabs
        defaultActiveKey="1"
      >
        <TabPane tab={`模型(${swaggerDoc.docData.tags.length})`} key="1">
          <DocDataTags />
        </TabPane>
        <TabPane tab={`错误(${swaggerDoc.docData.error.length})`} key="2" >
          <ErrorTags />
        </TabPane>
      </Tabs>

    );
  }
}
@observer
class DocDataTags extends React.Component<any, any> {
  public render() {
    return (
      <List
        size="large"
        // header={<div style={{ textAlign: "center" }}>模型列表</div>}
        footer={<div>
          <Button icon="code" block onClick={e => {
            decompose.onShowModelJSON(swaggerDoc.SwaggerDocJson)
          }}>SwaggerDoc</Button>
        </div>}
        bordered
        dataSource={swaggerDoc.docData.tags}
        renderItem={item => (
          <Drag model={item} type="sourceTags">
            <List.Item actions={
              [<ShowCode data={item} />]
            }>
              {item.name}
            </List.Item>
          </Drag>
        )}
      />
    );
  }
}
@observer
class ErrorTags extends React.Component<any, any> {
  public render() {
    return (
      <List
        size="large"
        header={<div style={{ textAlign: "center" }}>无法匹配规则接口</div>}
        bordered
        dataSource={swaggerDoc.docData.error}
        renderItem={item => (
          <List.Item actions={
            [<ShowCode data={item} />]
          }>
            {item.key}
          </List.Item>
        )}
      />
    );
  }
}
