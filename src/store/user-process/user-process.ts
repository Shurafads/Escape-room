import { createSlice } from '@reduxjs/toolkit';
import { TUserProcess } from '../../types/state';
import { AuthorizationStatus, NameSpace } from '../../const';
import { checkAuthAction, loginAction, logoutAction } from '../api-action';
import { toast } from 'react-toastify';

const initialState: TUserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isExpectingAuthorizationStatus: true,
};

export const userProcess = createSlice({
  name: NameSpace.UserProcess,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.pending, (state) => {
        state.isExpectingAuthorizationStatus = true;
      })
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.isExpectingAuthorizationStatus = false;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isExpectingAuthorizationStatus = false;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, () => {
        toast.error('Whoops, authorization error, please try again');
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});

