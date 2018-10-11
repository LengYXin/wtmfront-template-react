import React from 'react';
import { List, Icon, Avatar, Tag } from 'antd';
import moment from 'moment';
import {inject,observer} from 'mobx-react';

@observer
class Center extends React.Component<any,any> {
  render() {
   // console.log(this.props)
    //console.log(this.props.User.lists)
    const lists=this.props.store.User.lists
    // const {list}=this.props.
    // const IconText = ({ type, text }) => (
    //   <span>
    //     <Icon type={type} style={{ marginRight: 8 }} />
    //     {/* {text} */}
    //     文章
    //   </span>
    // );
    const ListContent = ({ data: { content, updatedAt, avatar, owner, href } }) => (
      <div>
        <div>{content}</div>
        <div style={{marginTop:"10px"}}>
          <Avatar src={avatar} size="small" />
          <a href={href}>{owner}</a> 发布在
          <a href={href}>{href}</a>
          <em>{moment(updatedAt).format('YYYY-MM-DD HH:mm')}</em>
        </div>
      </div>
    );
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    return <>
      <List
        size="large"
        className="articleList"
        rowKey="id"
        itemLayout="vertical"
        dataSource={lists}
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[
              <IconText type="star-o" text={item.star} />,
              <IconText type="like-o" text={item.like} />,
              <IconText type="message" text={item.message} />,
            ]}
          >
            <List.Item.Meta
              title={
                <a  href="www.baidu.com">
                  {item.title}
                </a>
              }
              description={
                <span>
                  <Tag>Ant Design</Tag>
                  <Tag>设计语言</Tag>
                  <Tag>蚂蚁金服</Tag>
                </span>
              }
            />
            <ListContent data={item} />
          </List.Item>
        )}
      />
    </>;
  }
}

export default Center;
