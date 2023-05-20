import {AxiosInstance} from 'axios';
import { TQuest } from '../types/quests';
import {AppDispatch, State} from '../types/state';
import { ApiRoute } from '../const';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TQuestInfo } from '../types/quests-info';

export const fetchQuestsAction = createAsyncThunk<TQuest[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchQuests',
  async (_arg, {extra: api}) => {

    const {data} = await api.get<TQuest[]>(ApiRoute.Quests);

    return data;
  }
);

export const fetchQuestInfoAction = createAsyncThunk<TQuestInfo, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchQuestInfo',
  async (questId, {extra: api}) => {

    const {data} = await api.get<TQuestInfo>(`${ApiRoute.Quests}/${questId}`);

    return data;
  }
);
