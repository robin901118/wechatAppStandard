export default class transLocation{
  constructor(){
    this.xPi = 3.14159265358979324 * 3000.0 / 180.0;
  }

  /**
   * 腾讯地图坐标转换百度地图坐标
   * @param lng 经度
   * @param lat 纬度
   * */
  toBmap(lng,lat){
    let z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * this.xPi);
    let theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * this.xPi);
    return {
      lng: z * Math.cos(theta) + 0.0065.toFixed(6),
      lat: z * Math.sin(theta) + 0.006.toFixed(6)
    }
  }

  /**
   * 百度地图坐标转腾讯地图坐标
   * @param lng 经度
   * @param lat 纬度
   * */
  toQQmap(lng,lat){
    let z = Math.sqrt(lng - 0.0065 * lng - 0.0065 + lat - 0.006 * lat - 0.006) - 0.00002 * Math.sin(lat - 0.006 * this.xPi);
    let theta = Math.atan2(lat - 0.006, lng - 0.0065) - 0.000003 * Math.cos(lng - 0.0065 * this.xPi);
    return {
      lng: z * Math.cos(theta).toFixed(6),//后台控制为小数点后6位
      lat: z * Math.sin(theta).toFixed(6)//后台控制为小数点后6位
    }
  }

}










