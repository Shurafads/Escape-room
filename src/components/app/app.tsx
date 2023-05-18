import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainPage from '../../pages/main-page/main-page';
import { AppRoute, AuthorizationStatus } from '../../const';
import Footer from '../footer/footer';
import Header from '../header/header';
import BookingPage from '../../pages/booking-page/booking-page';
import ContactsPage from '../../pages/contacts-page/contacts-page';
import LoginPage from '../../pages/login-page/login-page';
import MyQuestsPage from '../../pages/my-quests-page/my-quests-page';
import QuestPage from '../../pages/quest-page/quest-page';
import { HelmetProvider } from 'react-helmet-async';
import { TQuests } from '../../types/quests';
import { TQuestInfo } from '../../types/quests-info';
import PrivateRoute from '../private-route/private-route';
import NotFoundPage from '../../pages/not-found-page/not-found-page';

type AppProps = {
  quests: TQuests[];
  questsInfo: TQuestInfo[];
}

function App({quests, questsInfo}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <div className="wrapper">
          <Header />
          <Routes>
            <Route path={AppRoute.Main} element={<MainPage quests={quests}/>}/>
            <Route path={AppRoute.Booking} element={<BookingPage />}/>
            <Route path={AppRoute.Contacts} element={<ContactsPage />}/>
            <Route path={AppRoute.Login} element={<LoginPage />}/>
            <Route path={`${AppRoute.Quest}/:id`} element={<QuestPage questsInfo={questsInfo} />}/>
            <Route path={AppRoute.MyQuests} element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
                <MyQuestsPage />
              </PrivateRoute>
            }
            />
            <Route path='*' element={<NotFoundPage />}/>
          </Routes>
          <Footer />
        </div>
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default App;
