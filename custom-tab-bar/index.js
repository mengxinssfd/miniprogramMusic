Component({
  properties: {
    show: {
      type: Boolean,
      value: true,
    },
  },
  data: {
    selected: 0,
    list: [/*{
      pagePath: '/pages/recommend/recommend',
      // iconPath: "/image/icon_component.png",
      // selectedIconPath: "/image/icon_component_HL.png",
      text: '推荐',
    },*/
      {
        pagePath: '/pages/singer/singer',
        // iconPath: "/image/icon_API.png",
        // selectedIconPath: "/image/icon_API_HL.png",
        text: '歌手',
      },
      {
        pagePath: '/pages/top/top',
        // iconPath: "/image/icon_API.png",
        // selectedIconPath: "/image/icon_API_HL.png",
        text: '排行榜',
      },
      {
        pagePath: '/pages/search/search',
        // iconPath: "/image/icon_API.png",
        // selectedIconPath: "/image/icon_API_HL.png",
        text: '搜索',
      },
    ],
  },
  methods: {
    switchTab(e) {
      let index = e.currentTarget.dataset.index;
      if (index == this.data.selected) return;
      this.setData({
        selected: index,
      });
      let myEventDetail = {index};
      this.triggerEvent('change', myEventDetail);
    },
  },
});