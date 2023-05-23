import { AuthorizationStatus } from '../const';
import { store } from '../store';
import { TQuestPlaces } from './quest-places';
import { TQuest } from './quests';
import { TQuestInfo } from './quests-info';
import { TReservationInfo } from './reservation-info';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;


export type TBookingData = {
  questPlaces: TQuestPlaces[];
  isLoadingPlaces: boolean;
  isSendingBooking: boolean;
}

export type TQuestsData = {
  questsList: TQuest[];
  questsListCopy: TQuest[];
  isLoadingQuests: boolean;
  currentQuest: TQuestInfo | null;
  isLoadingQuestInfo: boolean;
}

export type TUserProcess = {
  authorizationStatus: AuthorizationStatus;
  isExpectingAuthorizationStatus: boolean;
}

export type TReservationData = {
  reservationList: TReservationInfo[];
  copyReservationList: TReservationInfo[];
  isReservationsLoading: boolean;
}

export type TFilter = {type: string; level: string}
