import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from '../logo/logo';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/user-process-selectors';
import { useAppDispatch, useAppSelector } from '../../store';
import { logoutAction } from '../../store/api-action';
import { removeReservationList } from '../../store/reservation-data/reservation-data';

export default function Header() {

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleOutClick = () => {
    dispatch(logoutAction());
    dispatch(removeReservationList());
  };

  return (
    <header className="header">
      <div className="container container--size-l">
        <Logo />
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <NavLink className="link" to={AppRoute.Main} end>Квесты</NavLink>
            </li>
            <li className="main-nav__item">
              <NavLink className="link" to={AppRoute.Contacts}>Контакты</NavLink>
            </li>
            {
              authorizationStatus === AuthorizationStatus.Auth &&
              <li className="main-nav__item">
                <NavLink className="link" to={AppRoute.MyQuests}>Мои бронирования</NavLink>
              </li>
            }
          </ul>
        </nav>
        <div className="header__side-nav">
          {authorizationStatus === AuthorizationStatus.Auth &&
            <Link className="btn btn--accent header__side-item" to="#" onClick={handleOutClick}>Выйти</Link>}
          {authorizationStatus === AuthorizationStatus.NoAuth && location.pathname !== AppRoute.Login &&
            <Link className="btn header__side-item header__login-btn" to="/login">Вход</Link>}
          <a className="link header__side-item header__phone-link" href="tel:88003335599">8 (000) 111-11-11</a>
        </div>
      </div>
    </header>
  );
}
