// pages/top/top.js
import {getRank} from '../../api/rank';

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
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 2,
        });
      }
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    topList: [],
  },

  ready() {
    getRank().then(dt => {
      this.setData({
        topList: dt,
      });
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {},
});
