/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2018-10-12 22:23:17
 * @modify date 2018-10-12 22:23:17
 * @desc [description]
*/
import * as React from 'react';
import { List, Button, Row, Col, Icon, Popconfirm, Divider } from 'antd';
// import Box from './Box';
import Drag from '../../../components/drop/drag';
import Store from '../../store';
import { observer } from 'mobx-react';
import ShowCode from '../showCode';
const { swaggerDoc, decompose } = Store;
@observer
export default class IApp extends React.Component<any, any> {
  public render() {
    const length = decompose.readyModel.length;
    return (
      <List
        size="large"
        header={<div style={{ textAlign: "center" }}>
          <div>
            <span>就绪列表 （{length}）</span> <Divider type="vertical" />
            <Popconfirm title="确定清空已经编辑数据？" onConfirm={() => { decompose.onEmpty() }} okText="确定" cancelText="取消">
              {/* <Button disabled={decompose.readyModel.length <= 0}  icon="delete"></Button> */}
              <Icon type="delete" theme="outlined" style={{ cursor: "pointer" }} title="清空" />
            </Popconfirm>
          </div>
          <Button disabled={length <= 0} block onClick={() => {
            swaggerDoc.create(decompose.readyModel)
          }} icon="save">生成组件</Button>
        </ div>}
        // footer={<div>

        // </div>}
        bordered
        dataSource={decompose.readyModel.slice()}
        renderItem={(item: ISwaggerModel, index) => (
          <Drag model={item} type="readyTags">
            <List.Item actions={[
              <Icon type="close" theme="outlined" style={{ cursor: "pointer" }} title="删除" onClick={e => { decompose.onDelete(index) }} />,
              <ShowCode data={item} />
            ]}>
              <div style={{ width: "100%" }}>
                <Row>
                  <Col span={6}>
                    模型：
                  </Col>
                  <Col span={18}>
                    {item.name}
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    模块：
                </Col>
                  <Col span={18}>
                    {item.componentName}
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    模板：
                </Col>
                  <Col span={18}>
                    {item.template}
                  </Col>
                </Row>
              </div>
            </List.Item>
          </Drag>
        )}
      />
    );
  }
}
