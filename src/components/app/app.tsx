import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainPage from '../../pages/main-page/main-page';
import { AppRoute } from '../../const';
import Footer from '../footer/footer';
import Header from '../header/header';
import BookingPage from '../../pages/booking-page/booking-page';
import ContactsPage from '../../pages/contacts-page/contacts-page';
import LoginPage from '../../pages/login-page/login-page';
import MyQuestsPage from '../../pages/my-quests-page/my-quests-page';
import QuestPage from '../../pages/quest-page/quest-page';
import { HelmetProvider } from 'react-helmet-async';
import PrivateRoute from '../private-route/private-route';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { getAuthorizationStatus } from '../../store/user-process/user-process-selectors';
import { useAppSelector } from '../../store';

function App(): JSX.Element {

  const authStatus = useAppSelector(getAuthorizationStatus);

  return (
    <BrowserRouter>
      <HelmetProvider>
        <div className="wrapper">
          <Header />
          <Routes>
            <Route path={AppRoute.Main} element={<MainPage />}/>
            <Route path={AppRoute.Contacts} element={<ContactsPage />}/>
            <Route path={AppRoute.Login} element={<LoginPage />}/>
            <Route path={AppRoute.Quest} element={<QuestPage />}/>
            <Route
              path={AppRoute.MyQuests}
              element={
                <PrivateRoute authorizationStatus={authStatus}>
                  <MyQuestsPage />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Booking}
              element={
                <PrivateRoute authorizationStatus={authStatus}>
                  <BookingPage />
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
