
export const state = ()=>({
  authUser: null,
  showDashBoardMenu: false
});

export const mutations = {
  setAuthUser(state, authUser) {
    state.authUser = authUser;
  },
  toggleShowDashBoardMenu(state){
    state.showDashBoardMenu = !state.showDashBoardMenu;
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
