import tips from './tips';
import wepy from 'wepy';

class Http extends tips{
  constructor(basePath){
    super();
    this.BaseUrl = basePath;
  }

  /**
   * 错误弹窗提示
   * @param error 错误信息
   * @param confirmCallBack 点击确定执行方法
   * 如果返回的是字符串错误信息则进行弹窗提示
   * */
  errorPop(error,confirmCallBack){
    if (typeof error === 'string') {
      this.confirm({
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
  ajax({url, data, method = 'GET'}){
    console.log('ajax');
    return new Promise((resolve, reject) => {
      //判断当前网络状态
      if(!wepy.$instance.globalData.isConnected){
        this.toast('无网络','fail');
        reject(false);
        return;
      }

      this.loading();//打开loading
      wepy.$instance.globalData.nowRequest = wx.request({
        url: `${this.BaseUrl}${url}`,
        method: method,
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'cookie': wx.getStorageSync('SESSION')
        },
        data: data,
        success: (res) => {
          let result = res['data'];
          if (!result.hasOwnProperty('_code')) {
            this.errorPop('后台维护中,请稍后再试');
            reject(false);
            return;
          }
          if (result['_code'] === '99999') {
            result.hasOwnProperty('_result') ? resolve(result['_result']) : resolve(true);
          }
          else if(result['_code'] === '20001'){
            //未登录状态
            this.errorPop(result['_msg'],function(){
              wepy.$instance.publicLoginOut();//登出操作
            });
            reject(false);
          }else{
            this.errorPop(result['_msg']);
            reject(false);
          }
        },
        fail: (e) => {
          this.errorPop(e);
          reject(false);
        },
        complete: () => {
          this.loaded();//关闭loading
          wepy.$instance.globalData.nowRequest = null;
        }
      });
    });
  }
}

export default new Http(wepy.$instance.globalData.baseUrl);
