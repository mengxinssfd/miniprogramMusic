import {jsonp} from '../common/js/jsonp';

export function getHotKey() {
  let url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';
  let data = {
    g_tk: 5381,
    // jsonpCallback:hotSearchKeysmod_top_search,
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    jsonpCallback: 'callback',
  };

  return jsonp(url, data, 'callback');
}

export function getSearch(word, page, zhida) {
  let url = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp';
  let data = {
    ct: 24,
    qqmusic_ver: 1298,
    new_json: 1,
    // remoteplace: 'txt.yqq.center',
    remoteplace: 'sizer.yqq.song_next',
    // searchid: 47384604720652066,
    t: 0,
    aggr: 1,
    cr: 1,
    // catZhida: 1,
    catZhida: zhida,
    lossless: 0,
    flag_qc: 0,
    p: page, // page
    n: 20, // number
    // w:说散就散,
    w: word,
    g_tk: 5381,
    // jsonpCallback:MusicJsonCallback8246632683754749
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
  };

  return jsonp(url, data, 'callback');
}
