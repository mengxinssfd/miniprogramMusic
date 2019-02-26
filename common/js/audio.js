import {eventBus, eventType} from './evenBus';
import {getVkey} from '../../api/song';
import {ERR_OK} from './const';
import {debounce} from './util';

// const audio = getApp().globalData.audio;
const audio = wx.getBackgroundAudioManager();
const audioCtr = {
  audio,
  playList: [],
  nextPlayList: [],
  currentSong: {},
  _playMode: 'queue',// queue or random
  songSwitch(song) {
    if (!song) return;
    console.log(song);
    if (!song.url) {
      getVkey(song.mid).then((res) => {
        let url = '';
        if (res.code === ERR_OK) {
          let vkey = res.data.items[0].vkey;
          if (vkey) {
            url = 'http://dl.stream.qqmusic.qq.com/C400' + song.mid + '.m4a' + '?vkey=' + vkey + '&guid=4714956536&fromtag=66';
          } else {
            url = song.secondUrl;
          }
        } else {
          url = song.secondUrl;
        }
        song.url = url;
        this._setAudio(song);
      });
      return;
    }
    this._setAudio(song);
  },
  _setAudio(song) {
    let {name, singer, url, image: coverUrl} = song;
    audio.title = name;
    audio.epname = name;
    audio.singer = singer;
    audio.coverImgUrl = coverUrl;
    // 设置了 src 之后会自动播放
    audio.src = url;

    console.log('switch song');
    if (this.currentSong.id === song.id) return;
    this.currentSong = song;
    eventBus.emit(eventType.audio.change, song);
    this._saveToStorage('currentSong', song);
  },
  setPlayMode(mode) {
    this._playMode = mode;
  },
  playPrev() {
    if (!this.playList.length) return;
    if (this._playMode === 'queue') {
      let index = this.playList.findIndex(item => item.id === this.currentSong.id);
      index = index === 0 ? this.playList.length - 1 : index - 1;
      this.songSwitch(this.playList[index]);
    }
  },
  play() {
    audio.play();
  },
  pause() {
    audio.pause();
  },
  emitPlayListChange() {
    eventBus.emit(eventType.playListChange, '');
  },
  addSongListToPlayList(list) {
    let newList = list.filter(i => {
      let some = this.playList.some(item => item.id === i.id);
      return !some && !i.payplay;
    });
    if (!newList.length) return;
    wx.showToast({
      title: `添加${newList.length}首歌曲`,
      icon: 'success',
      duration: 2000,
    });
    this.playList.unshift.apply(this.playList, newList);
    this._saveToStorage('playList', this.playList);
    // console.log('play yyyyyy', newList[0]);
    if (audio.paused === undefined || audio.paused) {
      this.songSwitch(newList[0]);
    }
  },
  deleteSongListFromPlayList(list) {
    if (!list.length) return;
    list.forEach(item => {
      let index = this.playList.findIndex(i => i.id === item.id);
      if (index > -1) {
        this.playList.splice(index, 1);
      }
    });
    this._saveToStorage('playList', this.playList);
  },
  playNext() {
    if (!this.playList.length) return;
    if (this.nextPlayList.length) {
      this.songSwitch(this.nextPlayList.shift());
    } else {
      if (this._playMode === 'queue') {
        let index = this.playList.findIndex(item => item.id === this.currentSong.id);
        index = index === this.playList.length - 1 ? 0 : index + 1;
        this.songSwitch(this.playList[index]);
      }
    }
  },
  addNextPlaySong(song) {
    let index = this.nextPlayList.findIndex(i => i.id === song.id);
    if (index > -1) {
      this.nextPlayList.unshift(this.nextPlayList.splice(index, 1));
    } else {
      this.nextPlayList.unshift(song);
    }
  },
  _getStorage(key, defaultValue) {
    return new Promise((res, rej) => {
      try {
        const storage = wx.getStorageSync(key);
        res(storage || defaultValue);
      } catch (e) {
        console.error('storage error');
        rej();
      }
    });
  },
  _saveToStorage(key, value) {
    try {
      wx.setStorageSync(key, value);
    } catch (e) {
      console.error('set storage error');
    }
  },
  addSong(song) {
    if (!song) return;
    let index = this.playList.findIndex(item => item.id === song.id);
    if (index > -1) {
      this.songSwitch(this.playList[index]);
      return;
    }
    this.playList.unshift(song);
    this.nextPlayList.unshift(this.currentSong);
    this.songSwitch(song);
    this._saveToStorage('playList', this.playList);
  },
};

let emitDebounce = debounce(() => {
  audioCtr.emitPlayListChange();
}, 300);
(function init() {
  function setPlayListWatch() {
    // TODO 直接替换playList的话没监听到
    let push = Array.prototype.push;
    let pop = Array.prototype.pop;
    let shift = Array.prototype.shift;
    let splice = Array.prototype.splice;
    let unshift = Array.prototype.unshift;

    function match() {
      if (audioCtr && audioCtr.playList === this) {
        emitDebounce();
      }
    }

    Array.prototype.push = function () {
      match.call(this);
      return push.apply(this, arguments);
    };
    Array.prototype.pop = function () {
      match.call(this);
      return pop.call(this);
    };
    Array.prototype.shift = function () {
      match.call(this);
      return shift.apply(this, arguments);
    };
    Array.prototype.splice = function () {
      match.call(this);
      return splice.apply(this, arguments);
    };
    Array.prototype.unshift = function () {
      match.call(this);
      return unshift.apply(this, arguments);
    };

  }

  setPlayListWatch();
  audioCtr._getStorage('playList', []).then(data => {
    audioCtr.playList = data;
  });
  audioCtr._getStorage('currentSong', {}).then(data => {
    audioCtr.currentSong = data;
  });
  audio.onEnded(() => audioCtr.playNext());
})();
export {audioCtr};