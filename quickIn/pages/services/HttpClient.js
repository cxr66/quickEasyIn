
class HttpClient {
  _server;
  _xhr;

  constructor(server) {
      this._server = server;
  }

  _init(name, options, method) {
      let data = '', contentType = '';
      let url = this._server + name;
      if (options.query) {
          const arr = [];
          for (let key in options.query) {
              arr.push(`${key}=${options.query[key]}`);
          }
          url += (/\?/.test(url) ? '&' : '?') + arr.join('&');
      }
      if (options.json) {
          contentType = 'application/json;charset=utf-8';
          data = JSON.stringify(options.json);
      }
      if (options.form) {
          contentType = 'application/x-www-form-urlencoded;charset=utf-8';
          data = JSON.stringify(options.form);
      }
      return new Promise((resolve, reject) => {
          this._xhr = wx.request({
              url,
              method,
              data,
              responseType: options.responseType,
              header: {
                  'content-type': contentType,
                  ...options.headers,
              },
              success: (res) => {
                  delete this._xhr;
                  if (res.statusCode === 200) {
                      resolve(res);
                  } else {
                      reject(res);
                  }
              },
              fail: (err) => {
                  delete this._xhr;
                  reject(new Error(err.errMsg));
              },
              complete: () => {
                  delete this._xhr;
              },
          });
      });
  }

  get(name, options = {}) {
      return this._init(name, options, 'GET');
  }

  post(name, options = {}) {
      return this._init(name, options, 'POST');
  }

  put(name, options = {}) {
      return this._init(name, options, 'PUT');
  }

  delete(name, options = {}) {
      return this._init(name, options, 'DELETE');
  }

  cancel() {
      this._xhr && this._xhr.abort();
  }
}

export default HttpClient;
