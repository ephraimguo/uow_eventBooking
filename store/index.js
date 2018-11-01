
export const state = ()=>({
  authUser: null,
  authUserManager: null,
  showDashBoardMenu: false,
  calEventList: [],
  profileUser: null,
  showEditProfilePanel: false
});

export const mutations = {
  setAuthUser(state, authUser) {
    state.authUser = authUser;
  },
  toggleShowDashBoardMenu(state){
    state.showDashBoardMenu = !state.showDashBoardMenu;
  },
  setCalEventList(state, eventList) {
    state.calEventList = eventList;
  },
  setProfileUser(state, user){
    state.profileUser = user;
  },
  showEditProfilePanel(state, showOrNot) {
    state.showEditProfilePanel = showOrNot;
  },
  setAuthUserManager(state, {userEventManager}) {
    state.authUserManager = userEventManager;
  },
  loggoutAuthUserManager(state, manager) {
    state.authUserManager = null;
  }
}

export const actions = {
  async nuxtServerInit({commit}, {req, res}){
    if(req.session && req.session.authUser){
      console.log('\n\n this is req.session.currentAuthUser\n',req.session.authUser, '\n ===');
      commit('setAuthUser', req.session.authUser);
    }
  }
}
