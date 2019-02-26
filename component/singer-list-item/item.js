// component/singer-list-item/item.js
import {eventBus, eventType} from '../../common/js/evenBus';

Component({
  properties: {
    itemData: {
      type: Object,
      value: {},
    },
  },
  ready() {
  },
  data: {
    imgUrl: '',
  },
  methods: {
    tabSingerItem() {
      eventBus.emit(eventType.tapSinger, {
        mid: this.data.itemData.mid,
        name: this.data.itemData.name,
      });
    },
  },
});
