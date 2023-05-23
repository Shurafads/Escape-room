import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from '../logo/logo';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/user-process-selectors';
import { useAppDispatch, useAppSelector } from '../../store';
import { logoutAction } from '../../store/api-action';
import { removeReservationList } from '../../store/reservation-data/reservation-data';

export default function Header() {

  const authStatus = useAppSelector(getAuthorizationStatus);
  const location = useLocation();
  const dispatch = useAppDispatch();

  const isLoginPage = location.pathname === AppRoute.Login;

  const handleOutClick = () => {
    if (authStatus === AuthorizationStatus.Auth) {
      dispatch(logoutAction());
      dispatch(removeReservationList());
    }
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
              authStatus === AuthorizationStatus.Auth &&
              <li className="main-nav__item">
                <NavLink className="link" to={AppRoute.MyQuests}>Мои бронирования</NavLink>
              </li>
            }
          </ul>
        </nav>
        <div className="header__side-nav">
          {!isLoginPage &&
            <Link
              className="btn btn--accent header__side-item"
              to={AppRoute.Login}
              onClick={handleOutClick}
            >
              {authStatus === AuthorizationStatus.Auth ? 'Выйти' : 'Войти'}
            </Link>}
          <Link className="link header__side-item header__phone-link" to="tel:88003335599">8 (000) 111-11-11</Link>
        </div>
      </div>
    </header>
  );
}
