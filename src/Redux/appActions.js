export const setUserToken = token => {
  return {
    type: 'SET_USER_TOKEN',
    payload: token
  }
}

export const setUserName = name => {
  return {
    type: 'SET_USER_NAME',
    payload: name
  }
}

export const setGameTable = table => {
  return {
    type: 'SET_GAME_TABLE',
    payload: table
  }
}


  // all other actions u need here
  // with the same format