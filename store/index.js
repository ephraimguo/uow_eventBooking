
export const state = ()=>({
  authUser: null
});

export const mutations = {
  setAuthUser(state, authUser) {
    state.authUser = authUser;
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
