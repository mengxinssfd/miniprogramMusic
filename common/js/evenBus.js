const events = {};

export const eventBus = {
  on(eventName, callback) {
    // console.log('eventBus on', eventName);
    let ev = events[eventName];
    if (ev && Array.isArray(ev)) {
      ev.push(callback);
    } else {
      events[eventName] = [callback];
    }
  },
  emit(eventName, params) {
    // console.log('eventBus emit', eventName);
    let ev = events[eventName];
    if (ev && Array.isArray(ev)) {
      ev.forEach(item => {
        item(params);
      });
    }
  },
  off(eventName, callback) {
    let ev = events[eventName];
    if (ev && Array.isArray(ev)) {
      let index = ev.findIndex(i => i === callback);
      (index > -1) && ev.splice(index, 1);
    }
  },
};

export const eventType = {
  audio: {
    change: 'audioUrlChange',
  },
  tapSinger: 'tapSinger',
  tapTop: 'tapTop',
  songListSwitch: 'songListSwitch',
  tapPlayList: 'tapPlayList',
  playListChange: 'playListChange',
};