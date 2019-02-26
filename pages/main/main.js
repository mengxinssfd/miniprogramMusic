// pages/main/main.js
import {eventBus, eventType} from '../../common/js/evenBus';
import {getSongList} from '../../api/singer';
import {createSong} from '../../common/js/song';
import {getRankDetail} from '../../api/rank';
import {audioCtr} from '../../common/js/audio';

let PER_PAGE_COUNT = 30;
let ERR_OK = 0;
Page({
  data: {
    tabIndex: 0,
    switch: {
      // recommend: true,
      singer: true,
      top: false,
      search: false,
      songList: false,
      playList: false,
    },
    singerMid: '',
    songListTitle: '',
    songs: [],
    songListType: 'singer',
    total: 0,
    hasLoadAll: false,
    loading: false,
    top: {
      id: '',
      date: '',
      type: '',
    },
    playList: [],
  },
  onTabChange(e) {
    console.log('index', e.detail.index);
    let index = e.detail.index;
    let sw = 'switch.' + [/*'recommend',*/ 'singer', 'top', 'search'][index];
    this.setData({
      [sw]: true,
      tabIndex: e.detail.index,
    });
  },
  getSongFromTop(id, date, type) {
    getRankDetail(id, date, type).then((res) => {
      if (res.code === ERR_OK) {
        let songs = [];
        for (let song of res.songlist) {
          if (song.data.interval > 0) {
            songs.push(createSong(song.data));
          }
        }
        this.setData({
          songs,
          total: songs.length,
          loading: false,
        });
      }
    });
  },
  getSongFromSinger(id, start, count = PER_PAGE_COUNT) {
    getSongList(id, start, count).then((res) => {
      if (res.code === ERR_OK) {
        this._songsFilter(res);
      }
    });
  },
  _songsFilter(res) {
    let newArr = [];
    let total = 0;
    let hasLoadAll = false;
    for (let item of res.data.list) {
      let {musicData} = item;
      if (musicData.interval > 0) {
        newArr.push(createSong(musicData));
      }
    }

    if (this.data.total === 0) {
      total = res.data.total;
    }

    if (res.data.list.length < PER_PAGE_COUNT) {
      hasLoadAll = true;
    }

    if (newArr.length === 0) {
      return;
    }

    this.setData({
      songs: this.data.songs.concat(newArr),
      total,
      loading: false,
      hasLoadAll,
    });

  },
  tapSongListBack() {
    this.setData({
      'switch.songList': false,
    });
  },
  tapPlayListBack() {
    this.setData({
      'switch.playList': false,
    });
  },
  onEnd() {
    console.log('end');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    eventBus.on(eventType.tapSinger, opt => {
      if (this.data.singerMid === opt.mid) {
        this.setData({'switch.songList': true});
        return;
      }
      this.setData({
        'switch.songList': true,
        singerMid: opt.mid,
        songListTitle: opt.name,
        songListType: 'singer',
        songs: [],
        total: 0,
        loading: true,
        isPlayList: false,
      });
      this.getSongFromSinger(this.data.singerMid, this.data.songs.length);
    });
    eventBus.on(eventType.tapTop, opt => {
      let top = this.data.top;
      if (top.id === opt.id && top.type === opt.type && top.date === opt.date) {
        this.setData({'switch.songList': true});
        return;
      }
      this.setData({
        'switch.songList': true,
        singerMid: '',
        songListTitle: opt.name,
        songListType: 'top',
        songs: [],
        total: 0,
        hasLoadAll: true,
        loading: true,
        isPlayList: false,
      });
      this.getSongFromTop(opt.id, opt.date, opt.type);
    });
    eventBus.on(eventType.tapPlayList, opt => {
      if (this.data.switch.playList) {
        this.setData({'switch.playList': false});
        return;
      }
      this.setData({
        'switch.playList': true,
        'playList': audioCtr.playList,
      });
    });
    eventBus.on(eventType.switch, opt => {
      this.setData({
        [opt.switch]: opt.flag,
      });
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
});