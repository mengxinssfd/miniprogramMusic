import {
  commonParams,
  useMyServer,
} from './config.js';
import {jsonp} from '../common/js/jsonp';

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
    uin: 0,
  });
  // return jsonp(url, data, options);
  return jsonp(url, data);
}

export function getDiscList(start, end) {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
  let opt = {
    picmid: 1,
    rnd: Math.random(),
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    jsonpCallback: 'callback',
    platform: 'yqq',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    /* sin: 0,
    ein: 29, */
    sin: start,
    ein: end,
    format: 'json',
  };
  let referer = 'https://y.qq.com/n/yqq';
  const data = Object.assign({}, commonParams, opt);
  return useMyServer({url, data, referer});
}