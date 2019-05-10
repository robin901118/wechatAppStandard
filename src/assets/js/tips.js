
/**
 * 提示与加载工具类
 */
export default class Tips {
  constructor() {
    this.isLoading = false;
  }

  /**
   * 弹出确认窗口
   */
  confirm(config = {}) {
    return new Promise((resolve, reject) => {
      let obj = config;
      obj.success = (res)=>{
        if (res.confirm) {
          resolve(true);
        } else if (res.cancel) {
          resolve(false);
        }
      };
      obj.fail = ()=>{
        reject('modalFail');
      };
      wx.showModal(obj);
    });
  }

  /**
   * 弱提示
   */
  toast(title, icon = "success", onHide) {
    let config = {
      title: title,
      icon: icon,
      mask: true,
      duration: 1000
    };
    //失败
    if(icon === 'fail'){
      delete config['icon'];
      config['image'] = '../assets/image/fail.png';
    }
    //警告
    if(icon === 'warning'){
      delete config['icon'];
      config['image'] = '../assets/image/warning.png';
    }


    setTimeout(() => {
      wx.showToast(config);
    }, 0);

    // 隐藏结束回调
    if (onHide) {
      setTimeout(() => {
        onHide();
      }, 1000);
    }
  }

  /**
   * 状态栏加载
   */
  loading() {
    if (Tips.isLoading) {
      return;
    }
    Tips.isLoading = true;
    wx.showNavigationBarLoading();//状态栏loading
  }

  /**
   * 状态栏加载完毕
   */
  loaded() {
    if (Tips.isLoading) {
      Tips.isLoading = false;
      wx.hideNavigationBarLoading();//状态栏隐藏loading
    }
  }
}
