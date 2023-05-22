import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TFilter, TQuestsData } from '../../types/state';
import { fetchQuestInfoAction, fetchQuestsAction } from '../api-action';

const initialState: TQuestsData = {
  questsList: [],
  questsListCopy: [],
  isLoadingQuests: true,
  currentQuest: null,
  isLoadingQuestInfo: true,
};

export const questsData = createSlice({
  name: NameSpace.Quests,
  initialState,
  reducers: {
    filterQuestsAction: (state, action: PayloadAction<TFilter>) => {

      const {type, level} = action.payload;

      if (type === 'all' && level === 'any') {
        state.questsListCopy = state.questsList;
        return;
      }
      if (type === 'all') {
        state.questsListCopy = state.questsList.filter((quest) => quest.level === level);
        return;
      }
      if (level === 'any') {
        state.questsListCopy = state.questsList.filter((quest) => quest.type === type);
        return;
      }
      if (type !== 'all' && level !== 'any') {
        state.questsListCopy = state.questsList.filter((quest) => quest.type === type && quest.level === level);
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchQuestsAction.pending, (state) => {
        state.isLoadingQuests = true;
      })
      .addCase(fetchQuestsAction.fulfilled, (state, action) => {
        state.questsList = action.payload;
        state.questsListCopy = action.payload;
        state.isLoadingQuests = false;
      })
      .addCase(fetchQuestsAction.rejected, (state) => {
        state.isLoadingQuests = false;
      })
      .addCase(fetchQuestInfoAction.pending, (state) => {
        state.isLoadingQuestInfo = true;
      })
      .addCase(fetchQuestInfoAction.fulfilled, (state, action) => {
        state.currentQuest = action.payload;
        state.isLoadingQuestInfo = false;
      })
      .addCase(fetchQuestInfoAction.rejected, (state) => {
        state.isLoadingQuestInfo = false;
      });
  }
});

export const { filterQuestsAction } = questsData.actions;
