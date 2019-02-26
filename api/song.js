import {jsonp, paramJoin} from '../common/js/jsonp';

export function getVkey(mid) {
  let url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg';
  let data = {
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    cid: 205361747,
    uin: 0,
    songmid: mid,
    filename: 'C400' + mid + '.m4a',
    guid: 4714956536,
  };

  return jsonp(url, data, 'callback');
}

export function vkeyFilter(mid) {
  let vkey = '';
  getVkey(mid).then((res) => {
    vkey = res.data.items[0].vkey;
  });
  return vkey;
}

