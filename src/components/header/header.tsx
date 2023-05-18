import { Link } from 'react-router-dom';
import Logo from '../logo/logo';

export default function Header() {
  return (
    <header className="header">
      <div className="container container--size-l">
        <Logo />
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <a className="link active" href="index.html">Квесты</a>
            </li>
            <li className="main-nav__item">
              <a className="link" href="contacts.html">Контакты</a>
            </li>
            <li className="main-nav__item">
              <a className="link" href="my-quests.html">Мои бронирования</a>
            </li>
          </ul>
        </nav>
        <div className="header__side-nav">
          <Link className="btn btn--accent header__side-item" to="#">Выйти</Link>
          <Link className="link header__side-item header__phone-link" to="tel:88003335599">8 (000) 111-11-11</Link>
        </div>
      </div>
    </header>
  );
}
