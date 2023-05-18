import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Quests } from './mocks/quests';
import { QuestInfo } from './mocks/quests-info';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App quests={Quests} questsInfo={QuestInfo}/>
  </React.StrictMode>,
);
