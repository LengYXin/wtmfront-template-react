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
                {getFieldDecorator('createDateFrom',{
                    initialValue: initialValue('createDateFrom','date-time'),
                })(
                    <DataEntry {...this.props}  format="date-time"  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="未配置说明" {...formItemLayout}>
                {getFieldDecorator('createDateTo',{
                    initialValue: initialValue('createDateTo','date-time'),
                })(
                    <DataEntry {...this.props}  format="date-time"  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="商品编号" {...formItemLayout}>
                {getFieldDecorator('productCode',{
                    initialValue: initialValue('productCode',''),
                })(
                    <DataEntry {...this.props}  placeholder='商品编号'  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="IIPC商品编号" {...formItemLayout}>
                {getFieldDecorator('iIPCProductCode',{
                    initialValue: initialValue('iIPCProductCode',''),
                })(
                    <DataEntry {...this.props}  placeholder='IIPC商品编号'  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="产品名称" {...formItemLayout}>
                {getFieldDecorator('productName',{
                    initialValue: initialValue('productName',''),
                })(
                    <DataEntry {...this.props}  placeholder='产品名称'  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="产品组" {...formItemLayout}>
                {getFieldDecorator('productGroupID',{
                    initialValue: initialValue('productGroupID','int32'),
                })(
                    <DataEntry {...this.props}  format="int32"  placeholder='产品组'  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="未配置说明" {...formItemLayout}>
                {getFieldDecorator('mustScan',{
                    initialValue: initialValue('mustScan','int32'),
                })(
                    <DataEntry {...this.props}  format="int32"  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="需要扫描" {...formItemLayout}>
                {getFieldDecorator('remark',{
                    initialValue: initialValue('remark',''),
                })(
                    <DataEntry {...this.props}  placeholder='需要扫描'  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="是否可用" {...formItemLayout}>
                {getFieldDecorator('enable',{
                    initialValue: initialValue('enable','int32'),
                })(
                    <DataEntry {...this.props}  format="int32"  placeholder='是否可用'  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="创建时间" {...formItemLayout}>
                {getFieldDecorator('createDate',{
                    initialValue: initialValue('createDate','date-time'),
                })(
                    <DataEntry {...this.props}  format="date-time"  placeholder='创建时间'  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="未配置说明" {...formItemLayout}>
                {getFieldDecorator('storageId',{
                    initialValue: initialValue('storageId','int32'),
                })(
                    <DataEntry {...this.props}  format="int32"  />
                )}
                </FormItem>
            </Col> 
        </>
    }
}

