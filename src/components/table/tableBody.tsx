/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2018-09-12 18:53:22
 * @modify date 2018-09-12 18:53:22
 * @desc [description]
*/
import { Divider, Popconfirm, Row, Table } from 'antd';
import Store from 'core/StoreBasice';
import { observer } from 'mobx-react';
import moment from 'moment';
import * as React from 'react';
import lodash from 'lodash';
import { Resizable } from 'react-resizable';
import "./style.less";
import ReactDOM from 'react-dom';
import Rx, { Observable, Subscription,Subject } from 'rxjs';
import { toJS } from 'mobx';

//创建
export const subject = new Rx.Subject();

@observer
export default class TableBodyComponent extends React.Component<{ Store: Store }, any> {
  // state={
  //   isScroll:{
  //     x:false
  //   }
  // }

  isMove=false//是否拖拽
  Store = this.props.Store;
  columns = [
    // ...this.Store.columns.map(this.columnsMap.bind(this)),
    // {
    //   title: 'Action',
    //   dataIndex: 'Action',
    //   render: this.renderAction.bind(this),
    // }
  ];
  /**
   * 初始化列参数配置
   */
  initColumns() {
    if (this.rowDom && this.rowDom.clientWidth) {
      const width = Math.floor(this.rowDom.clientWidth / (this.Store.columns.length + 1))
      this.columns = [
        ...this.Store.columns.map((col, index) => {
          return this.columnsMap(col, index, width)
        }),
        {
          title: 'Action',
          dataIndex: 'Action',
          render: this.renderAction.bind(this),
        }
      ];
    }
  }
  /**
  *  处理 表格类型输出
  * @param column 
  * @param index 
  */
  columnsMap(column, index, width) {
    switch (column.format) {
      // 转换时间类型 输出
      case 'date-time':
        column.render = (record) => {
          try {
            if (record == null || record == undefined) {
              return "";
            }
            return moment(record).format(this.Store.dateTimeFormat)
          } catch (error) {
            return error.toString()
          }
        }
        break;
    }
    return {
      ...column,
      sorter:true,
      width: width,
      // 列拖拽
      onHeaderCell: col => ({
        width: col.width,
        onResize: this.handleResize(index),
      }),
    }
  }
  /**
   * 选项
   * @param text 
   * @param record 
   */
  renderAction(text, record) {
    return <ActionComponent {...this.props} data={record} />;
  }
  /**
   * 分页、排序、筛选变化时触发
   * @param page 
   * @param filters 
   * @param sorter 
   */
  onChange(page, filters, sorter) {
    this.Store.onGet({
      pageNo: page.current,
      pageSize: page.pageSize
    })
  }
  /**
    * 行选择
    */
  
  /**
   * 覆盖默认的 table 元素
   */
  private components = {
    header: {
      cell: (props) => {
        const { onResize, width, ...restProps } = props;

        if (!width) {
          return <th {...restProps} />;
        }

        return (
          <Resizable width={width} height={0} onResize={onResize}>
            <th {...restProps} />
          </Resizable>
        );
      },
    },
  };
  /**
   * 拖拽
   */
  private handleResize = index => (e, { size }) => {
    this.isMove=true//拖拽时，不执行initColumns
    let column = {
      ...this.columns[index],
      width: size.width,
    }
    this.columns = [
      ...this.columns.slice(0, index),
      column,
      ...this.columns.slice(index + 1, this.columns.length),
    ]
    // console.log(this.columns);
    this.forceUpdate();
  };

  resize: Subscription;
  private rowDom: HTMLDivElement;

  selfColumns:Subscription

    //订阅
    componentWillMount(){
      this.selfColumns=subject.subscribe({
        next: ()=>{
          this.isMove=false//将initColumns暴露render下
          this.forceUpdate()
        }
      });
    }
  componentDidMount() {
    // this.setState({
    //   isScroll:{
    //     x:this.rowDom.clientWidth+100
    //   }
    // })

    this.Store.onGet();
    // 窗口变化重新计算列宽度
    this.resize = Rx.Observable.fromEvent(window, "resize").debounceTime(800).subscribe(e => {
      this.initColumns();
      this.forceUpdate();
    });
  }
  componentWillUnmount() {
    this.resize.unsubscribe();
    this.selfColumns.unsubscribe()
  }
  render() {
    const rowSelection = {
      selectedRowKeys: this.Store.selectedRowKeys,
      onChange: (e)=>{this.Store.onSelectChange(e)}
    };
    const dataSource = this.Store.dataSource;
    if(!this.isMove){
      this.initColumns();//初始化执行
    }
    return (
      <Row ref={e => this.rowDom = ReactDOM.findDOMNode(e) as any}>
        <Divider />
        <Table
          bordered
          components={this.components}
          dataSource={dataSource.list.slice()}
          onChange={this.onChange.bind(this)}
          columns={this.columns}
          rowSelection={rowSelection}
          loading={this.Store.pageState.loading}
          scroll={{x:true}}
          pagination={
            {
              // hideOnSinglePage: true,//只有一页时是否隐藏分页器
              position: "top",
              showSizeChanger: true,//是否可以改变 pageSize
              pageSize: dataSource.pageSize,
              defaultPageSize: dataSource.pageSize,
              defaultCurrent: dataSource.pageNo,
              total: dataSource.count
            }
          }
        />
      </Row>
    );
  }
}
/**
 * 数据操作按钮
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
      <span style={{display:"inline-block"}}>
        {this.Store.pageButtons.update ? <a onClick={this.Store.onModalShow.bind(this.Store, this.props.data)} >修改</a> : null}
        </span>
        <Divider type="vertical" />
        <span style={{display:"inline-block"}}>
        {this.Store.pageButtons.delete ?
          <Popconfirm title="Sure to delete?" onConfirm={this.onDelete.bind(this)} >
            <a >删除</a>
          </Popconfirm> : null}
          </span>
      </>
    );
  }
}
