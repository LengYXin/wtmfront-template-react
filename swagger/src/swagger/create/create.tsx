import * as React from 'react';
import Container from './Container'
import { Row, Col } from 'antd';

export default class extends React.Component {
    public render() {
        return (
            <Row gutter={16} type="flex" justify="center">
                <Col span={4}></Col>
                <Col span={16}><Container /></Col>
                <Col span={4}></Col>
            </Row>
        )
    }
}