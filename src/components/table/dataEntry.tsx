/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2018-09-12 18:53:18
 * @modify date 2018-09-12 18:53:18
 * @desc [description]
*/
import { DatePicker, Input, InputNumber, Select, Spin } from 'antd';
import Store from 'core/StoreBasice';
import moment from 'moment';
import * as React from 'react';
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
interface IDataEntryProps {
    Store: Store;
    format?: string;
    example?: any;
    common?: ICommon;
    // 表单组件传递
    placeholder?: string;
    onChange?: (value: any) => void;
    value?: any;
    defaultValue?: any;
}
/**
 * 数据渲染组件
 * 自定义数据组件
 * https://ant.design/components/form-cn/#components-form-demo-customized-form-controls
 */
export default class DataEntry extends React.Component<IDataEntryProps, any> {
    Store = this.props.Store;
    state = { error: null, errorInfo: null };
    componentDidCatch(error, info) {
        this.setState({
            error: error,
            errorInfo: info
        })
    }
    shouldComponentUpdate() {
        return false
    }
    render() {
        if (this.state.errorInfo) {
            return (
                <div>
                    <h2>组件出错~</h2>
                </div>
            );
        }
        const { example, common, Store, format, placeholder, onChange, value } = this.props;
        let GetFieldDecoratorOptions: any = {
            onChange,
            defaultValue: value,
            placeholder: placeholder
        }
        if (common && common.address) {
            return <DataEntrySelect {...this.props} {...GetFieldDecoratorOptions} />
        }
        if (example && example.date === true) {
            return <DatePicker showTime format={Store.dateTimeFormat} {...GetFieldDecoratorOptions} />
        }
        if (example && example.datetime === true) {
            GetFieldDecoratorOptions.placeholder = [GetFieldDecoratorOptions.placeholder, GetFieldDecoratorOptions.placeholder]
            return <>
                <RangePicker showTime format={Store.dateTimeFormat} {...GetFieldDecoratorOptions} />
            </>
        }
        switch (format) {
            case "date-time":
                return <DatePicker
                    showTime
                    format={Store.dateTimeFormat}
                    {...GetFieldDecoratorOptions} />
            case "int32":
                return <InputNumber {...GetFieldDecoratorOptions} />
            default:
                return <Input type="text" {...GetFieldDecoratorOptions} />
        }
    }
}
/**
 * 远程 获取列表
 */
export class DataEntrySelect extends React.Component<IDataEntryProps, any> {
    Store = this.props.Store;
    state = {
        loading: !this.Store.Common.Cache.has(JSON.stringify(this.props.common)),
        data: [],
        error: null, errorInfo: null
    }
    componentDidCatch(error, info) {
        this.setState({
            error: error,
            errorInfo: info
        })
    }
    async componentDidMount() {
        const data = await this.Store.getCombo(this.props.common)
        this.setState({
            loading: false,
            data: data
        })
    }
    onChange(event) {
        if (this.props.example && this.props.example.multi) {
            event = event.join(",")
        }
        console.log(event);
        this.props.onChange(event);
    }
    render() {
        if (this.state.errorInfo) {
            return (
                <div>
                    <h2>组件出错~</h2>
                </div>
            );
        }
        let config = {
            mode: "multiple",
            onChange: this.onChange.bind(this),
            tokenSeparators: [','],
            placeholder: this.props.placeholder,
            defaultValue: this.props.defaultValue
        }
        if (this.props.example && !this.props.example.multi) {
            delete config.mode;
        } else {
            if (config.defaultValue == "") {
                delete config.defaultValue;
            }
            if (typeof config.defaultValue == "string") {
                config.defaultValue = config.defaultValue.split(",")
            }
        }
        return (
            <Spin spinning={this.state.loading}>
                <Select
                    {...config}
                >
                    {this.state.data.map(x => <Option key={x.value}>{x.name}</Option>)}
                </Select>
            </Spin>

        );
    }
}

