import * as React from 'react';
import { List } from 'antd';
import Box from './Box';
import Store from '../../store';
import { observer } from 'mobx-react';
const { swaggerDoc, decompose } = Store;
@observer
export default class IApp extends React.Component<any, any> {
  public render() {
    return (
      <List
        size="large"
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={swaggerDoc.docData.tags}
        renderItem={item => (
          <Box model={item} type="test">
            <List.Item>
              {item.name}
            </List.Item>
          </Box>
        )}
      />
    );
  }
}
