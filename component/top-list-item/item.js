// component/top-list-item/item.js
import {eventBus, eventType} from '../../common/js/evenBus';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData: {
      type: Object,
      value: {},
    },
  },

  ready() {
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    tapTopItem() {
      let item = this.data.itemData;
      let opt = {
        name: item.ListName,
        date: item.update_key,
        id: item.topID,
        type: item.type !== 0 ? 'global' : 'top',
      };
      console.log('name', item.listName);
      eventBus.emit(eventType.tapTop, opt);
    },
  },
});
