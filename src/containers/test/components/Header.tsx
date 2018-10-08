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
                <FormItem label="未配置说明" {...formItemLayout}>
                {getFieldDecorator('modifyDateFrom',{
                    initialValue: initialValue('modifyDateFrom','date-time'),
                })(
                    <DataEntry {...this.props}  format="date-time"  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="未配置说明" {...formItemLayout}>
                {getFieldDecorator('modifyDateTo',{
                    initialValue: initialValue('modifyDateTo','date-time'),
                })(
                    <DataEntry {...this.props}  format="date-time"  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="产品ID" {...formItemLayout}>
                {getFieldDecorator('productId',{
                    initialValue: initialValue('productId','int64'),
                })(
                    <DataEntry {...this.props}  format="int64"  placeholder='产品ID'  />
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
                <FormItem label="体积" {...formItemLayout}>
                {getFieldDecorator('volume',{
                    initialValue: initialValue('volume',''),
                })(
                    <DataEntry {...this.props}  placeholder='体积'  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="重量" {...formItemLayout}>
                {getFieldDecorator('weight',{
                    initialValue: initialValue('weight',''),
                })(
                    <DataEntry {...this.props}  placeholder='重量'  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="公路标签数量" {...formItemLayout}>
                {getFieldDecorator('roadTabNum',{
                    initialValue: initialValue('roadTabNum',''),
                })(
                    <DataEntry {...this.props}  placeholder='公路标签数量'  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="铁路标签数量" {...formItemLayout}>
                {getFieldDecorator('trainTabNum',{
                    initialValue: initialValue('trainTabNum',''),
                })(
                    <DataEntry {...this.props}  placeholder='铁路标签数量'  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="航空标签数量" {...formItemLayout}>
                {getFieldDecorator('airTabNum',{
                    initialValue: initialValue('airTabNum',''),
                })(
                    <DataEntry {...this.props}  placeholder='航空标签数量'  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="单位" {...formItemLayout}>
                {getFieldDecorator('unit',{
                    initialValue: initialValue('unit',''),
                })(
                    <DataEntry {...this.props}  placeholder='单位'  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="包装乘数" {...formItemLayout}>
                {getFieldDecorator('packingMulti',{
                    initialValue: initialValue('packingMulti',''),
                })(
                    <DataEntry {...this.props}  placeholder='包装乘数'  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="包装除数" {...formItemLayout}>
                {getFieldDecorator('packingDivisor',{
                    initialValue: initialValue('packingDivisor',''),
                })(
                    <DataEntry {...this.props}  placeholder='包装除数'  />
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
                <FormItem label="是否实物发货" {...formItemLayout}>
                {getFieldDecorator('isPracticality',{
                    initialValue: initialValue('isPracticality','int32'),
                })(
                    <DataEntry {...this.props}  format="int32"  placeholder='是否实物发货'  />
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
                <FormItem label="排序号" {...formItemLayout}>
                {getFieldDecorator('orderNo',{
                    initialValue: initialValue('orderNo','int32'),
                })(
                    <DataEntry {...this.props}  format="int32"  placeholder='排序号'  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="创建人ID" {...formItemLayout}>
                {getFieldDecorator('createID',{
                    initialValue: initialValue('createID','int32'),
                })(
                    <DataEntry {...this.props}  format="int32"  placeholder='创建人ID'  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="创建人" {...formItemLayout}>
                {getFieldDecorator('creator',{
                    initialValue: initialValue('creator',''),
                })(
                    <DataEntry {...this.props}  placeholder='创建人'  />
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
                <FormItem label="修改人ID" {...formItemLayout}>
                {getFieldDecorator('modifyID',{
                    initialValue: initialValue('modifyID','int32'),
                })(
                    <DataEntry {...this.props}  format="int32"  placeholder='修改人ID'  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="修改人" {...formItemLayout}>
                {getFieldDecorator('modifier',{
                    initialValue: initialValue('modifier',''),
                })(
                    <DataEntry {...this.props}  placeholder='修改人'  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="修改时间" {...formItemLayout}>
                {getFieldDecorator('modifyDate',{
                    initialValue: initialValue('modifyDate','date-time'),
                })(
                    <DataEntry {...this.props}  format="date-time"  placeholder='修改时间'  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="未配置说明" {...formItemLayout}>
                {getFieldDecorator('productBigTypeID',{
                    initialValue: initialValue('productBigTypeID','int32'),
                })(
                    <DataEntry {...this.props}  format="int32"  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="大类名称" {...formItemLayout}>
                {getFieldDecorator('productBigName',{
                    initialValue: initialValue('productBigName',''),
                })(
                    <DataEntry {...this.props}  placeholder='大类名称'  />
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
             <Col {...colLayout} >
                <FormItem label="未配置说明" {...formItemLayout}>
                {getFieldDecorator('flag',{
                    initialValue: initialValue('flag',''),
                })(
                    <DataEntry {...this.props}  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="未配置说明" {...formItemLayout}>
                {getFieldDecorator('isX86',{
                    initialValue: initialValue('isX86','int32'),
                })(
                    <DataEntry {...this.props}  format="int32"  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="未配置说明" {...formItemLayout}>
                {getFieldDecorator('syncflag',{
                    initialValue: initialValue('syncflag',''),
                })(
                    <DataEntry {...this.props}  />
                )}
                </FormItem>
            </Col> 
             <Col {...colLayout} >
                <FormItem label="捕获变动数据标识" {...formItemLayout}>
                {getFieldDecorator('tranTMSFlag',{
                    initialValue: initialValue('tranTMSFlag',''),
                })(
                    <DataEntry {...this.props}  placeholder='捕获变动数据标识'  />
                )}
                </FormItem>
            </Col> 
        </>
    }
}

