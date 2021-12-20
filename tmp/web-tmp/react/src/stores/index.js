
// 通用store
const common_store = {

}

const storeCreate = function (store = {}) {
  // 合并
  const merge_store = Object.assign(store, common_store)

  // 开发环境: 可通过window.store调试
  if (process.env.NODE_ENV === 'develop') {
    window.store = merge_store
  }
  return merge_store
}

export default storeCreate
