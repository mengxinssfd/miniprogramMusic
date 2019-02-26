export function jsonp(url, data, callback) {
  return new Promise((resolve, reject) => {
    wx.request({
      method: 'get',
      dataType: 'jsonp',
      data: data,
      url,
      success(data) {
        let dt = data.data;
        if (dt && callback && dt.indexOf(callback) > -1) {
          let result = dt.replace(callback + '(', '').slice(0, -1);
          resolve(JSON.parse(result));

        } else {
          switch (typeof dt) {
            case 'string':
              resolve(JSON.parse(dt));
              break;
            case 'object':
              resolve(dt);
              break;
            default:
              reject();
          }
        }
      },
      fail() {
        reject();
      },
    });
  });
}
