import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function Logo() {
  const location = useLocation();

  if (location.pathname !== AppRoute.Main) {
    return (
      <Link className="logo header__logo" to={AppRoute.Main}>
        <svg width="134" height="52" aria-hidden="true">
          <use xlinkHref="#logo"></use>
        </svg>
      </Link>
    );
  }

  return (
    <span className="logo header__logo">
      <svg width="134" height="52" aria-hidden="true">
        <use xlinkHref="#logo"></use>
      </svg>
    </span>
  );
}
