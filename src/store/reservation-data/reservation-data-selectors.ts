import { NameSpace } from '../../const';
import { TReservationInfo } from '../../types/reservation-info';
import { State } from '../../types/state';

export const getReservationList = (state: State): TReservationInfo[] => state[NameSpace.Reservation].copyReservationList;

export const getReservationLoadingStatus = (state: State): boolean => state[NameSpace.Reservation].isReservationsLoading;
