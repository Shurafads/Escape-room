import {combineReducers} from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { questsData } from './quests-data/quests-data';
import { userProcess } from './user-process/user-process';
import { bookingData } from './booking-data/booking-data';
import { reservationData } from './reservation-data/reservation-data';

export const rootReducer = combineReducers({
  [NameSpace.Quests]: questsData.reducer,
  [NameSpace.UserProcess]: userProcess.reducer,
  [NameSpace.Booking]: bookingData.reducer,
  [NameSpace.Reservation]: reservationData.reducer,
});
