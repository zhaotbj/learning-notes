import Vue from 'vue'
import Vuex from 'vuex'

import ActionHelper from './ActionHelper'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    aHelper: new ActionHelper(),
    isShow: false, // 控制modal显示与隐藏
    transMemo: null, // 编辑时数据
    filterCateId: -1  // 过滤 切换时需要的类别id
  },
  mutations: {
    showEditMemo(state:any, params: any){
      state.transMemo = params
      state.isShow = true
    }
  },
  actions: {
  },
  modules: {
  }
})
