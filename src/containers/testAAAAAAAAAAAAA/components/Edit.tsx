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
            <FormItem label="用户ID" {...formItemLayout}>
            {getFieldDecorator('id',{
                rules: [{"required":true,"message":"Please input your undefined!"},{"min":0,"message":"min length 0!"},{"max":10,"message":"max length 10!"}],
                initialValue: initialValue('id',''),
            })(
               <DataEntry {...this.props}  placeholder='用户ID'  />
            )}
        </FormItem> 
         <FormItem label="公司ID" {...formItemLayout}>
            {getFieldDecorator('corpID',{
                rules: [{"min":0,"message":"min length 0!"},{"max":5,"message":"max length 5!"}],
                initialValue: initialValue('corpID',''),
            })(
               <DataEntry {...this.props}  common={{"address":"/common/combo","params":{"id":1}}}  example={{"combo":1,"multi":true}}  placeholder='公司ID'  />
            )}
        </FormItem> 
         <FormItem label="用户名" {...formItemLayout}>
            {getFieldDecorator('userName',{
                rules: [{"min":0,"message":"min length 0!"},{"max":50,"message":"max length 50!"}],
                initialValue: initialValue('userName',''),
            })(
               <DataEntry {...this.props}  placeholder='用户名'  />
            )}
        </FormItem> 
         <FormItem label="手机号" {...formItemLayout}>
            {getFieldDecorator('mobileNo',{
                rules: [{"min":0,"message":"min length 0!"},{"max":20,"message":"max length 20!"}],
                initialValue: initialValue('mobileNo',''),
            })(
               <DataEntry {...this.props}  placeholder='手机号'  />
            )}
        </FormItem> 
         <FormItem label="座机号" {...formItemLayout}>
            {getFieldDecorator('telNo',{
                rules: [{"min":0,"message":"min length 0!"},{"max":20,"message":"max length 20!"}],
                initialValue: initialValue('telNo',''),
            })(
               <DataEntry {...this.props}  placeholder='座机号'  />
            )}
        </FormItem> 
         <FormItem label="邮箱" {...formItemLayout}>
            {getFieldDecorator('email',{
                rules: [{"min":0,"message":"min length 0!"},{"max":50,"message":"max length 50!"}],
                initialValue: initialValue('email',''),
            })(
               <DataEntry {...this.props}  placeholder='邮箱'  />
            )}
        </FormItem> 
         <FormItem label="使用与否" {...formItemLayout}>
            {getFieldDecorator('useYN',{
                rules: [],
                initialValue: initialValue('useYN','int32'),
            })(
               <DataEntry {...this.props}  format="int32"  placeholder='使用与否'  />
            )}
        </FormItem> 
         <FormItem label="职位ID" {...formItemLayout}>
            {getFieldDecorator('posID',{
                rules: [{"min":0,"message":"min length 0!"},{"max":10,"message":"max length 10!"}],
                initialValue: initialValue('posID',''),
            })(
               <DataEntry {...this.props}  placeholder='职位ID'  />
            )}
        </FormItem> 
         <FormItem label="职责ID" {...formItemLayout}>
            {getFieldDecorator('dutyID',{
                rules: [{"min":0,"message":"min length 0!"},{"max":10,"message":"max length 10!"}],
                initialValue: initialValue('dutyID',''),
            })(
               <DataEntry {...this.props}  placeholder='职责ID'  />
            )}
        </FormItem> 
         <FormItem label="密码" {...formItemLayout}>
            {getFieldDecorator('password',{
                rules: [{"min":0,"message":"min length 0!"},{"max":100,"message":"max length 100!"}],
                initialValue: initialValue('password',''),
            })(
               <DataEntry {...this.props}  placeholder='密码'  />
            )}
        </FormItem> 
         <FormItem label="部门组织ID" {...formItemLayout}>
            {getFieldDecorator('deptGroup',{
                rules: [{"min":0,"message":"min length 0!"},{"max":10,"message":"max length 10!"}],
                initialValue: initialValue('deptGroup',''),
            })(
               <DataEntry {...this.props}  placeholder='部门组织ID'  />
            )}
        </FormItem> 
         <FormItem label="创建用户ID" {...formItemLayout}>
            {getFieldDecorator('createUser',{
                rules: [{"min":0,"message":"min length 0!"},{"max":10,"message":"max length 10!"}],
                initialValue: initialValue('createUser',''),
            })(
               <DataEntry {...this.props}  placeholder='创建用户ID'  />
            )}
        </FormItem> 
         <FormItem label="创建日期" {...formItemLayout}>
            {getFieldDecorator('createDate',{
                rules: [],
                initialValue: initialValue('createDate','date-time'),
            })(
               <DataEntry {...this.props}  format="date-time"  placeholder='创建日期'  />
            )}
        </FormItem> 
         <FormItem label="修改用户ID" {...formItemLayout}>
            {getFieldDecorator('updateUser',{
                rules: [{"min":0,"message":"min length 0!"},{"max":10,"message":"max length 10!"}],
                initialValue: initialValue('updateUser',''),
            })(
               <DataEntry {...this.props}  placeholder='修改用户ID'  />
            )}
        </FormItem> 
         <FormItem label="修改日期" {...formItemLayout}>
            {getFieldDecorator('updateDate',{
                rules: [],
                initialValue: initialValue('updateDate','date-time'),
            })(
               <DataEntry {...this.props}  format="date-time"  placeholder='修改日期'  />
            )}
        </FormItem> 
        </>
    }
      // 重写示例
    // renderButtons() {
    //     return <Button icon="folder-add" onClick={this.Store.onModalShow.bind(this.Store, {})}>添加</Button>
    // }
}