import { Route, Routes } from 'react-router-dom';
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
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

function App(): JSX.Element {

  return (
    <HistoryRouter history={browserHistory}>
      <HelmetProvider>
        <div className="wrapper">
          <Header />
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path={AppRoute.MyQuests} element={<MyQuestsPage />} />
              <Route path={AppRoute.Booking} element={<BookingPage />} />
            </Route>
            <Route path={AppRoute.Main} element={<MainPage />}/>
            <Route path={AppRoute.Contacts} element={<ContactsPage />}/>
            <Route path={AppRoute.Login} element={<LoginPage />}/>
            <Route path={AppRoute.Quest} element={<QuestPage />}/>
            <Route path='*' element={<NotFoundPage />}/>
          </Routes>
          <Footer />
        </div>
      </HelmetProvider>
    </HistoryRouter>
  );
}

export default App;
