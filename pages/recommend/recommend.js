// pages/recommend/recommend.js
import {getRecommend, getDiscList} from '../../api/recommend';
import {audioCtr} from '../../common/js/audio';

const LENGTH = 30;
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
    slider: [],
    songList: [],
    current: 0,
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0,
        });
      }
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onSwiperChange(e) {
      const changeType = {
        touch() {
          this.setData({
            current: e.detail.current,
          });
        },
      };
      changeType.autoplay = changeType.touch;
      let fn = changeType[e.detail.source];
      fn && fn.apply(this);
    },
    tapDot(e) {
      this.setData({
        current: e.currentTarget.dataset.index || 0,
      });
    },
    getSongListList() {
      let start = this.data.songList.length > 0 ? this.data.songList.length : 0;
      let end = this.data.songList.length > 0 ? this.data.songList.length + LENGTH - 1 : LENGTH - 1;
      getDiscList(start, end).then(dt => {
        let data = dt.data;
        console.log(data);
      });
    },
    getRecommend() {
      getRecommend().then(dt => {
        let data = dt.data;
        console.log(data);
        this.setData({
          slider: data.slider,
        });
      });
    },
  },
  ready() {
    this.getRecommend();
    this.getSongListList();
  },
});
