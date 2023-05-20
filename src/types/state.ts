import { AuthorizationStatus } from '../const';
import { store } from '../store';
import { TQuestPlaces } from './quest-places';
import { TQuest } from './quests';
import { TQuestInfo } from './quests-info';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;


export type TBookingData = {
  questPlaces: TQuestPlaces[];
  isLoadingPlaces: boolean;
}

export type TQuestsData = {
  questsList: TQuest[];
  questsListCopy: TQuest[];
  isLoadingOffersData: boolean;
  currentQuest: TQuestInfo | null;
  isLoadingQuestInfo: boolean;
}

export type TUserProcess = {
  authorizationStatus: AuthorizationStatus;
}

export type TFilter = {type: string; level: string}
