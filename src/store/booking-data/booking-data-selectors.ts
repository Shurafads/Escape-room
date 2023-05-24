import { NameSpace } from '../../const';
import { TQuestPlaces } from '../../types/quest-places';
import { State } from '../../types/state';

export const getQuestPlaces = (state: State): TQuestPlaces[] => state[NameSpace.Booking].questPlaces;

export const getLoadingPlacesStatus = (state: State): boolean => state[NameSpace.Booking].isLoadingPlaces;

export const getSendingBookingStatus = (state: State): boolean => state[NameSpace.Booking].isSendingBooking;
