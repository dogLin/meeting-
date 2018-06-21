export const environment = {
  production: true,
  api_url: '/api',
  socket_url: '',
  beginHour: 8,
  endHour: 18,
  menuList: [
    {
      id: "home",
      icon: "icon-home",
      value: '首页',
      select: true,
    },
    {
      id: "create",
      icon: "icon-Meeting",
      value: '创建会议',
      select: false,
    },
    {
      id: "meeting",
      icon: "icon-iconfontlistul",
      value: '会议列表',
      select: false,
    },
    {
      id: "room",
      icon: "icon-meeting1",
      value: '会议室',
      select: false,
    },
    // {
    //   id: "music",
    //   icon: "icon-yinlemusic",
    //   value: '音乐库',
    //   select: false,
    // },
    {
      id: "devices",
      icon: "icon-shebeiguanli",
      value: '设备管理',
      select: false,
    },
  ]
};

