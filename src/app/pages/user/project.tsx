import React, { PureComponent } from 'react';
import { List, Card,Avatar } from 'antd';
import moment from 'moment';
import {inject,observer} from 'mobx-react';
import Store from "../../../store/user"
const store=new Store;

// import  from "./articles.less"
@inject(()=>store)
@observer
class Center extends PureComponent<any,any> {
  render() {
    const project=this.props.User.project
    return <>
    <div>
      <List
        rowKey="id"
        grid={{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
        dataSource={project}
        renderItem={item => (
          <List.Item>
            <Card
             
              hoverable
              cover={<img alt={item.title} src={item.cover} />}
            >
              <Card.Meta title={<a>{item.title}</a>} description={item.subDescription} />
              <div>
                <span>{item.updatedAt}</span>
                <div>
                    {item.members.map(member => (
                      <Avatar
                        shape="square"
                        key={`${item.id}-avatar-${member.id}`}
                        src={member.avatar}
                        alt={member.name}
                        size="small"
                        style={{float:"right"}}
                      />
                    ))}
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
     
    </>
  }
}




export default Center;
