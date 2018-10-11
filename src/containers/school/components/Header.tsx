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
                <FormItem label="未配置说明" {...formItemLayout}>
                {getFieldDecorator('createdateFrom',{
                    initialValue: initialValue('createdateFrom','date-time'),
                })(
                    <DataEntry {...this.props}  format="date-time"  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="未配置说明" {...formItemLayout}>
                {getFieldDecorator('createdateTo',{
                    initialValue: initialValue('createdateTo','date-time'),
                })(
                    <DataEntry {...this.props}  format="date-time"  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="未配置说明" {...formItemLayout}>
                {getFieldDecorator('updatedateFrom',{
                    initialValue: initialValue('updatedateFrom','date-time'),
                })(
                    <DataEntry {...this.props}  format="date-time"  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="未配置说明" {...formItemLayout}>
                {getFieldDecorator('updatedateTo',{
                    initialValue: initialValue('updatedateTo','date-time'),
                })(
                    <DataEntry {...this.props}  format="date-time"  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="名称" {...formItemLayout}>
                {getFieldDecorator('name',{
                    initialValue: initialValue('name',''),
                })(
                    <DataEntry {...this.props}  placeholder='名称'  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="地址" {...formItemLayout}>
                {getFieldDecorator('address',{
                    initialValue: initialValue('address',''),
                })(
                    <DataEntry {...this.props}  placeholder='地址'  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="备注" {...formItemLayout}>
                {getFieldDecorator('remark',{
                    initialValue: initialValue('remark',''),
                })(
                    <DataEntry {...this.props}  placeholder='备注'  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="创建日期" {...formItemLayout}>
                {getFieldDecorator('createdate',{
                    initialValue: initialValue('createdate','date-time'),
                })(
                    <DataEntry {...this.props}  format="date-time"  placeholder='创建日期'  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="创建人" {...formItemLayout}>
                {getFieldDecorator('createby',{
                    initialValue: initialValue('createby',''),
                })(
                    <DataEntry {...this.props}  placeholder='创建人'  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="修改日期" {...formItemLayout}>
                {getFieldDecorator('updatedate',{
                    initialValue: initialValue('updatedate','date-time'),
                })(
                    <DataEntry {...this.props}  format="date-time"  placeholder='修改日期'  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="修改人" {...formItemLayout}>
                {getFieldDecorator('updateby',{
                    initialValue: initialValue('updateby',''),
                })(
                    <DataEntry {...this.props}  placeholder='修改人'  />
                )}
                </FormItem>
            </Col> 
        </>
    }
}

