import * as usersActions from '../actions';
import * as usersReducers from '../reducer';


describe('users reducer tests', () => {

  let currentUserState = {};

  it('Should add currentUser to empty state (logInSuccess)', () => {
    const user = { id: 100, email: 'a@a.com', password: '123123', name: 'A', symbol: 'AAA', logo: '', points: 200 };
    currentUserState = usersReducers.currentUser(currentUserState, usersActions.logInSuccess(user));
    expect(currentUserState).toEqual({
      id: 100, email: 'a@a.com', password: '123123', name: 'A', symbol: 'AAA', logo: '', points: 200
    });
  });

  it('Should update currentUser in state', () => {
    currentUserState = usersReducers.currentUser(currentUserState, usersActions.updateCurrentUser({ points: 150 }));
    expect(currentUserState).toEqual({
      id: 100, email: 'a@a.com', password: '123123', name: 'A', symbol: 'AAA', logo: '', points: 150
    });
  });

  it('Should remove currentUser from state (logOut)', () => {
    currentUserState = usersReducers.currentUser(currentUserState, usersActions.logOut());
    expect(currentUserState).toEqual(null);
  });

});
