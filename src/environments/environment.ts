// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export var environment = {
  production: false,
  api_url: 'http://192.168.8.132:3000',
  socket_url: '192.168.9.116:5001',
  beginHour: 8,
  endHour: 18,
  menuList: [
    {
      id: "home",
      icon: "icon-home",
      value: '首页',
    },
    {
      id: "create",
      icon: "icon-Meeting",
      value: '创建会议',
    },
    {
      id: "meeting",
      icon: "icon-iconfontlistul",
      value: '会议列表',
    },
    {
      id: "room",
      icon: "icon-meeting1",
      value: '会议室',
    },
    {
      id: "musics",
      icon: "icon-yinlemusic",
      value: '音乐库',
    },
    {
      id: "devices",
      icon: "icon-shebeiguanli",
      value: '设备管理',
    },
  ]
};
