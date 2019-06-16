const getters = {
  nickname: state => state.user.nickname,
  username: state => state.user.username,
  userId: state => state.user.userId,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles,
  menus: state => state.user.menus,
  permissions: state => state.user.permissions,
  token: state => state.user.token,
  permission_routers: state => state.permission.routes,
  addRouters: state => state.permission.addRoutes,
  collapsed: state => state.app.collapsed
}

export default getters
