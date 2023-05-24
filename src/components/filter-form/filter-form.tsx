import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../store';
import { filterQuestsAction } from '../../store/quests-data/quests-data';
import { MouseEvent } from 'react';

export default function FilterForm() {

  const dispatch = useAppDispatch();

  const [filter, setFilter] = useState({type: 'all', level: 'any'});

  const handleFilterClick = ({target}: MouseEvent<HTMLInputElement>) => {

    if (target instanceof HTMLInputElement) {
      setFilter((prevState) => ({
        ...prevState,
        [target.name]: target.id,
      }));
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(filterQuestsAction(filter));
    }

    return () => {
      isMounted = false;
    };
  }, [filter, dispatch]);

  return (
    <form className="filter" action="#" method="get">
      <fieldset className="filter__section">
        <legend className="visually-hidden">Тематика</legend>
        <ul className="filter__list">
          <li className="filter__item">
            <input type="radio" name="type" id="all" defaultChecked onClick={handleFilterClick}/>
            <label className="filter__label" htmlFor="all">
              <svg className="filter__icon" width="26" height="30" aria-hidden="true">
                <use xlinkHref="#icon-all-quests"></use>
              </svg><span className="filter__label-text">Все квесты</span>
            </label>
          </li>
          <li className="filter__item">
            <input type="radio" name="type" id="adventure" onClick={handleFilterClick}/>
            <label className="filter__label" htmlFor="adventure">
              <svg className="filter__icon" width="36" height="30" aria-hidden="true">
                <use xlinkHref="#icon-adventure"></use>
              </svg><span className="filter__label-text">Приключения</span>
            </label>
          </li>
          <li className="filter__item">
            <input type="radio" name="type" id="horror" onClick={handleFilterClick}/>
            <label className="filter__label" htmlFor="horror">
              <svg className="filter__icon" width="30" height="30" aria-hidden="true">
                <use xlinkHref="#icon-horror"></use>
              </svg><span className="filter__label-text">Ужасы</span>
            </label>
          </li>
          <li className="filter__item">
            <input type="radio" name="type" id="mystic" onClick={handleFilterClick}/>
            <label className="filter__label" htmlFor="mystic">
              <svg className="filter__icon" width="30" height="30" aria-hidden="true">
                <use xlinkHref="#icon-mystic"></use>
              </svg><span className="filter__label-text">Мистика</span>
            </label>
          </li>
          <li className="filter__item">
            <input type="radio" name="type" id="detective" onClick={handleFilterClick}/>
            <label className="filter__label" htmlFor="detective">
              <svg className="filter__icon" width="40" height="30" aria-hidden="true">
                <use xlinkHref="#icon-detective"></use>
              </svg><span className="filter__label-text">Детектив</span>
            </label>
          </li>
          <li className="filter__item">
            <input type="radio" name="type" id="sci-fi" onClick={handleFilterClick}/>
            <label className="filter__label" htmlFor="sci-fi">
              <svg className="filter__icon" width="28" height="30" aria-hidden="true">
                <use xlinkHref="#icon-sci-fi"></use>
              </svg><span className="filter__label-text">Sci-fi</span>
            </label>
          </li>
        </ul>
      </fieldset>
      <fieldset className="filter__section">
        <legend className="visually-hidden">Сложность</legend>
        <ul className="filter__list">
          <li className="filter__item">
            <input type="radio" name="level" id="any" defaultChecked onClick={handleFilterClick}/>
            <label className="filter__label" htmlFor="any"><span className="filter__label-text">Любой</span>
            </label>
          </li>
          <li className="filter__item">
            <input type="radio" name="level" id="easy" onClick={handleFilterClick}/>
            <label className="filter__label" htmlFor="easy"><span className="filter__label-text">Лёгкий</span>
            </label>
          </li>
          <li className="filter__item">
            <input type="radio" name="level" id="medium" onClick={handleFilterClick}/>
            <label className="filter__label" htmlFor="medium"><span className="filter__label-text">Средний</span>
            </label>
          </li>
          <li className="filter__item">
            <input type="radio" name="level" id="hard" onClick={handleFilterClick}/>
            <label className="filter__label" htmlFor="hard"><span className="filter__label-text">Сложный</span>
            </label>
          </li>
        </ul>
      </fieldset>
    </form>
  );
}
