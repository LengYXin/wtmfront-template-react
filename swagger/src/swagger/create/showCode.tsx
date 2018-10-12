/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2018-10-12 22:23:24
 * @modify date 2018-10-12 22:23:24
 * @desc [description]
*/
import { Icon } from 'antd';
import { observer } from 'mobx-react';
import * as React from 'react';
import Store from '../store';
const { swaggerDoc, decompose } = Store;
@observer
export default class extends React.Component<{ data: any }, any> {
    onShow(e) {
        e.preventDefault();
        decompose.onShowModelJSON(this.props.data)
    }
    public render() {
        return (
            <Icon type="code" theme="outlined" style={{ cursor: "pointer" }} title="数据" onClick={this.onShow.bind(this)} />
        )
    }
}