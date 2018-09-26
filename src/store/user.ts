/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2018-09-12 18:52:54
 * @modify date 2018-09-12 18:52:54
 * @desc [description]
*/
import { HttpBasics } from 'core/HttpBasics';
import { action, observable, runInAction } from "mobx";
const Http = new HttpBasics('/user/');
class Store {
    constructor() {

    }
    @observable loding = true;
    @observable isLogin = true;
    // 用户信息
    @observable User = {
        Name: "周",
        Info: "海纳百川，有容乃大",
        Profession: "交互专家",
        Department: "蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED",
        Place: "浙江省杭州市",
        Tags: [
            { value: "很有想法的", key: 1 },
            { value: "专注设计", key: 2 },
            { value: "辣", key: 3 },
            { value: "大长腿", key: 4 },
            { value: "川妹子", key: 5 },
            { value: "海纳百川", key: 6 }
        ],
        Teams: [
            { value: "科学搬家", key: 1 },
            { value: "全组都有", key: 2 },
            { value: "中二少年病", key: 3 },
            { value: "程序员的世界", key: 4 },
            { value: "高逼格操作", key: 5 },
            { value: "骗你来玩", key: 6 }
        ],
        //文章卡片
        lists: [
            {
                id: 1,
                star: "100",//星
                like: "200",//赞
                message: "300",//评论
                title: "Alipay",// 标题 
                content: "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",//信息
                updatedAt: `${new Date}`,//发布时间
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",// 发布者头像
                owner: "支付宝",//发布者
                href: "https://ant.design"//链接 发布链接
            },
            {
                id: 2,
                star: "100",//星
                like: "200",//赞
                message: "300",//评论
                title: "Alipay",// 标题 
                content: "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",//信息
                updatedAt: `${new Date}`,//发布时间
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",// 发布者头像
                owner: "支付宝",//发布者
                href: "https://ant.design"//链接 发布链接
            }
        ],
        //app卡片
        appList: [
            {
                id: 1,
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",// 头像src
                title: "Angular",//标题
                activeUser: "14万",//活跃数量
                newUser: "1,539",//新增数量
            },
            {
                id: 2,
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",// 头像src
                title: "Angular",//标题
                activeUser: "14万",//活跃数量
                newUser: "1,539",//新增数量
            },
            {
                id: 1,
                avatar: "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",// 头像src
                title: "Angular",//标题
                activeUser: "14万",//活跃数量
                newUser: "1,539",//新增数量
            }
        ],
        // 项目卡片
        project: [
            {
                id: 1,
                title: "Ant Design",//标题
                cover: "https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png",//项目图片
                subDescription: "那是一种内在的东西， 他们到达不了，也无法触及的",//描述
                updatedAt: "9 hours ago",//更新时间
                //参与者
                members: [
                    {
                        id: 1,
                        avatar: "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
                        name: "曲丽丽"
                    },
                    {
                        id: 2,
                        avatar: "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
                        name: "孙悟空"
                    }
                ],
            },
            {
                id: 2,
                title: "Ant Design",//标题
                cover: "https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png",//项目图片
                subDescription: "那是一种内在的东西， 他们到达不了，也无法触及的",//描述
                updatedAt: "9 hours ago",//更新时间
                //参与者
                members: [
                    {
                        id: 1,
                        avatar: "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
                        name: "曲丽丽"
                    },
                    {
                        id: 2,
                        avatar: "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
                        name: "孙悟空"
                    }
                ],
            },
            {
                id: 3,
                title: "Ant Design",//标题
                cover: "https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png",//项目图片
                subDescription: "那是一种内在的东西， 他们到达不了，也无法触及的",//描述
                updatedAt: "9 hours ago",//更新时间
                //参与者
                members: [
                    {
                        id: 1,
                        avatar: "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
                        name: "曲丽丽"
                    },
                    {
                        id: 2,
                        avatar: "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
                        name: "孙悟空"
                    }
                ]
            }
        ]

    };
    @action.bound
    addLabel(value) {
        console.log(value)
        let key = this.User.Tags.length + 1
        this.User.Tags.push({ value, key })
    };
    @action.bound
    async Login(params) {
        this.User = params;
        // const result = await Http.post("doLogin", params).toPromise();
        runInAction(() => {
            // this.User = result;
            this.isLogin = true;

        });
    }
    @action.bound
    async outLogin() {
        this.isLogin = false;
    }

}
export default new Store();