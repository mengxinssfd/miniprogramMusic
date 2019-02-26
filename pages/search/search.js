// pages/search/search.js
import {getHotKey, getSearch} from '../../api/search';
import {debounce} from '../../common/js/util';
import {Song} from '../../common/js/song';
import {Singer} from '../../common/js/singer';
import {createSongFromSearch} from '../../common/js/song';
import {eventBus, eventType} from '../../common/js/evenBus';

const TYPE_SINGER = 1;
const TYPE_ALBUM = 2;
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
      console.log('showssssssssssssssssssssssssssssss');
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 3,
        });
      }
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    hotKey: [],
    searchValue: '',
    searchValueNotEmpty: false,
    songs: [],
    zhida: {},
    searchHistory: [],
    loading: false,
    hasLoadAll: false,
    page: 1,
  },
  ready() {
    console.log('show', this.data.show);
    getHotKey().then(dt => {
      console.log(dt);
      this.setData({
        hotKey: dt.data.hotkey.slice(0, 10).sort((a, b) => a.k.length > b.k.length),
      });
    });
    this.searchDebounce = debounce(() => {
      this.search();
    }, 500);
    try {
      const searchHistory = wx.getStorageSync('searchHistory');
      if (searchHistory && Array.isArray(searchHistory)) {
        this.setData({
          searchHistory,
        });
      }
    } catch (e) {
      console.log('read storage error');
    }
  },
  observers: {
    searchValue: function (n, o) {
      console.log(n, o);
      if (n === undefined || (o !== undefined && n.trim() === o.trim())) return;
      this.setData({
        searchValueNotEmpty: !!n.length,
        page: 1,
        zhida: {},
        songs: [],
        loading: true,
      });
      n && this.searchDebounce();
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindSearchInput(e) {
      this.setData({
        searchValue: e.detail.value,
      });
    },
    tapSearchClear() {
      this.setData({
        searchValue: '',
      });
    },
    tapHistory(e) {
      this.setData({
        searchValue: e.currentTarget.dataset.text,
      });
    },
    tapHistoryDelete(e) {
      let target = e.currentTarget.dataset.text;
      try {
        const searchHistory = wx.getStorageSync('searchHistory');
        if (searchHistory && Array.isArray(searchHistory)) {
          let index = searchHistory.findIndex(i => i === target);
          searchHistory.splice(index, 1);
          this.data.searchHistory.splice(index, 1);
          this.setData({
            searchHistory: this.data.searchHistory,
          });
          wx.setStorageSync('searchHistory', searchHistory);
        }
      } catch (e) {
        console.error('storage error');
      }
    },
    tapClearHistory() {
      try {
        this.setData({
          searchHistory: [],
        });
        wx.setStorageSync('searchHistory', []);
      } catch (e) {
        console.error('storage error');
      }
    },
    saveHistory(value) {
      let data = [value];
      try {
        const searchHistory = wx.getStorageSync('searchHistory');
        if (searchHistory && Array.isArray(searchHistory) && searchHistory.length) {
          let result = [...new Set(data.concat(searchHistory))];
          if (result.length > 10) result.pop();
          this.data.searchHistory = result;
          wx.setStorageSync('searchHistory', result);
        } else {
          wx.setStorageSync('searchHistory', [value]);
          this.data.searchHistory.unshift(value);
        }
        this.setData({
          searchHistory: this.data.searchHistory,
        });
      } catch (e) {
        console.error('storage error');
      }
    },
    filterSearchData(data) {
      let zhida = data.zhida;
      let newZhida = {};
      let hasLoadAll = false;
      if (zhida.type === TYPE_SINGER && !this.data.zhida.singer) {
        newZhida.singer = new Singer(zhida.zhida_singer.singerID, zhida.zhida_singer.singerMID, zhida.zhida_singer.singerName);
      } else if (zhida.type === TYPE_ALBUM) {
        newZhida.album = zhida.zhida_album;
      }
      if (data.song.list.length === 0 || data.song.curnum < 20) {
        hasLoadAll = true;
      }
      for (let song of data.song.list) {
        if (song.interval > 0) {
          this.data.songs.push(createSongFromSearch(song));
        }
        for (let subSong of song.grp) {
          if (subSong.interval > 0) {
            this.data.songs.push(createSongFromSearch(subSong));
          }
        }
      }

      this.setData({
        zhida: newZhida,
        songs: this.data.songs,
        loading: false,
        hasLoadAll,
      });

    },
    // 滚到底加载更多
    onEnd() {
      if (this.data.hasLoadAll || this.data.loading) return;
      this.setData({
        page: this.data.page + 1,
        loading: true,
      });
      this.searchDebounce();
    },
    search() {
      let value = this.data.searchValue;
      value = value.trim();
      this.saveHistory(value);
      getSearch(value, this.data.page, 1).then(dt => {
        let data = dt.data;
        this.filterSearchData(data);
      });

    },
    tapHotKey(e) {
      let v = e.currentTarget.dataset.value || '';
      this.setData({
        searchValue: v.trim(),
      });
    },
    tapSinger() {
      let singer = this.data.zhida.singer;
      eventBus.emit(eventType.tapSinger, {
        mid: singer.mid,
        name: singer.name,
      });
    },
  },
});
