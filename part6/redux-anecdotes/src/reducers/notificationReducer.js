const initialState = ""

const notificationReducer = (state = initialState, action) => {
  // console.log('ACTION IN NOTIFICATION: ', action.notification)
  switch(action.type) {
    case 'SHOW_NOTIFICATION':
      return action.notification
    case 'REMOVE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const showNotification = notification => {
  return {
    type: 'SHOW_NOTIFICATION',
    notification: notification,
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}
export default notificationReducer