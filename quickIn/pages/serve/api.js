import HttpClient from './HttpClient';

const baseServer = '';// 服务地址

/*********************** Demo ************************ */  
/** *
 * 查询事例 
 async queryList(params) {
  wx.showLoading({ title: '加载中' }); // 提示文字
  try {
    const params = {};// 需要传入的参数
      const {
          data
      } = await api.get(params); // 请求返回的数据
      if (data.code !== 200) return; // 判断是都成功
      this.setData({ 
          list: data
      }); // 渲染到DOM，重新赋值并且刷新
  } catch (error) {
      wx.showToast({
          title: '加载失败',
          icon: 'none'
      }); // 加载失败
  } 
  wx.hideLoading(); // 隐藏提示
},
  */
/* get 方法*/
export function get(params) { 
    const url = baseServer + '';
    return new HttpClient(url).get(`/${params}`);
}


/* post 方法*/
export async function post(params) {
    const client = new HttpClient(baseServer);
    const { data } = await client.post(url, params);
    return data ;
}

