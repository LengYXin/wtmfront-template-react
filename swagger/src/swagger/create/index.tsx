/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2018-10-12 22:23:24
 * @modify date 2018-10-12 22:23:24
 * @desc [description]
*/
import { Alert, Col, Modal, Row, Spin, Icon } from 'antd';
import { observer } from 'mobx-react';
import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Store from '../store';
import EditTags from './editTags';
import ReadyTags from './readyTags';
import SourceTags from './sourceTags';
import './style.less';
const { swaggerDoc, decompose } = Store;
@DragDropContext(HTML5Backend)
@observer
export default class extends React.Component {
    public render() {
        return (
            <Spin spinning={swaggerDoc.swaggerLoading} indicator={<Icon type="loading" style={{ fontSize: 40 }} spin />}>
           
                    <Row gutter={16} type="flex" justify="center" className="swagger-create">
                        <Col span={4} className="swagger-create-SourceTags"><SourceTags /></Col>
                        <Col span={15} className="swagger-create-EditTags"><EditTags /></Col>
                        <Col span={5} className="swagger-create-ReadyTags"><ReadyTags /></Col>
                    </Row>
                    <Modal
                        title="模型JSON"
                        width="70%"
                        centered
                        footer={null}
                        visible={decompose.visible.ModelJSON}
                        onCancel={() => {
                            decompose.onVisible("ModelJSON", false)
                        }}
                    >
                        <pre>
                            <code> {decompose.ModelJSON}</code>
                        </pre>
                    </Modal>
               
            </Spin>
        )
    }
}