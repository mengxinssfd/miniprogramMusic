// component/song-list-item/item.js
import {getVkey} from '../../api/song';
import {audioCtr} from '../../common/js/audio';
import {selectStatus as STATUS, ERR_OK} from '../../common/js/const';

Component({
  properties: {
    itemData: {
      type: Object,
      value: {},
    },
    itemIndex: Number,
    state: Number,
    isSelected: Boolean,
  },

  ready() {
    console.log('select', this.data.isSelected);
  },
  data: {
    status: STATUS,
  },

  methods: {
    tapSong() {
      let song = this.data.itemData;
      if (this.data.state === STATUS.select) {
        this.selectSong(song);
      } else if (this.data.state === STATUS.common) {
        this.addSong(song);
      }
    },
    longPressSong() {
      this.triggerEvent('long', {song: this.data.itemData, index: this.data.itemIndex});
    },
    selectSong(song) {
      if (song.payplay) {
        wx.showToast({
          title: '无法播放付费歌曲!!',
          icon: 'none',
          duration: 2000,
        });
        return;
      }
      this.triggerEvent('selected', {song, index: this.data.itemIndex - 1});
    },
    addSong(song) {
      if (song.payplay) {
        wx.showToast({
          title: '无法播放付费歌曲!!',
          icon: 'none',
          duration: 2000,
        });
        return;
      }
      audioCtr.addSong(song);
    },
  },
});
