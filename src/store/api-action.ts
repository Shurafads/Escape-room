import {AxiosInstance} from 'axios';
import { TQuest } from '../types/quests';
import {AppDispatch, State } from '../types/state';
import { ApiRoute } from '../const';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TQuestInfo } from '../types/quests-info';
import { TAuthData } from '../types/auth-data';
import { saveToken } from '../services/token';
import { TUserData } from '../types/user-data';
import { dropToken } from '../services/token';
import { TQuestPlaces } from '../types/quest-places';

export const fetchQuestsAction = createAsyncThunk<TQuest[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchQuests',
  async (_arg, {extra: api}) => {

    const {data} = await api.get<TQuest[]>(ApiRoute.Quests);

    return data;
  }
);

export const fetchQuestInfoAction = createAsyncThunk<TQuestInfo, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchQuestInfo',
  async (questId, {extra: api}) => {

    const {data} = await api.get<TQuestInfo>(`${ApiRoute.Quests}/${questId}`);

    return data;
  }
);

export const fetchBookingQuestAction = createAsyncThunk<TQuestPlaces[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchBookingQuestAction',
  async (questId, {extra: api}) => {

    const {data} = await api.get<TQuestPlaces[]>(`${ApiRoute.Quests}/${questId}/booking`);

    return data;
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuthAction',
  async (_arg, {extra: api}) => {
    await api.get(ApiRoute.Login);
  },
);

export const loginAction = createAsyncThunk<void, TAuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/loginAction',
  async ({email, password}, {extra: api}) => {
    const {data: {token}} = await api.post<TUserData>(ApiRoute.Login, {email, password});

    saveToken(token);
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logoutAction',
  async (_arg, {extra: api}) => {
    await api.delete<TUserData>(ApiRoute.Login);

    dropToken();
  },
);
