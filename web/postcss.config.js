module.exports = {
  plugins: {
    "postcss-pxtorem": {
      rootValue: 16, //结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
      propList: ["*"], //是一个存储哪些将被转换的属性列表，这里设置为['*']全部，假设需要仅对边框进行设置，可以写['*', '!border*']
      unitPrecision: 5, //保留rem小数点多少位
      //selectorBlackList: ['.radius'],  //则是一个对css选择器进行过滤的数组，比如你设置为['fs']，那例如fs-xl类名，里面有关px的样式将不被转换，这里也支持正则写法。
      mediaQuery: false, //媒体查询( @media screen 之类的)中不生效
      minPixelValue: 12 //px小于12的不会被转换
    }
  }
};
// 蓝湖上设计稿自定义为375px 测量值直接写入即可 若设计稿为750px 则rootValue: 32
