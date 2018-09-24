import * as React from 'react'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Icon, Avatar, Tag, Divider, Spin, Input } from 'antd'
import { inject, observer } from 'mobx-react'
import Store from "../../../store/user"
const store = new Store()


@inject(() => store)
@observer
export default class InfoCard extends React.Component<any, any> {
 state={
  inputVisible:false, //显示input
  value:"" 
 }
 showInput=()=>{
    this.setState({
      inputVisible:true
    })
 }

 handleInputChange=(e)=>{
   //获取焦点
  //  console.log(e.target.value)
  this.setState({
      value:e.target.value
  })
 }
// 脱离焦点   创建input
 handleInputConfirm=()=>{
   // 为什么拿不到mobx中的action函数
   console.log(this.props)
    // this.props.addInput(this.state.value)
 }
 //自动获取焦点
 saveInputRef(){
   console.log(this)
 }

  render(){
    console.log(this.props)
    return <>
            <Card bordered={false} style={{ marginBottom: 24 }}>
                <div>
                  <div className="avatarHolder">
                    <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                    <div className="name">{this.props.User.Name}</div>
                    <div>{this.props.User.Info}</div>
                  </div>
                  <div className="detail">
                    <p>
                      <i className="title" />
                      {this.props.User.Profession}
                    </p>
                    <p>
                      <i className="group" />
                      {this.props.User.Department}
                    </p>
                    <p>
                      <i className="address" />
                      {this.props.User.Place}
                      {this.props.User.Place}
                    </p>
                  </div>
                  <Divider dashed />
                  <div className="tags">
                    <div className="tagsTitle">标签</div>
                    {this.props.User.Tags.map(item => (
                      <Tag key={item.key}>{item.value}</Tag>
                    ))}
                    {this.state.inputVisible &&<Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={this.state.value}
                         onChange={this.handleInputChange}
                         onBlur={this.handleInputConfirm}
                         onPressEnter={this.handleInputConfirm}
                      />
                    }
                    {!this.state.inputVisible && <Tag
                         onClick={this.showInput}
                        style={{ background: '#fff', borderStyle: 'dashed' }}
                      >
                        <Icon type="plus" />
                      </Tag>
                    }
                  </div>
                  <Divider style={{ marginTop: 16 }} dashed />
                  <div className="team">
                    <div className="teamTitle">团队</div>
                    {/* <Spin  spinning> */}
                      <Row gutter={36}>
                        {this.props.User.Teams.map(item => (
                          <Col key={item.key} lg={24} xl={12}>
                            <Link to="/">
                              <Avatar size="small" src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
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
  }

}
// class GridContent extends React.PureComponent {
//   render() {
//     return <div>{this.props.children}</div>
//   }
// }


