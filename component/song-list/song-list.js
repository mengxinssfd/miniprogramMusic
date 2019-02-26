// pages/song-list/songList.js
import {selectStatus as STATUS} from '../../common/js/const';
import {audioCtr} from '../../common/js/audio';
import {eventBus, eventType} from '../../common/js/evenBus';

Component({
  properties: {
    type: String,
    songs: {
      type: Array,
      value: [],
    },
    title: String,
    isPlayList: {
      type: Boolean,
      value: false,
    },
  },

  data: {
    state: STATUS.common,
    status: STATUS,
    selected: [],
    currentSongID: '',
    showDialog: false,
    selectedSong: {},
  },
  ready() {
    if (this.data.type === 'playList') {
      this.watchHandler = opt => {
        console.log('change change change');
        this.setData({
          songs: audioCtr.playList,
          currentSongID: audioCtr.currentSong.id || '',
        });
      };
      eventBus.on(eventType.playListChange, this.watchHandler);
    }
  },
  detached() {
    console.log('detached');
    if (this.data.type === 'playList') {
      eventBus.off(eventType.playListChange, this.watchHandler);
    }
  },
  methods: {
    tapBack() {
      this.triggerEvent('back', {});
    },
    onEnd() {
      if (this.data.state === STATUS.common)
        this.triggerEvent('end');
    },
    tapCancel() {
      this.setData({
        state: STATUS.common,
      });
    },
    tapSelect() {
      this.setData({
        state: STATUS.select,
      });
    },
    tapSelectAll(e) {
      console.log(e);
      let text = e.currentTarget.dataset.text;
      if (text === '全选') {
        let all = Array(this.data.songs.length).fill(0).map((item, index) => index);
        this.setData({
          selected: all,
        });
      } else if (text === '取消') {
        this.setData({
          selected: [],
        });
      }
    },
    tapAddToPlayList() {
      if (!this.data.selected.length) return;
      let songList = this.data.selected.map(item => {
        return this.data.songs[item];
      });
      audioCtr.addSongListToPlayList(songList);
      this.setData({
        state: STATUS.common,
        selected: [],
      });
    },
    tapDeleteFromPlayList() {
      if (!this.data.selected.length) return;
      let songList = this.data.selected.map(item => {
        return this.data.songs[item];
      });
      audioCtr.deleteSongListFromPlayList(songList);
      this.setData({
        state: STATUS.common,
        selected: [],
      });
    },
    onSelected(e) {
      let index = e.detail.index;
      let selected = this.data.selected;
      let i = selected.indexOf(index);
      i > -1 ? selected.splice(i, 1) : selected.push(index);
      this.setData({
        selected,
      });
    },
    switchDialog(flag) {
      this.setData({
        showDialog: flag,
      });
    },
    onLongPressSong(e) {
      console.log(e);
      this.setData({
        showDialog: true,
        selectedSong: e.detail.song,
      });
    },
    tapRight() {
      this.triggerEvent('right', {title: this.data.title, text: this.data.right});
    },
    tapMask() {
      this.switchDialog(false);
    },
    tapNext() {
      this.switchDialog(false);
      audioCtr.addNextPlaySong(this.data.selectedSong);
    },
  },
});
