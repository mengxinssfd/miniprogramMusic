// component/top-bar/top-bar.js
import {eventBus} from '../../common/js/evenBus';

Component({
  properties: {
    title: String,
  },
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  data: {},
  methods: {
    tapBack() {
      console.log('ssssss');
      this.triggerEvent('back', {});
    },
    tapTitle() {
      eventBus.emit('test', {test: 'hhhhhhhh'});
    },

  },
});
