import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TBookingData } from '../../types/state';
import { bookingAction, fetchBookingQuestAction } from '../api-action';
import { toast } from 'react-toastify';

const initialState: TBookingData = {
  questPlaces: [],
  isLoadingPlaces: true,
  isSendingBooking: true,
};

export const bookingData = createSlice({
  name: NameSpace.Booking,
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBookingQuestAction.pending, (state) => {
        state.isLoadingPlaces = true;
      })
      .addCase(fetchBookingQuestAction.fulfilled, (state, action) => {
        state.questPlaces = action.payload;
        state.isLoadingPlaces = false;
      })
      .addCase(fetchBookingQuestAction.rejected, (state) => {
        toast.error('Не удалось получить данные по бронированию, попробуйте позже');
        state.isLoadingPlaces = false;
      })
      .addCase(bookingAction.pending, (state) => {
        state.isSendingBooking = true;
      })
      .addCase(bookingAction.fulfilled, (state) => {
        state.isSendingBooking = false;
      })
      .addCase(bookingAction.rejected, (state) => {
        toast.error('Ошибка бронирования, попробуйте еще раз');
        state.isSendingBooking = false;
      });
  }
});

