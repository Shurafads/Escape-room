import classes from './no-card-list.module.css';

export default function NoCardList() {
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Нет доступных квестов</h2>
    </div>
  );
}
