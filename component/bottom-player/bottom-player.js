// component/bottom-player/bottom-player.js
import {audioCtr} from '../../common/js/audio';
import {eventBus, eventType} from '../../common/js/evenBus';

Component({
  properties: {},
  data: {
    song: {
      singer: '',
      name: '',
      cover: '',
    },
    isPlaying: false,
    hasPlay: false,
  },
  ready() {
    this.getSong();
    eventBus.on(eventType.audio.change, () => {
      this.getSong();
    });
    let onPlayOrPauseHandler = (flag) => {
      return () => {
        console.log('ssssss');
        this.setData({
          isPlaying: flag,
          hasPlay: true,
        });
      };
    };
    audioCtr.audio.onPlay(onPlayOrPauseHandler(true));
    audioCtr.audio.onPause(onPlayOrPauseHandler(false));
  },
  onHide() {
    console.log('hide');
  },
  methods: {
    getSong() {
      let song = audioCtr.currentSong;
      if (song.name === undefined) return;
      let {name, singer, image} = song;
      this.setData({
        'song.name': name,
        'song.singer': singer,
        'song.cover': image,
      });
    },
    setPlay() {
      console.log('pppppppppp', audioCtr.audio.paused);
      let paused = audioCtr.audio.paused;
      if (paused === undefined) {
        if (audioCtr.currentSong.id) {
          audioCtr.songSwitch(audioCtr.currentSong);
        } else {
          audioCtr.playNext();
        }
      } else if (paused === false) {
        audioCtr.pause();
      } else {
        audioCtr.play();
      }
    },
    playNext() {
      audioCtr.playNext();
    },
    playPrev() {
      audioCtr.playPrev();
    },
    tapMenu() {
      eventBus.emit(eventType.tapPlayList);
    },
  },
});
