import classes from './no-reserved-list.module.css';

export default function NoReservedList() {
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>У вас нет забронированных квестов</h2>
    </div>
  );
}
