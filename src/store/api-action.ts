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
import { TUserBooking } from '../types/user-booking';
import { TReservationInfo } from '../types/reservation-info';

export const fetchQuestsAction = createAsyncThunk<TQuest[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'quest/fetchQuests',
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
  'quest/fetchQuestInfo',
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
  'quest/fetchBookingQuestAction',
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

export const bookingAction = createAsyncThunk<void, TUserBooking,
  {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }>(
    'booking/sendReview',
    async ({date, time, contactPerson, phone, withChildren, peopleCount, placeId, questId}, {extra: api}) => {
      await api.post<TUserBooking>(`${ApiRoute.Quests}/${questId}/booking`, {date, time, contactPerson, phone, withChildren, peopleCount, placeId});
    },
  );

export const fetchReservationAction = createAsyncThunk<TReservationInfo[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'reservation/fetchReservationAction',
  async (_arg, {extra: api}) => {

    const {data} = await api.get<TReservationInfo[]>(ApiRoute.Reservation);

    return data;
  }
);

export const deleteReservationAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'reservation/deleteReservationAction',
  async (reservationID, {extra: api}) => {
    await api.delete<TReservationInfo[]>(`${ApiRoute.Reservation}/${reservationID}`);
  }
);
