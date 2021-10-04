// 基准大小
const baseSize = 32;
const baseWidth=750;
const minRate = 1.6;
// 设置 rem 函数
function setRem() {
  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
  const realClientWidth= document.documentElement.clientWidth;
  const realClientHeight= document.documentElement.clientHeight;
  let clientWidth =  realClientWidth;
  if((realClientHeight/realClientWidth)<minRate){
    clientWidth=Math.round(realClientHeight/minRate);
    document.body.style.margin='auto';
    document.body.style.width=`${clientWidth}px`;
  }else{
    document.body.style.margin='0';
    document.body.style.width='100%';
  }
  const scale = clientWidth / baseWidth;
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = `${
    baseSize * Math.min(scale, 2)
  }px`;

}
// 初始化setRem();
// 改变窗口大小时重新设置 rem
setRem();
window.onresize = () => {
  setRem();
};

function perLoading() {
  const oPerLoading = document.querySelector(".pre-loading");
  oPerLoading.innerHTML="正在加载游戏资源".split("").map((m)=>{
    return `<span>${m}</span>`
  }).join("");
}
perLoading();
