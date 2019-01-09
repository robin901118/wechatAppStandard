import {wxRequest} from './wxRequest';

const signApi = p =>wxRequest('/api',p,'POST');//手动签到（带队管理员代签）

export {
  signApi
}




