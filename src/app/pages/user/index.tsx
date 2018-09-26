import * as React from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  Row,
  Col,
  Icon,
  Avatar,
  Tag,
  Divider,
  Spin,
  Input,
  Tabs
} from 'antd'
import Store from '../../../store'
import { inject, observer } from 'mobx-react'
import './css/Center.less'
import InfoCard from './infoCard'
import Articles from './articles'
import AppList from './Applications'
import Project from './project'
import store from 'store/index'

const operationTabList = [
  {
    tab: (
      <span>
        文章 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    )
  },
  {
    tab: (
      <span>
        应用 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    )
  },
  {
    tab: (
      <span>
        项目 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    )
  }
]

const TabPane = Tabs.TabPane

@inject(() => Store)
@observer
export default class IApp extends React.Component<any, any> {
  store = this.props.User
  // state = {
  //   key: 'articles',
  //   noTitleKey: 'articles'
  // }
  // contentListNoTitle = {
  //   articles: <Articles store={this.store} />,
  //   app: <AppList store={this.store} />,
  //   project: <Project store={this.store} />
  // }
  onTabChange = (key, type) => {
    // console.log(key, type);
    this.setState({ [type]: key })
  }
  render() {
    // const { isLogin } = this.props
    return (
      <Row gutter={24} className="app-user">
        <Col lg={7} md={24}>
          <InfoCard store={this.store} />
        </Col>
        <Col lg={17} md={24}>
          {/* <Card
              className="tabsCard"
              bordered={false}
              tabList={operationTabList}
              activeTabKey={this.state.noTitleKey}
              onTabChange={key => {
               this.onTabChange(key, 'noTitleKey')
              }}
            >
              {this.contentListNoTitle[this.state.noTitleKey]}
            </Card> */}
          <Tabs defaultActiveKey="1" className="tabsCard">
            <TabPane tab={operationTabList[0].tab} key="1">
              <Articles store={this.store} />
            </TabPane>
            <TabPane tab={operationTabList[1].tab} key="2">
              <AppList store={this.store} />
            </TabPane>
            <TabPane tab={operationTabList[2].tab} key="3">
              <Project store={this.store} />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    )
  }
}

//  class GridContent extends React.PureComponent {
// render() {
//   return <div>{this.props.children}</div>
// }
