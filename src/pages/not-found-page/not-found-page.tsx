import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import classes from './not-found-page.module.css';

export default function NotFoundPage() {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>404 Страница не найдена</h1>
      <Link className={classes.link} to={AppRoute.Main}>Вернуться на главную страницу</Link>
    </div>
  );
}
