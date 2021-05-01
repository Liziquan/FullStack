const initialState = ""
let timer

const notificationReducer = (state = initialState, action) => {
    switch(action.type) {
      case "SET_MESSAGE":
        clearTimeout(state.lasting) 
        return action.data
      case 'DELETE_NOTIFICATION':
        return initialState
      default:
        return state
    }
}


  export const setNotification = (message,type) => {
    return async dispatch => {
        clearTimeout(timer)
        await dispatch({
          type: "SET_MESSAGE",
          data: {message,type}
        })
        function lasting(){   
          timer=setTimeout(() => {
              dispatch({
                  type:'DELETE_NOTIFICATION'
              })
          },  5000)
        }
        lasting()
    }
  }
  
  export const deleteNotification = () => {
    return {
      type: 'DELETE_NOTIFICATION'
    }
  }
  
  export default notificationReducer