import * as React from 'react';
import { Row, Col } from 'antd';
import SourceTags from './sourceTags';
import ReadyTags from './readyTags';
import EditTags from './editTags';
import './style.less';
export default class extends React.Component {
    public render() {
        return (
            <Row gutter={16} type="flex" justify="center" className="swagger-create">
                <Col span={4} className="swagger-create-SourceTags"><SourceTags /></Col>
                <Col span={16} className="swagger-create-EditTags"><EditTags /></Col>
                <Col span={4} className="swagger-create-ReadyTags"><ReadyTags /></Col>
            </Row>
        )
    }
}