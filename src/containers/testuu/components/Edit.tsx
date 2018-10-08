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
            <FormItem label="产品ID" {...formItemLayout}>
            {getFieldDecorator('productId',{
                rules: [{"required":true,"message":"Please input your undefined!"}],
                initialValue: initialValue('productId','int64'),
            })(
               <DataEntry {...this.props}  format="int64"  placeholder='产品ID'  />
            )}
        </FormItem> 
         <FormItem label="商品编号" {...formItemLayout}>
            {getFieldDecorator('productCode',{
                rules: [{"required":true,"message":"Please input your undefined!"},{"min":0,"message":"min length 0!"},{"max":50,"message":"max length 50!"}],
                initialValue: initialValue('productCode',''),
            })(
               <DataEntry {...this.props}  placeholder='商品编号'  />
            )}
        </FormItem> 
         <FormItem label="IIPC商品编号" {...formItemLayout}>
            {getFieldDecorator('iIPCProductCode',{
                rules: [{"min":0,"message":"min length 0!"},{"max":50,"message":"max length 50!"}],
                initialValue: initialValue('iIPCProductCode',''),
            })(
               <DataEntry {...this.props}  placeholder='IIPC商品编号'  />
            )}
        </FormItem> 
         <FormItem label="产品名称" {...formItemLayout}>
            {getFieldDecorator('productName',{
                rules: [{"min":0,"message":"min length 0!"},{"max":21845,"message":"max length 21845!"}],
                initialValue: initialValue('productName',''),
            })(
               <DataEntry {...this.props}  placeholder='产品名称'  />
            )}
        </FormItem> 
         <FormItem label="体积" {...formItemLayout}>
            {getFieldDecorator('volume',{
                rules: [],
                initialValue: initialValue('volume',''),
            })(
               <DataEntry {...this.props}  placeholder='体积'  />
            )}
        </FormItem> 
         <FormItem label="重量" {...formItemLayout}>
            {getFieldDecorator('weight',{
                rules: [],
                initialValue: initialValue('weight',''),
            })(
               <DataEntry {...this.props}  placeholder='重量'  />
            )}
        </FormItem> 
         <FormItem label="公路标签数量" {...formItemLayout}>
            {getFieldDecorator('roadTabNum',{
                rules: [],
                initialValue: initialValue('roadTabNum',''),
            })(
               <DataEntry {...this.props}  placeholder='公路标签数量'  />
            )}
        </FormItem> 
         <FormItem label="铁路标签数量" {...formItemLayout}>
            {getFieldDecorator('trainTabNum',{
                rules: [],
                initialValue: initialValue('trainTabNum',''),
            })(
               <DataEntry {...this.props}  placeholder='铁路标签数量'  />
            )}
        </FormItem> 
         <FormItem label="航空标签数量" {...formItemLayout}>
            {getFieldDecorator('airTabNum',{
                rules: [],
                initialValue: initialValue('airTabNum',''),
            })(
               <DataEntry {...this.props}  placeholder='航空标签数量'  />
            )}
        </FormItem> 
         <FormItem label="单位" {...formItemLayout}>
            {getFieldDecorator('unit',{
                rules: [{"min":0,"message":"min length 0!"},{"max":50,"message":"max length 50!"}],
                initialValue: initialValue('unit',''),
            })(
               <DataEntry {...this.props}  placeholder='单位'  />
            )}
        </FormItem> 
         <FormItem label="包装乘数" {...formItemLayout}>
            {getFieldDecorator('packingMulti',{
                rules: [],
                initialValue: initialValue('packingMulti',''),
            })(
               <DataEntry {...this.props}  placeholder='包装乘数'  />
            )}
        </FormItem> 
         <FormItem label="包装除数" {...formItemLayout}>
            {getFieldDecorator('packingDivisor',{
                rules: [],
                initialValue: initialValue('packingDivisor',''),
            })(
               <DataEntry {...this.props}  placeholder='包装除数'  />
            )}
        </FormItem> 
         <FormItem label="产品组" {...formItemLayout}>
            {getFieldDecorator('productGroupID',{
                rules: [],
                initialValue: initialValue('productGroupID','int32'),
            })(
               <DataEntry {...this.props}  format="int32"  placeholder='产品组'  />
            )}
        </FormItem> 
         <FormItem label="是否实物发货" {...formItemLayout}>
            {getFieldDecorator('isPracticality',{
                rules: [],
                initialValue: initialValue('isPracticality','int32'),
            })(
               <DataEntry {...this.props}  format="int32"  placeholder='是否实物发货'  />
            )}
        </FormItem> 
         <FormItem label="未配置说明" {...formItemLayout}>
            {getFieldDecorator('mustScan',{
                rules: [],
                initialValue: initialValue('mustScan','int32'),
            })(
               <DataEntry {...this.props}  format="int32"  />
            )}
        </FormItem> 
         <FormItem label="需要扫描" {...formItemLayout}>
            {getFieldDecorator('remark',{
                rules: [{"min":0,"message":"min length 0!"},{"max":715827882,"message":"max length 715827882!"}],
                initialValue: initialValue('remark',''),
            })(
               <DataEntry {...this.props}  placeholder='需要扫描'  />
            )}
        </FormItem> 
         <FormItem label="是否可用" {...formItemLayout}>
            {getFieldDecorator('enable',{
                rules: [],
                initialValue: initialValue('enable','int32'),
            })(
               <DataEntry {...this.props}  format="int32"  placeholder='是否可用'  />
            )}
        </FormItem> 
         <FormItem label="排序号" {...formItemLayout}>
            {getFieldDecorator('orderNo',{
                rules: [],
                initialValue: initialValue('orderNo','int32'),
            })(
               <DataEntry {...this.props}  format="int32"  placeholder='排序号'  />
            )}
        </FormItem> 
         <FormItem label="创建人ID" {...formItemLayout}>
            {getFieldDecorator('createID',{
                rules: [],
                initialValue: initialValue('createID','int32'),
            })(
               <DataEntry {...this.props}  format="int32"  placeholder='创建人ID'  />
            )}
        </FormItem> 
         <FormItem label="创建人" {...formItemLayout}>
            {getFieldDecorator('creator',{
                rules: [{"min":0,"message":"min length 0!"},{"max":50,"message":"max length 50!"}],
                initialValue: initialValue('creator',''),
            })(
               <DataEntry {...this.props}  placeholder='创建人'  />
            )}
        </FormItem> 
         <FormItem label="创建时间" {...formItemLayout}>
            {getFieldDecorator('createDate',{
                rules: [],
                initialValue: initialValue('createDate','date-time'),
            })(
               <DataEntry {...this.props}  format="date-time"  placeholder='创建时间'  />
            )}
        </FormItem> 
         <FormItem label="修改人ID" {...formItemLayout}>
            {getFieldDecorator('modifyID',{
                rules: [],
                initialValue: initialValue('modifyID','int32'),
            })(
               <DataEntry {...this.props}  format="int32"  placeholder='修改人ID'  />
            )}
        </FormItem> 
         <FormItem label="修改人" {...formItemLayout}>
            {getFieldDecorator('modifier',{
                rules: [{"min":0,"message":"min length 0!"},{"max":50,"message":"max length 50!"}],
                initialValue: initialValue('modifier',''),
            })(
               <DataEntry {...this.props}  placeholder='修改人'  />
            )}
        </FormItem> 
         <FormItem label="修改时间" {...formItemLayout}>
            {getFieldDecorator('modifyDate',{
                rules: [],
                initialValue: initialValue('modifyDate','date-time'),
            })(
               <DataEntry {...this.props}  format="date-time"  placeholder='修改时间'  />
            )}
        </FormItem> 
         <FormItem label="未配置说明" {...formItemLayout}>
            {getFieldDecorator('productBigTypeID',{
                rules: [],
                initialValue: initialValue('productBigTypeID','int32'),
            })(
               <DataEntry {...this.props}  format="int32"  />
            )}
        </FormItem> 
         <FormItem label="大类名称" {...formItemLayout}>
            {getFieldDecorator('productBigName',{
                rules: [{"min":0,"message":"min length 0!"},{"max":30,"message":"max length 30!"}],
                initialValue: initialValue('productBigName',''),
            })(
               <DataEntry {...this.props}  placeholder='大类名称'  />
            )}
        </FormItem> 
         <FormItem label="未配置说明" {...formItemLayout}>
            {getFieldDecorator('storageId',{
                rules: [],
                initialValue: initialValue('storageId','int32'),
            })(
               <DataEntry {...this.props}  format="int32"  />
            )}
        </FormItem> 
         <FormItem label="未配置说明" {...formItemLayout}>
            {getFieldDecorator('flag',{
                rules: [{"min":0,"message":"min length 0!"},{"max":1,"message":"max length 1!"}],
                initialValue: initialValue('flag',''),
            })(
               <DataEntry {...this.props}  />
            )}
        </FormItem> 
         <FormItem label="未配置说明" {...formItemLayout}>
            {getFieldDecorator('isX86',{
                rules: [],
                initialValue: initialValue('isX86','int32'),
            })(
               <DataEntry {...this.props}  format="int32"  />
            )}
        </FormItem> 
         <FormItem label="未配置说明" {...formItemLayout}>
            {getFieldDecorator('syncflag',{
                rules: [{"min":0,"message":"min length 0!"},{"max":1,"message":"max length 1!"}],
                initialValue: initialValue('syncflag',''),
            })(
               <DataEntry {...this.props}  />
            )}
        </FormItem> 
         <FormItem label="捕获变动数据标识" {...formItemLayout}>
            {getFieldDecorator('tranTMSFlag',{
                rules: [{"min":0,"message":"min length 0!"},{"max":1,"message":"max length 1!"}],
                initialValue: initialValue('tranTMSFlag',''),
            })(
               <DataEntry {...this.props}  placeholder='捕获变动数据标识'  />
            )}
        </FormItem> 
        </>
    }
      // 重写示例
    // renderButtons() {
    //     return <Button icon="folder-add" onClick={this.Store.onModalShow.bind(this.Store, {})}>添加</Button>
    // }
}