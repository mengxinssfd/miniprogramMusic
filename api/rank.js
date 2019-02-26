import {jsonp} from '../common/js/jsonp';
import {options} from './config';

export function getRank() {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_opt.fcg';
  let data = {
    page: 'index',
    format: 'html',
    tpl: 'macv4',
    v8debug: 1,
  };

  return jsonp(url, data, 'jsonCallback');
}

export function getRankDetail(id, date, type) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg';
  let data = {
    tpl: 3,
    page: 'detail',
    date,
    topid: id,
    type,
    song_begin: 0,
    song_num: 30,
    g_tk: 779431826,
    // jsonpCallback:'MusicJsonCallbacktoplist',
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
  };
  return jsonp(url, data);
}

export function getRankMV(id, date) {
  let url = 'https://c.y.qq.com/mv/fcgi-bin/fcg_musicshow_mvtoplist.fcg';
  let data = {
    format: 'jsonp',
    g_tk: 779431826,
    jsonpCallback: 'MusicJsonCallback9292577050577391',
    loginUin: 2985858818,
    hostUin: 0,
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    listtype: 'all',
    listid: 'all_musicshow_mvtoplist_current_new',
  };
  return jsonp(url, data);
}
