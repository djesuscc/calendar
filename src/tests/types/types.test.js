import { types } from '../../types/types';


describe('Tests on types.js', () => {
  test('should be the same', () => {
    expect(types).toEqual({
      uiOpenModal: '[UI] Open Modal',
      uiCloseModal: '[UI] Close Modal',
      eventAddNew: '[Event] Add New',
      eventSetActive: '[Event] Set Active',
      eventClearActive: '[Event] Clear Active',
      eventUpdated: '[Event] Updated',
      eventDeleted: '[Event] Deleted',
      eventLoaded: '[Event] Events Loaded',
      eventLogout: '[Event] Event Logout',
      authCheckingFinish: '[Auth] Finish Checking Login State',
      authStartLogin: '[Auth] Start Login',
      authLogin: '[Auth] Login',
      authStartRegister: '[Auth] Start Register',
      authStartTokenRenew: '[Auth] Star Token Renew',
      authLogout: '[Auth] Logout',
    });
  });  
});