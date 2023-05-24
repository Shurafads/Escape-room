import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TReservationData } from '../../types/state';
import { fetchReservationAction } from '../api-action';
import { toast } from 'react-toastify';

const initialState: TReservationData = {
  reservationList: [],
  copyReservationList: [],
  isReservationsLoading: true,
};

export const reservationData = createSlice({
  name: NameSpace.Reservation,
  initialState,
  reducers: {
    changePlaces: (state, action: PayloadAction<string>) => {
      state.copyReservationList = state.copyReservationList.filter((place) => place.id !== action.payload);
    },
    removeReservationList: (state) => {
      state.reservationList = [];
      state.copyReservationList = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReservationAction.pending, (state) => {
        state.isReservationsLoading = true;
      })
      .addCase(fetchReservationAction.fulfilled, (state, action) => {
        state.reservationList = action.payload;
        state.copyReservationList = action.payload;
        state.isReservationsLoading = false;
      })
      .addCase(fetchReservationAction.rejected, (state) => {
        toast.error('Не удалось получить данные по забронированным квестам, попробуйте позже');
        state.isReservationsLoading = false;
      });
  }
});

export const { changePlaces, removeReservationList } = reservationData.actions;
