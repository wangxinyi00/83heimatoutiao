// 实现整体组件统一注册
import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'
import breadCrumb from './common/bread-crumb'
export default {
  install: function (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
    Vue.component('bread-crumb', breadCrumb)
  }
}
