/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2018-09-10 06:35:43
 * @modify date 2018-09-10 06:35:43
 * @desc [description]
*/
import { Divider, Popconfirm } from 'antd';
import TableBody from 'components/table/tableBody';
import Store from 'core/StoreBasice';
import moment from 'moment';
import React from 'react';
/**
 * 组件继承 支持重写,
 */
export default class BodyComponent extends TableBody {
    // 重写示例
    // renderAction(text, record) {
    //     console.log(record);
    //     return <ActionComponent {...this.props} data={record} />;
    // }
    // 重写示例
    // columnsMap(column) {
    //     column.render = (record) => {
    //        return "哈哈哈"
    //     }
    //     return column
    // }
}
/**
 * 重写 按钮渲染示例
 */
class ActionComponent extends React.Component<{ Store: Store, data: any }, any> {
    Store = this.props.Store;
    async onDelete() {
        let data = await this.Store.onDelete([this.props.data])
        if (data) {
            this.Store.onGet();
        }
    }
    render() {
        return (
            <>
                <a onClick={this.Store.onModalShow.bind(this.Store, this.props.data)} >修改</a>
                <Divider type="vertical" />
                <Popconfirm title="Sure to delete?" onConfirm={this.onDelete.bind(this)} >
                    <a >删除</a>
                </Popconfirm>
            </>
        );
    }
}