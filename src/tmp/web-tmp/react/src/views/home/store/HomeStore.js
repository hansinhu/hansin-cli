import React from 'react'
import { observable } from 'mobx'

import { API } from '@/constants';

export default class HomeStore {
  @observable hello = 'Club Factory App'
}
