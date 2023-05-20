import {combineReducers} from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { questsData } from './quests-data/quests-data';

export const rootReducer = combineReducers({
  [NameSpace.Quests]: questsData.reducer,
});
