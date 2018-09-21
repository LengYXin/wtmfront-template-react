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
@observer
export default class TableBodyComponent extends React.Component<{ Store: Store }, any> {
  constructor(props) {
    super(props)
    this.Store.onGet();
  }

  Store = this.props.Store;
  columns = [
    ...this.Store.columns.map(this.columnsMap.bind(this)),
    {
      title: 'Action',
      dataIndex: 'Action',
      render: this.renderAction.bind(this),
    }
  ]
  /**
   * 覆盖默认的 table 元素
   */
  components = {
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
  handleResize = index => (e, { size }) => {
    // console.log(index, e, size);
    // this.setState(({ columns }) => {
    //   const nextColumns = [...columns];
    //   nextColumns[index] = {
    //     ...nextColumns[index],
    //     width: size.width,
    //   };
    //   return { columns: nextColumns };
    // });
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
  // 处理 表格类型输出
  columnsMap(column, index) {
    switch (column.format) {
      case 'date-time':
        column.render = (record) => {
          try {
            if (record == null || record == undefined) {
              return "";
            }
            return moment(record).format(this.Store.dateFormat)
          } catch (error) {
            return error.toString()
          }
        }
        break;
    }
    return {
      ...column,
      width: 100,
      // 列拖拽
      onHeaderCell: col => ({
        width: col.width,
        onResize: this.handleResize(index),
      }),
    }
  }
  renderAction(text, record) {
    return <ActionComponent {...this.props} data={record} />;
  }
  /**
   * 分页、排序、筛选变化时触发
   * @param page 
   * @param pageSize 
   */
  onChange(page, pageSize) {
    this.Store.onGet({
      pageNo: page.current,
      pageSize: page.pageSize
    })
  }
  render() {
    /**
     * 行选择
     */
    const rowSelection = {
      selectedRowKeys: this.Store.selectedRowKeys,
      onChange: e => this.Store.onSelectChange(e),
    };
    /**
     * 数据集合
     */
    const dataSource = this.Store.dataSource
    // console.log(this.columns);
    return (
      <Row>
        <Divider />
        <Table
          bordered
          components={this.components}
          dataSource={dataSource.list.slice()}
          onChange={this.onChange.bind(this)}
          columns={this.columns}
          rowSelection={rowSelection}
          loading={this.Store.pageConfig.loading}
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
        {this.Store.pageButtons.update ? <a onClick={this.Store.onModalShow.bind(this.Store, this.props.data)} >修改</a> : null}
        <Divider type="vertical" />
        {this.Store.pageButtons.delete ?
          <Popconfirm title="Sure to delete?" onConfirm={this.onDelete.bind(this)} >
            <a >删除</a>
          </Popconfirm> : null}


      </>
    );
  }
}
