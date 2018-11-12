import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types={
  SET_AUTHENTICATED:'SET_AUTHENTICATED',
  SET_USER: 'SET_USER'
}

const state={
  isAuthenticated: false,
  user:{}
};

const getters ={
  isAuthenticated: state=> state.isAuthenticated,
  user: state=> state.user
};

const mutations={
  // tell if there are authenticated and user data
  [types.SET_AUTHENTICATED](state,isAuthenticated){
    if(isAuthenticated) state.isAuthenticated=isAuthenticated;
    else state.isAuthenticated=false;
  },
  [types.SET_USER](state,user){
    if(user) state.user = user;
    else state.user={};
  }
};

const actions={
  setAuthenticated(context,isAuthenticated){
    context.commit(types.SET_AUTHENTICATED,isAuthenticated);
  },
  setUser(context,user){
    context.commit(types.SET_USER,user);
  }
 
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
