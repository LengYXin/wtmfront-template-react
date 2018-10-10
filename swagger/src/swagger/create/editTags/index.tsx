import * as React from 'react';
import Dustbin from './Dustbin';
import update from 'immutability-helper';
import { Button } from 'antd';
import Store from '../../store';
import { observer } from 'mobx-react';
const { swaggerDoc, decompose } = Store;
export default class IApp extends React.Component<any, any> {
  state = {
    model: {}
  }
  private handleDrop(item) {
    decompose.onTest(item);
  }
  public render() {
    return (
      <div>
        <Button block>确定</Button>
        <Dustbin
          model={this.state.model}
          accepts={["test"]}
          onDrop={item => this.handleDrop(item)}
        />
      </div>
    );
  }
}
