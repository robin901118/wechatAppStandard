import {wxRequest} from './wxRequest';

const getData = p => wxRequest('POST','/getData',p,false);//获取数据

export {
  getData
}




