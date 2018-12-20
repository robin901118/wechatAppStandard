import wepy from 'wepy';
import tip from './tips'

const baseUrl = 'https://www.easy-mock.com/mock/5c063e891a285344e0eeb035/api';//请求链接

/**
 * 通用请求方法
 * @params type 请求方式（GET|POST）
 * @params url  请求链接
 * @params data 请求参数
 * @params needLoading 是否需要加载
 * */
const wxRequest = async (type = 'GET', url, data, needLoading = true) => {
  if (needLoading) tip.loading();//打开loading
  let res = await wepy.request({
    url: baseUrl + url,
    method: type,
    data: data,
    header: {'Content-Type': 'application/json'}
  });
  if (needLoading) tip.loaded();//关闭loading
  return res['data'];
};

/**
 * 判断是否登录
 * */
const isLogin = () => {
  return new Promise(resolve => {
    wx.getStorage({
      key: 'isLogin',
      success(res) {
        if (res['data']) {
          resolve(true);
        } else {
          resolve(false);
        }
      },
      fail() {
        /*已经登出*/
        resolve(false);
      }
    });
  });

};


module.exports = {
  baseUrl,
  wxRequest,
  isLogin
};
