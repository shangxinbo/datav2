<template>
    <div class="view-warp03">
        <div class="view-content">
            <div class="ppt-left">
                <ul>
                    <li>
                        <span>客户聚类</span>
                        <span>流失预警</span>
                    </li>
                    <li>
                        <span>交叉营销</span>
                        <span>沉默激活</span>
                    </li>
                </ul>
                <img class="view-arrow" :src="arrow" />
                <p>存量客户行为标签匹配</p>
                <div class="view-jigsaw">
                    <span>行内属性</span>
                    <span>行外行为</span>
                    <img :src="jigsaw" />
                </div>
            </div>
            <div class="ppt-center">
                <dl>
                    <dt>异常社交行为</dt>
                    <dd>用户是否加入赌博、养卡、借贷、薅羊毛类
                        <br />QQ群或者浏览贷款类百度贴吧</dd>
                </dl>
                <dl>
                    <dt>异常线上行为</dt>
                    <dd>用户浏览搜索逾期套现、赌博、卖血
                        <br />卖肾等网站和关键词，手机上经常使用
                        <br />多个贷款分期类APP </dd>
                </dl>
                <dl>
                    <dt>是否有真实消费意愿</dt>
                    <dd>用户在借贷前是否有真实消费场景意愿，
                        <br />例如买车、买房、家装、美容等</dd>
                </dl>
                <dl>
                    <dt>异常线下行为</dt>
                    <dd>用户常驻位置不固定，经常出入
                        <br />2000+个欺诈人群高危地区</dd>
                </dl>
                <dl>
                    <dt>疑似羊毛党等恶意用户</dt>
                    <dd>通过分析用户申请时间、实时位置以多维
                        <br />通讯上网行为，有效识别恶意申请用户</dd>
                </dl>
                <dl>
                    <dt>三方申请记录</dt>
                    <dd>用户在其他借贷平台或信用卡
                        <br />中心是否有过多次申请记录</dd>
                </dl>
                <dl>
                    <dt>千万级黑名单库</dt>
                    <dd>千万级的欺诈逾期黑名单库，百万级的
                        <br />运营商恶意欠费黑名单库</dd>
                </dl>
                <dl>
                    <dt>异常通讯行为</dt>
                    <dd>用户是否被催收过、是否与
                        <br />贷款公司主动联系过、是否
                        <br />与公安司法等机构联系过</dd>
                </dl>
                <dl>
                    <dt>公检法执行信息</dt>
                    <dd>法院执行、法院失信、催收公告、
                        <br />网贷逾期等信息</dd>
                </dl>
                <div class="view-lamp">
                    <img :src="lamp" />
                    <img :src="lamp02" />
                    <p>反欺诈
                        <br />规则集</p>
                </div>
            </div>
            <div class="ppt-right">
                <dl>
                    <dt>行为
                        <br />稳定性</dt>
                    <dd>手机在网时长：6年
                        <br />在网手机号码：2
                        <br />终端使用时间：2年4个月
                        <br />近12个月通话频次：稳定
                        <br />短期网络兴趣：种子、化肥、农药
                        <br />金融标签：查询银行贷款
                        <br />短期电话异动：拨打农信社客服 3次</dd>
                </dl>
                <dl>
                    <dt>用户基本
                        <br />特征 </dt>
                    <dd>位置：黑龙江省鸡西市
                        <br />年龄：30-35岁
                        <br />家庭：有一幼儿
                        <br />手机套餐：预付费，50套餐
                        <br />客户行业：农民
                        <br />客户等级：中等
                        <br />用户上网偏好：偏少</dd>
                </dl>
                <dl>
                    <dt>社交
                        <br />活跃度</dt>
                    <dd>上月手机通话人数：较多
                        <br />上月手机通话频次：中档
                        <br />主叫人分布：80%本地、20%外地
                        <br />被叫人分布：90%本地、10%外地
                        <br />微博：少 关注：5 粉丝：2
                        <br />微信使用：频繁
                        <br />微博能力标签、兴趣标签</dd>
                </dl>
                <dl>
                    <dt>履约能力</dt>
                    <dd>12个月预缴费次数：12
                        <br />12个月预缴费总金额：中档
                        <br />12个网络还款次数：10
                        <br />12个月网络还款总金额：中档
                        <br />12个月用卡支付次数：3次
                        <br />不在信贷关注名单</dd>
                </dl>
                <dl>
                    <dt>金融属性</dt>
                    <dd>XX银行客户
                        <br />每月登陆4次银行app
                        <br />是否喜好股票：否
                        <br />是否投资：否
                        <br />是否理财：是
                        <br />最近查看信用卡网站：经常
                        <br />其它银行信息：有农信社、建行账户
                        <br />黑名单纪录：无</dd>
                </dl>
                <dl>
                    <dt>消费能力</dt>
                    <dd>月消费档次：中等
                        <br />订购电信服务数目：3项
                        <br />订购移动服务数目：8项
                        <br />订购联通服务项目：0
                        <br />3个月交易总笔数：23
                        <br />3个月交易总金额：中档</dd>
                </dl>
                <div class="view-farmer">
                    <img :src="farmer" />
                    <p>农民画像</p>
                </div>
            </div>
        </div>
        <img class="view-bg03" :src="bg03" />
    </div>
</template>
<script>
    import arrow from 'assets/img/view-arrow.png'
    import jigsaw from 'assets/img/view-jigsaw.png'
    import lamp from 'assets/img/view-lamp.png'
    import lamp02 from 'assets/img/view-lamp02.png'
    import farmer from 'assets/img/view-farmer.png'
    import bg03 from 'assets/img/view-bg03.jpg'
    export default {
        data(){
            return {
                arrow,
                jigsaw,
                lamp,
                lamp02,
                farmer,
                bg03
            }
        }
    }
</script>