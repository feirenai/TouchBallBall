// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var gameData = require("./gameData");

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        //开始按钮
        startBnt:{
            default: null,
            type: cc.Button,
        },

        //排行按钮
        rankBtn:{
            default: null,
            type: cc.Button,
        },

        //世界排行按钮
        worldBtn:{
            default: null,
            type: cc.Button,
        },

        //好友排行按钮
        friendBtn:{
            default: null,
            type: cc.Button,
        },

        //世界排行和好友排行的背景框
        worldFriendBg:{
            default: null,
            type:cc.Node,
        },
        
        //广告按钮
        advertisingBtn:{
            default: null,
            type: cc.Button,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {},

    start () {
        //初始化的时候隐藏世界排行按钮和好友排行按钮
        this.on_worldFriendBg_init();

        //判断是否是微信的标识
        if(gameData.wx)
        {
            this.wxGetUserRights()
        }
    },

    //获取微信用户信息的权限
    wxGetUserRights:function(){

    },

    //初始化的时候隐藏世界排行按钮和好友排行按钮
    on_worldFriendBg_init:function()
    {
        //世界排行按钮的x坐标为0
        this.worldBtn.node.x = 0;
        //好友排行按钮的x坐标为0
        this.friendBtn.node.x = 0;
        //世界排行按钮和好友排行按钮的背景框的scaleX
        this.worldFriendBg.scaleX = 0;
    },

    //点击开始按钮
    onStartClick:function(){
        cc.director.loadScene("gameScene");
    },

    //点击排行榜按钮
    onClickRankBtn:function(){
        
        if(this.worldFriendBg)
        {
            var animationWorld;
            var animationFriend;
            var animationBg;
            var tiem = 0.3;

            if(this.worldFriendBg.scaleX == 1)
            {//如果是展开的状态就缩进
                //世界排行榜按钮的移动
                animationWorld = cc.moveTo(tiem,cc.v2(0,this.worldBtn.node.y));
                
                //好友排行榜的移动
                animationFriend = cc.moveTo(tiem,cc.v2(0,this.friendBtn.node.y));
                
                //好友排行榜 和 世界排行榜背景框的缩进
                animationBg = cc.scaleTo(tiem,0,1);
                

            }else if(this.worldFriendBg.scaleX == 0)
            {//如果缩进状态就展开
                //世界排行榜按钮的移动
                animationWorld = cc.moveTo(tiem,cc.v2(-150,this.worldBtn.node.y));
                //好友排行榜的移动
                animationFriend = cc.moveTo(tiem,cc.v2(150,this.friendBtn.node.y));
                //好友排行榜 和 世界排行榜背景框的缩进
                animationBg = cc.scaleTo(tiem,1,1);
            }

            this.worldBtn.node.runAction(animationWorld);
            this.friendBtn.node.runAction(animationFriend);
            this.worldFriendBg.runAction(animationBg);
        }
    },

    //点击广告按钮
    onClickAdvertisingBtn:function(){

    },

    // update (dt) {},
});
