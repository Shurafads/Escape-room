import { AuthorizationStatus, NameSpace } from '../../const';
import { State } from '../../types/state';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.UserProcess].authorizationStatus;

export const getExpectingAuthStatus = (state: State): boolean => state[NameSpace.UserProcess].isExpectingAuthStatus;
