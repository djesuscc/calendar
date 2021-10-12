import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

const initState = {
  checking: true
}

describe('Test authReducer', () => {
  test('should return default state', () => {
    const state = authReducer(initState, {});
    expect(state).toEqual(initState);
  });

  test('should return login data', () => {
    const action = {
      type: types.authLogin,
      payload: {
        uid: 'ABC123DEF456',
        name: 'Test'
      }
    }
    const state = authReducer(initState, action);
    expect(state).toEqual({...action.payload, checking: false});
  })
  
})