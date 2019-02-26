import {jsonp} from '../common/js/jsonp';
import {options} from './config';

/**
 *获取歌手列表
 * @returns {Promise<any>}
 */
export function getSingerList() {
  let url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';
  let opt = {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
  };

  return jsonp(url, opt);
}

/**
 *获取某个歌手的歌曲列表
 * @param singerid
 * @param begin
 * @param count
 * @returns {Promise<any>}
 */
export function getSongList(singerid, begin, count) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
  let opt = {
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    singermid: singerid,
    order: 'listen',
    // begin: 0,
    begin,
    // num: 30,
    num: count,
    songstatus: 1,
  };
  return jsonp(url, opt);
}
