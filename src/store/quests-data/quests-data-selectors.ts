import { NameSpace } from '../../const';
import { TQuest } from '../../types/quests';
import { TQuestInfo } from '../../types/quests-info';
import { State } from '../../types/state';

export const getQuests = (state: State): TQuest[] => state[NameSpace.Quests].questsListCopy;

export const getQuestInfo = (state: State): TQuestInfo | null => state[NameSpace.Quests].currentQuest;
