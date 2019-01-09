import tip from './tips';
import wepy from 'wepy';

/**
 * 错误弹窗提示
 * @param error 错误信息
 * @param confirmCallBack 点击确定执行方法
 * 如果返回的是字符串错误信息则进行弹窗提示
 * */
const errorPop = (error,confirmCallBack) => {
  if (typeof error === 'string') {
    tip.confirm({
      title: '温馨提示',
      content: error,
      showCancel: false,
      confirmText: '我知道了',
      confirmColor: '#ff507d'
    }).then(() => {
      if(confirmCallBack){
        confirmCallBack();
      }
    });
  } else {
    console.log(error);
  }
};

/**
 * 通用请求方法
 * @params url  请求链接
 * @params data 请求参数
 * @params type 请求方式（GET|POST）
 * @params needLoading 是否需要加载
 * */
const wxRequest = (url, data, type = 'GET') => {
  return new Promise((resolve, reject) => {
    tip.loading();//打开loading
    wepy.$instance.globalData.nowRequest = wx.request({
      url: `${wepy.$instance.globalData.baseUrl}${url}`,
      method: type,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': wx.getStorageSync('SESSION')
      },
      data: data,
      success: (res) => {
        let result = res['data'];
        if (!result.hasOwnProperty('_code')) {
          errorPop('后台维护中,请稍后再试');
          reject(false);
          return;
        }
        if (result['_code'] === '99999') {
          result.hasOwnProperty('_result') ? resolve(result['_result']) : resolve(true);
        }
        else if(result['_code'] === '20001'){
          //未登录状态
          errorPop(result['_msg'],function(){
            wepy.$instance.publicLoginOut();//登出操作
          });
          reject(false);
          return;
        }else{
          errorPop(result['_msg']);
          reject(false);
          return;
        }
      },
      fail: (e) => {
        errorPop(e);
        reject(false);
      },
      complete: () => {
        tip.loaded();//关闭loading
        wepy.$instance.globalData.nowRequest = null;
      }
    });
  });
};


module.exports = { wxRequest };
