import { store } from '../store';
import { TQuest } from './quests';
import { TQuestInfo } from './quests-info';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type TQuestsData = {
  questsList: TQuest[];
  questsListCopy: TQuest[];
  isLoadingOffersData: boolean;
  currentQuest: TQuestInfo | null;
  isLoadingQuestInfo: boolean;
}

export type TFilter = {type: string; level: string}
