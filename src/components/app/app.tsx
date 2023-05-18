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

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
        <Routes>
          <Route path={AppRoute.Main} element={<MainPage />}/>
          <Route path={AppRoute.Booking} element={<BookingPage />}/>
          <Route path={AppRoute.Contacts} element={<ContactsPage />}/>
          <Route path={AppRoute.Login} element={<LoginPage />}/>
          <Route path={AppRoute.MyQuests} element={<MyQuestsPage />}/>
          <Route path={AppRoute.Quest} element={<QuestPage />}/>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
