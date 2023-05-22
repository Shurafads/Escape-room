import { Link } from 'react-router-dom';
import { TQuestPlaces } from '../../types/quest-places';
import BookingSelection from '../booking-selector/booking-selector';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { defaultUserBooking } from '../../const';
import { useAppDispatch, useAppSelector } from '../../store';
import { bookingAction } from '../../store/api-action';
import { getQuestInfo } from '../../store/quests-data/quests-data-selectors';


type BookingFormProps = {
  currentPlace: TQuestPlaces | null;
}

export default function BookingForm({currentPlace}: BookingFormProps) {

  const dispatch = useAppDispatch();
  const currentQuest = useAppSelector(getQuestInfo);
  const [userBooking, setUserBooking] = useState(defaultUserBooking);

  useEffect(() => {
    setUserBooking(defaultUserBooking);
    if (currentPlace) {
      setUserBooking((prevState) => ({
        ...prevState,
        placeId: currentPlace.id,
      }));
    }
    if (currentQuest) {
      setUserBooking((prevState) => ({
        ...prevState,
        questId: currentQuest.id,
      }));
    }

  }, [currentPlace, currentQuest]);

  if (!currentPlace) {
    return null;
  }

  const handleDateChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const {dataset} = target;

    if (dataset.date && dataset.time) {
      const currentDate = dataset.date;
      const currentTime = dataset.time;
      setUserBooking((prevState) => ({
        ...prevState,
        date: currentDate,
        time: currentTime,
      }));
    }
  };

  const handleUserInfoChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = target;

    if (name === 'peopleCount') {
      return setUserBooking((prevState) => ({
        ...prevState,
        [name]: Number(value),
      }));
    }
    setUserBooking((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChildrenInfoChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setUserBooking((prevState) => ({
      ...prevState,
      withChildren: target.checked,
    }));
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(bookingAction(userBooking));
  };

  return (
    <form className="booking-form" action="https://echo.htmlacademy.ru/" method="post" onSubmit={handleFormSubmit}>
      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Выбор даты и времени</legend>
        <fieldset className="booking-form__date-section">
          <legend className="booking-form__date-title">Сегодня</legend>
          <div className="booking-form__date-inner-wrapper">
            {currentPlace.slots.today.map((slot) => <BookingSelection key={`today${slot.time}`} day={'today'} time={slot.time} isAvivable={slot.isAvailable} onDateChange={handleDateChange}/>)}
          </div>
        </fieldset>
        <fieldset className="booking-form__date-section">
          <legend className="booking-form__date-title">Завтра</legend>
          <div className="booking-form__date-inner-wrapper">
            {currentPlace.slots.tomorrow.map((slot) => <BookingSelection key={`tomorrow${slot.time}`} day={'tomorrow'} time={slot.time} isAvivable={slot.isAvailable} onDateChange={handleDateChange}/>)}
          </div>
        </fieldset>
      </fieldset>
      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Контактная информация</legend>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="contactPerson">Ваше имя</label>
          <input type="text" id="name" name="contactPerson" placeholder="Имя" required pattern="[А-Яа-яЁёA-Za-z'- ]{1,}" onChange={handleUserInfoChange}/>
        </div>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="phone">Контактный телефон</label>
          <input type="tel" id="tel" name="phone" placeholder="Телефон" required pattern="[0-9]{10,}" onChange={handleUserInfoChange}/>
        </div>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="peopleCount">Количество участников</label>
          <input type="number" id="person" name="peopleCount" placeholder="Количество участников" required onChange={handleUserInfoChange}/>
        </div>
        <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
          <input type="checkbox" id="children" name="children" onChange={handleChildrenInfoChange}/>
          <span className="custom-checkbox__icon">
            <svg width="20" height="17" aria-hidden="true">
              <use xlinkHref="#icon-tick"></use>
            </svg>
          </span>
          <span className="custom-checkbox__label">Со&nbsp;мной будут дети</span>
        </label>
      </fieldset>
      <button className="btn btn--accent btn--cta booking-form__submit" type="submit">Забронировать</button>
      <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--agreement">
        <input type="checkbox" id="id-order-agreement" name="user-agreement" required/>
        <span className="custom-checkbox__icon">
          <svg width="20" height="17" aria-hidden="true">
            <use xlinkHref="#icon-tick"></use>
          </svg>
        </span>
        <span className="custom-checkbox__label">
          Я&nbsp;согласен с
          <Link className="link link--active-silver link--underlined" to="#">правилами обработки персональных данных</Link>
          &nbsp;и пользовательским соглашением
        </span>
      </label>
    </form>
  );
}
