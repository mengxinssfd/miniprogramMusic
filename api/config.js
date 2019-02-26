export const commonParams = {
  g_tk: 5381,
  inCharset: 'utf8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp',
};
export const options = {
  param: 'jsonpCallback',
};
export const ERR_OK = 0;

export const config = {
  // url: 'http://144.34.134.243:3000/test'
  url: 'https://weizwan.com:9999',
};

/**
 *
 * @param data
 * @returns {string}
 */
export function paramJoin(data) {
  let url = '';
  for (let key in data) {
    url += `&${key}=${encodeURIComponent(data[key])}`;
  }
  return url ? url.substring(1) : '';
}

export function useMyServer({data, url, referer}) {
  url = url + '?' + paramJoin(data);
  return new Promise((resolve, reject) => {
    wx.request({
      method: 'post',
      dataType: 'json',
      data: {url, referer},
      url: config.url,
      success(data) {
        let dt = data.data;
        dt ? resolve(JSON.parse(dt)) : reject();
      },
      fail() {
        reject();
      },
    });
  });
}