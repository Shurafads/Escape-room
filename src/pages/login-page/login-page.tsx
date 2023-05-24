import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../store';
import { getAuthorizationStatus } from '../../store/user-process/user-process-selectors';
import { loginAction } from '../../store/api-action';
import { TAuthorizationData } from '../../types/auth-data';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useHistoryRedirect } from '../../hooks/use-history-redirect';


export default function LoginPage() {

  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const { returnUrl } = useHistoryRedirect();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<TAuthorizationData>({mode: 'onBlur'});

  useEffect(() => {
    let isMounted = true;

    if (isMounted && authorizationStatus === AuthorizationStatus.Auth) {
      returnUrl();
    }

    return () => {
      isMounted = false;
    };
  }, [authorizationStatus, returnUrl]);

  const handleFormSubmit = handleSubmit((data) => {
    const userInformation = {
      email: data.email,
      password: data.password,
    };
    dispatch(loginAction(userInformation));
  });

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
            <form className="login-form" action="https://echo.htmlacademy.ru/" method="post" onSubmit={(evt) => void handleFormSubmit(evt)}>
              <div className="login-form__inner-wrapper">
                <h1 className="title title--size-s login-form__title">Вход</h1>
                <div className="login-form__inputs">
                  <div className="custom-input login-form__input">
                    <label className="custom-input__label" htmlFor="email">E&nbsp;&ndash;&nbsp;mail</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Адрес электронной почты"
                      {...register('email', {
                        required: 'Поле обязательно для заполнения',
                        pattern: {
                          value: /.+@.+\..+/i,
                          message: 'Не верный формат электронной почты'
                        }
                      })}
                    />
                    {errors.email && <span style={{color: '#f2890f'}}>{errors.email.message}</span>}
                  </div>
                  <div className="custom-input login-form__input">
                    <label className="custom-input__label" htmlFor="password">Пароль</label>
                    <input
                      type="text"
                      id="password"
                      placeholder="Пароль"
                      title="Пароль должен содержать как минимум три символа включающих букву и цифру"
                      {...register('password', {
                        required: 'Поле обязательно для заполнения',
                        pattern: {
                          value: /^(?=.*[A-Za-zA-Яа-яЁё])(?=.*\d)[A-Za-zA-Яа-яЁё\d]{3,}$/g,
                          message: 'Пароль должен состоять минимум из 1 буквы и 1 цифры, не менее 3 символов'
                        }})}
                    />
                    {errors.password && <span style={{color: '#f2890f'}}>{errors.password.message}</span>}
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
