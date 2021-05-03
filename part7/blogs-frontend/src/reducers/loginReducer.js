import loginService from '../services/login'


const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':{

      return action.data
      
    }
    case 'SET_USER':
      return action.data
    case 'LOGOUT': {
      return null
    }
    default:
      return state
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password })

    dispatch({
      type: 'LOGIN',
      data: user,
    })

  }
}

export const logout = () => {
  return {
    type: 'LOGOUT',
  }
}

export const setUser = (user) =>{
  return {
    type:'SET_USER',
    data: user,
  }
}

export default loginReducer