// pages/singer/singer.js
import {getSingerList} from '../../api/singer';
import {Singer} from '../../common/js/singer';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    singerList: [],
  },
  ready() {
    getSingerList().then(dt => {
      console.log(dt);
      let singers = dt.data.list.map(item => {
        let id = item.Fsinger_id;
        let mid = item.Fsinger_mid;
        let name = item.Fsinger_name;
        return new Singer(id, mid, name);
      });

      this.setData({
        singerList: singers,
      });
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {},
});
