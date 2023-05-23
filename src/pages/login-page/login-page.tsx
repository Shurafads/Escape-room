import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../store';
import { getAuthorizationStatus } from '../../store/user-process/user-process-selectors';
import { FormEvent, useRef } from 'react';
import { loginAction } from '../../store/api-action';
import { TAuthData } from '../../types/auth-data';


export default function LoginPage() {

  const mailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authStatus = useAppSelector(getAuthorizationStatus);

  if (authStatus === AuthorizationStatus.Auth) {
    return (
      <Navigate to={AppRoute.Main} />
    );
  }

  const onSubmit = (authData: TAuthData) => {
    dispatch(loginAction(authData));
    navigate(-1);
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (mailRef.current && passwordRef.current !== null) {
      onSubmit({
        email: mailRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Авторизация - Escape Room</title>
      </Helmet>
      <main className="decorated-page login">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source type="image/webp" srcSet="img/content/maniac/maniac-size-m.webp, img/content/maniac/maniac-size-m@2x.webp 2x"/>
            <img src="img/content/maniac/maniac-size-m.jpg" srcSet="img/content/maniac/maniac-size-m@2x.jpg 2x" width="1366" height="768" alt=""/>
          </picture>
        </div>
        <div className="container container--size-l">
          <div className="login__form">
            <form className="login-form" action="https://echo.htmlacademy.ru/" method="post" onSubmit={handleFormSubmit}>
              <div className="login-form__inner-wrapper">
                <h1 className="title title--size-s login-form__title">Вход</h1>
                <div className="login-form__inputs">
                  <div className="custom-input login-form__input">
                    <label className="custom-input__label" htmlFor="email">E&nbsp;&ndash;&nbsp;mail</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Адрес электронной почты"
                      ref={mailRef}
                      required
                    />
                  </div>
                  <div className="custom-input login-form__input">
                    <label className="custom-input__label" htmlFor="password">Пароль</label>
                    <input
                      type="text"
                      id="password"
                      name="password"
                      placeholder="Пароль"
                      pattern="(?=.*\d)(?=.*[A-Za-zA-Яа-яЁё]).{3,}"
                      title="Пароль должен содержать как минимум три символа включающих букву и цифру"
                      ref={passwordRef}
                      required
                    />
                  </div>
                </div>
                <button className="btn btn--accent btn--general login-form__submit" type="submit">Войти</button>
              </div>
              <label className="custom-checkbox login-form__checkbox">
                <input type="checkbox" id="id-order-agreement" name="user-agreement" required/>
                <span className="custom-checkbox__icon">
                  <svg width="20" height="17" aria-hidden="true">
                    <use xlinkHref="#icon-tick"></use>
                  </svg>
                </span>
                <span className="custom-checkbox__label">Я&nbsp;согласен с&nbsp;
                  <Link className="link link--active-silver link--underlined" to="#">правилами обработки персональных данных</Link>
                  &nbsp;и пользовательским соглашением
                </span>
              </label>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
