/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2018-09-10 04:47:52
 * @modify date 2018-09-10 04:47:52
 * @desc [description]
*/
import { Form, Icon, Input, Select } from 'antd';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import Store from '../../store';
const FormItem = Form.Item;
const Option = Select.Option;
@inject(() => Store)
@observer
class App extends React.Component<any, any> {
    componentDidMount() {
        this.props.onForm && this.props.onForm(this.props.form);
    }
    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     this.props.form.validateFields((err, values) => {
    //         if (!err) {
    //             // this.props.swaggerDoc.updateCPContainers(values);
    //             values.menuName = values.menuName || values.componentName;
    //             this.props.decompose.onSaveInfo(values);
    //             this.props.onSubmit && this.props.onSubmit(values);
    //         }
    //     });
    // }
    onSubmit(e) {
        e.preventDefault();

    }
    render() {
        // const { containers } = this.props.swaggerDoc.createParam
        const { Model } = this.props.decompose;
        const { project } = this.props.swaggerDoc
        const { getFieldDecorator } = this.props.form;
        return (
            <Form style={{ margin: "auto", textAlign: "left" }}>
                <FormItem label="组件名称" extra="全英文不包含空格等特殊字符">
                    {getFieldDecorator('componentName', {
                        initialValue: Model.componentName,

                        rules: [
                            { required: true, message: '组件名称必填!' },
                            { pattern: /^[a-zA-Z]+$/, message: '组件名称必须是全英文!' }
                        ],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="组件名称" />
                    )}
                </FormItem>
                <FormItem label="菜单名称" extra="置空将使用组件名称">
                    {getFieldDecorator('menuName', {
                        initialValue: Model.menuName,
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="菜单名称" />
                    )}
                </FormItem>
                <FormItem label="菜单Icon" extra="菜单图标">
                    {getFieldDecorator('icon', {
                        initialValue: Model.icon || 'menu-fold',
                    })(
                        <Input prefix={<Icon type={Model.icon || 'menu-fold'} style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="菜单Icon" />
                    )}
                </FormItem>
                <FormItem label="模板" extra="渲染模板（自定义模板）">
                    {getFieldDecorator('template', {
                        initialValue: Model.template,
                    })(
                        <Select style={{ width: "100%" }} placeholder="选择模板" >
                            {project.templates.map((x, i) => {
                                return <Option key={i} value={x}>{x}</Option>
                            })}
                        </Select>
                    )}
                </FormItem>

            </Form>
        );
    }
}

const WrappedHorizontalLoginForm = Form.create()(App);
export default WrappedHorizontalLoginForm

