const initialState = {
  user: {
    name: 'ferferfer',
    token: ''
  },
  game: {
    refresh: 0,
    stage1: {
      boxValue: 0,
      topWall: ['*', 2],
      leftWall: ['-', 3],
      rightWall: ['+', 2],
      bottomWall: ['+', 5],
      gold: 9,
      silver: 11,
      bronze: 12
    },
    stage2: {
      boxValue: 0,
      topWall: ['*', 5],
      leftWall: ['-', 2],
      rightWall: ['+', 3],
      bottomWall: ['+', 7],
      gold: 11,
      silver: 12,
      bronze: 14
    },
    stage3: {
      boxValue: 0,
      topWall: ['-', 11],
      leftWall: ['*', 3],
      rightWall: ['+', 3],
      bottomWall: ['*', 3],
      gold: 13,
      silver: 14,
      bronze: 15
    }
  },
  gameTable: {
    stage1: [],
    stage2: [],
    stage3: []
  }

}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_TOKEN':
      return {
        ...state,
        user: {
          ...state.user,
          token: action.payload
        }
      }
    case 'SET_USER_NAME':
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload
        }
      }
    case 'SET_GAME_TABLE':
      return {
        ...state,
        gameTable: action.payload
      }  
    // all other action case here           
    default:
      return state
  }
}