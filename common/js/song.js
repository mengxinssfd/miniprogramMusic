/* import {getLrc} from '../../api/song';
import {ERR_OK} from '../../api/config';
import {Base64} from "./util";
import LyricParse from 'lyric-parser'; */
import {Singer} from './singer';

export class Song {
  constructor({id, mid, vid, singer, singerList, name, album, duration, image, url, secondUrl, payplay}) {
    this.id = id;
    this.mid = mid;
    this.vid = vid;
    this.singer = singer;
    this.singerList = singerList;
    this.name = name;
    this.album = album;
    this.duration = duration;
    this.image = image;
    this.url = url;
    this.secondUrl = secondUrl;
    this.payplay = payplay;
    this.lyric = null;
  }

}

export function createSong(musicData) {
  // vkeyFilter(musicData.songmid);
  let singerList = musicData.singer.map((item) => {
    return new Singer(item.id, item.mid, item.name);
  });
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    vid: musicData.vid,
    // singer: singers.join('/'),
    singer: musicData.singer ? musicData.singer.map((item) => item.name).join('/') : '',
    singerList: singerList,
    name: musicData.songname,
    album: {name: musicData.albumname, mid: musicData.albummid, id: musicData.albumid},
    duration: musicData.interval,
    image: musicData.albummid ? `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000` : '',
    secondUrl: `https://dl.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?fromtag=66`, // 这个不用vkey音质不好
    url: '',
    payplay: musicData.pay.payplay,

  });
}

export function createSongFromSearch(musicData) {
  let mv = musicData.mv;
  let singerList = musicData.singer.map((item) => {
    return new Singer(item.id, item.mid, item.name);
  });
  let album = musicData.album;
  return new Song({
    id: musicData.id,
    mid: musicData.mid,
    vid: mv && mv.vid ? mv.vid : '',
    // singer: singers.join('/'),
    singer: singerList ? singerList.map((item) => item.name).join(' & ') : '',
    singerList: singerList,
    name: musicData.name,
    album: album ? {name: album.name, id: album.id, mid: album.mid} : {},
    duration: musicData.interval,
    image: album.mid ? `https://y.gtimg.cn/music/photo_new/T002R300x300M000${album.mid}.jpg?max_age=2592000` : '',
    secondUrl: `https://dl.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?fromtag=66`, // 这个不用vkey音质不好
    url: '',
    payplay: musicData.pay.pay_play,
  });
}
