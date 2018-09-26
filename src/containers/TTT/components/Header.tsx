/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2018-09-10 06:36:03
 * @modify date 2018-09-10 06:36:03
 * @desc [description]
*/
import { Col, Form } from 'antd';
import DataEntry from 'components/table/dataEntry';
import TableHeader from 'components/table/tableHeader';
import * as React from 'react';
const FormItem = Form.Item;
const colLayout = {
    xl: 6,
    lg: 8,
    md: 12
}
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
export default class HeaderComponent extends TableHeader {
    renderItem({ form,initialValue }) {
        const { getFieldDecorator } = form;
        return <>
                <Col {...colLayout} >
                <FormItem label="用户ID" {...formItemLayout}>
                {getFieldDecorator('id',{
                    initialValue: initialValue('id',''),
                })(
                    <DataEntry {...this.props}  placeholder='用户ID'  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="公司ID" {...formItemLayout}>
                {getFieldDecorator('corpID',{
                    initialValue: initialValue('corpID',''),
                })(
                    <DataEntry {...this.props}  common={{"address":"/common/combo","params":{"id":1}}}  example={{"combo":1,"multi":true}}  placeholder='公司ID'  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="用户名" {...formItemLayout}>
                {getFieldDecorator('userName',{
                    initialValue: initialValue('userName',''),
                })(
                    <DataEntry {...this.props}  placeholder='用户名'  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="手机号" {...formItemLayout}>
                {getFieldDecorator('mobileNo',{
                    initialValue: initialValue('mobileNo',''),
                })(
                    <DataEntry {...this.props}  placeholder='手机号'  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="座机号" {...formItemLayout}>
                {getFieldDecorator('telNo',{
                    initialValue: initialValue('telNo',''),
                })(
                    <DataEntry {...this.props}  placeholder='座机号'  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="邮箱" {...formItemLayout}>
                {getFieldDecorator('email',{
                    initialValue: initialValue('email',''),
                })(
                    <DataEntry {...this.props}  placeholder='邮箱'  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="使用与否" {...formItemLayout}>
                {getFieldDecorator('useYN',{
                    initialValue: initialValue('useYN','int32'),
                })(
                    <DataEntry {...this.props}  format="int32"  placeholder='使用与否'  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="创建日期" {...formItemLayout}>
                {getFieldDecorator('createDateStr',{
                    initialValue: initialValue('createDateStr',''),
                })(
                    <DataEntry {...this.props}  example={{"datetime":true}}  placeholder='创建日期'  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="职位ID" {...formItemLayout}>
                {getFieldDecorator('posID',{
                    initialValue: initialValue('posID',''),
                })(
                    <DataEntry {...this.props}  placeholder='职位ID'  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="修改日期" {...formItemLayout}>
                {getFieldDecorator('updateDateStr',{
                    initialValue: initialValue('updateDateStr',''),
                })(
                    <DataEntry {...this.props}  example={{"date":true}}  placeholder='修改日期'  />
                )}
                </FormItem>
            </Col> 
        </>
    }
}

