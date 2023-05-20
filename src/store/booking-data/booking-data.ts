import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TBookingData } from '../../types/state';
import { fetchBookingQuestAction } from '../api-action';

const initialState: TBookingData = {
  questPlaces: [],
  isLoadingPlaces: true,
};

export const bookingData = createSlice({
  name: NameSpace.Booking,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBookingQuestAction.pending, (state) => {
        state.isLoadingPlaces = true;
      })
      .addCase(fetchBookingQuestAction.fulfilled, (state, action) => {
        state.questPlaces = action.payload;
        state.isLoadingPlaces = false;
      });
  }
});
