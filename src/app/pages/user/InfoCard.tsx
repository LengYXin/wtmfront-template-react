import * as React from 'react'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Icon, Avatar, Tag, Divider, Spin, Input } from 'antd'
import { observer } from 'mobx-react'

@observer
export default class InfoCard extends React.Component<any, any> {
  User = this.props.store.User
  state = {
    inputVisible: false, //显示input
    value: ''
  }
  // 显示input
  showInput = () => {
    this.setState({
      inputVisible: true
    })
  }

  //获取输入值
  handleInputChange = e => {
    //获取焦点
    this.setState({
      value: e.target.value
    })
  }
  // 脱离焦点   创建input
  handleInputConfirm = () => {
    if(this.state.value){
      this.props.store.addLabel(this.state.value)
    }
    // 为什么拿不到mobx中的action函数
    this.setState({
      inputVisible: false,
      value: ''
    })
  }
 
  render() {
    return (
      <>
        <Card bordered={false} style={{ marginBottom: 24 }}>
          <div>
            <div className="avatarHolder">
              <img
                alt=""
                src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
              />
              <div className="name">{this.User.Name}</div>
              <div>{this.User.Info}</div>
            </div>
            <div className="detail">
              <p>
                <i className="title" />
                {this.User.Profession}
              </p>
              <p>
                <i className="group" />
                {this.User.Department}
              </p>
              <p>
                <i className="address" />
                {this.User.Place}
                {this.User.Place}
              </p>
            </div>
            <Divider dashed />
            <div className="tags">
              <div className="tagsTitle">标签</div>
              {this.User.Tags.map(item => (
                <Tag key={item.key}>{item.value}</Tag>
              ))}
              {this.state.inputVisible && (
                <Input
                  autoFocus
                  type="text"
                  size="small"
                  style={{ width: 78 }}
                  value={this.state.value}
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputConfirm}
                  onPressEnter={this.handleInputConfirm}
                />
              )}
              {!this.state.inputVisible && (
                <Tag
                  onClick={this.showInput}
                  style={{ background: '#fff', borderStyle: 'dashed' }}
                >
                  <Icon type="plus" />
                </Tag>
              )}
            </div>
            <Divider style={{ marginTop: 16 }} dashed />
            <div className="team">
              <div className="teamTitle">团队</div>
              {/* <Spin  spinning> */}
              <Row gutter={36}>
                {this.User.Teams.map(item => (
                  <Col key={item.key} lg={24} xl={12}>
                    <Link to="/">
                      <Avatar
                        size="small"
                        src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                      />
                      {item.value}
                    </Link>
                  </Col>
                ))}
              </Row>
              {/* </Spin> */}
            </div>
          </div>
        </Card>
      </>
    )
  }
}
// class GridContent extends React.PureComponent {
//   render() {
//     return <div>{this.props.children}</div>
//   }
// }
