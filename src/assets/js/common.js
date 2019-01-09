/**
 * 腾讯地图坐标转换百度地图坐标
 * @param lng 经度
 * @param lat 纬度
 * */
const toBMapLocation = (lng, lat) => {
  let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
  let x = lng;
  let y = lat;
  let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
  let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
  let lngs = z * Math.cos(theta) + 0.0065;
  let lats = z * Math.sin(theta) + 0.006;
  return {
    lng: lngs.toFixed(6),//后台控制为小数点后6位
    lat: lats.toFixed(6)//后台控制为小数点后6位
  }
};

/**
 * 百度地图坐标转腾讯地图坐标
 * @param lng 经度
 * @param lat 纬度
 * */
const toQQMapLocation = (lng, lat) => {
  let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
  let x = lng - 0.0065;
  let y = lat - 0.006;
  let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
  let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
  let lngs = z * Math.cos(theta);
  let lats = z * Math.sin(theta);
  return {
    lng: lngs.toFixed(6),//后台控制为小数点后6位
    lat: lats.toFixed(6)//后台控制为小数点后6位
  }
};

export {
  toBMapLocation,
  toQQMapLocation
}











