import storeCreate from '@/stores'
import HomeStore from './HomeStore'

const stores = storeCreate({
  homeStore: new HomeStore(),
})

export default stores
