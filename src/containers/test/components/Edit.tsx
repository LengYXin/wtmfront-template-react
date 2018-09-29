/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2018-09-10 06:35:54
 * @modify date 2018-09-10 06:35:54
 * @desc [description]
*/
import { Form, Button, Popconfirm, Divider } from 'antd';
import DataEntry from 'components/table/dataEntry';
import TableEdit, { renderItemParams } from 'components/table/tableEdit';
import * as React from 'react';
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
/**
 * 组件继承 支持重写,
 */
export default class EditComponent extends TableEdit {
    renderItem({ form, initialValue }: renderItemParams) {
        const { getFieldDecorator } = form;
        return <>
            <FormItem label="使用与否" {...formItemLayout}>
            {getFieldDecorator('useYN',{
                rules: [],
                initialValue: initialValue('useYN','int32'),
            })(
               <DataEntry {...this.props}  format="int32"  example={{"enum":{"0":"否","1":"是"}}}  placeholder='使用与否'  />
            )}
        </FormItem> 
         <FormItem label="公司ID" {...formItemLayout}>
            {getFieldDecorator('id',{
                rules: [{"required":true,"message":"Please input your undefined!"},{"min":0,"message":"min length 0!"},{"max":5,"message":"max length 5!"}],
                initialValue: initialValue('id',''),
            })(
               <DataEntry {...this.props}  placeholder='公司ID'  />
            )}
        </FormItem> 
        </>
    }
      // 重写示例
    // renderButtons() {
    //     return <Button icon="folder-add" onClick={this.Store.onModalShow.bind(this.Store, {})}>添加</Button>
    // }
}