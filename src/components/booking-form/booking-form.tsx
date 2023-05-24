import { Link, useNavigate } from 'react-router-dom';
import { TQuestPlaces } from '../../types/quest-places';
import BookingSelection from '../booking-selector/booking-selector';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { bookingAction } from '../../store/api-action';
import { getQuestInfo } from '../../store/quests-data/quests-data-selectors';
import { useForm } from 'react-hook-form';
import { TBookingForm } from '../../types/user-booking';
import LoadingPage from '../../pages/loading-page/loading-page';
import { AppRoute } from '../../const';

type BookingFormProps = {
  currentPlace: TQuestPlaces | null;
}

export default function BookingForm({currentPlace}: BookingFormProps) {

  const dispatch = useAppDispatch();
  const redirect = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
    setValue,
  } = useForm<TBookingForm>({
    mode: 'onBlur',
    defaultValues: {withChildren: true},
  });

  const currentQuest = useAppSelector(getQuestInfo);
  const [currentDate, setCurrentDate] = useState<string>('');

  if (!currentPlace || !currentQuest) {
    return <LoadingPage />;
  }

  const handleDateChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    if (target instanceof HTMLInputElement && target.dataset.date) {
      setCurrentDate(target.dataset.date);
    }
  };

  const handleFormSubmit = handleSubmit((data) => {
    const bookingInformation = {
      date: currentDate,
      time: data.time,
      contactPerson: data.contactPerson,
      phone: data.phone,
      withChildren: data.withChildren,
      peopleCount: Number(data.peopleCount),
      placeId: currentPlace.id,
      questId: currentQuest.id,
    };
    dispatch(bookingAction(bookingInformation));
    redirect(AppRoute.MyQuests);
  });

  return (
    <form className="booking-form" action="https://echo.htmlacademy.ru/" method="post" onSubmit={(evt) => void handleFormSubmit(evt)}>
      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Выбор даты и времени</legend>
        <fieldset className="booking-form__date-section">
          <legend className="booking-form__date-title">Сегодня</legend>
          <div className="booking-form__date-inner-wrapper">
            {currentPlace.slots.today.map((slot) => <BookingSelection key={`today${slot.time}`} setValue={setValue} register={register} date={'today'} time={slot.time} isAvivable={slot.isAvailable} onDateChange={handleDateChange}/>)}
          </div>
        </fieldset>
        <fieldset className="booking-form__date-section">
          <legend className="booking-form__date-title">Завтра</legend>
          <div className="booking-form__date-inner-wrapper">
            {currentPlace.slots.tomorrow.map((slot) => <BookingSelection key={`tomorrow${slot.time}`} setValue={setValue} register={register} date={'tomorrow'} time={slot.time} isAvivable={slot.isAvailable} onDateChange={handleDateChange}/>)}
          </div>
        </fieldset>
      </fieldset>
      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Контактная информация</legend>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="contactPerson">Ваше имя</label>
          <input type="text" id="name" placeholder="Имя"
            {...register('contactPerson',
              {
                required: 'Поле обязательно для заполнения',
                minLength: {
                  value: 1,
                  message: 'Имя должно содержать не менее 1 символа'
                },
                maxLength: {
                  value: 15,
                  message: 'Имя должно содержать не более 15 символов'
                },
              },
            )}
          />
          {errors.contactPerson && <span style={{color: '#f2890f'}}>{errors.contactPerson.message}</span>}
        </div>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="tel">Контактный телефон</label>
          <input type="tel" id="tel" placeholder="Телефон" defaultValue=''
            {...register('phone', {
              required: 'Поле обязательно для заполнения',
              pattern: {
                value: /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/,
                message: 'Введите допустимый формат номера телефона (+7(000)000-00-00)'
              }
            })}
          />
          {errors?.phone && <span style={{color: '#f2890f'}}>{errors?.phone.message}</span>}
        </div>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="person">Количество участников</label>
          <input type="number" id="person" placeholder="Количество участников" defaultValue=''
            {...register('peopleCount', {
              required: 'Поле обязательно для заполнения',
              min: {
                value: currentQuest.peopleMinMax[0],
                message: `Укажите другое количество участников, в данном квесте могут учатствовать от ${currentQuest.peopleMinMax[0]} до ${currentQuest.peopleMinMax[1]} человек`
              },
              max: {
                value: currentQuest.peopleMinMax[1],
                message: `Укажите другое количество участников, в данном квесте могут учатствовать от ${currentQuest.peopleMinMax[0]} до ${currentQuest.peopleMinMax[1]} человек`
              }
            })}
          />
          {errors?.peopleCount && <span style={{color: '#f2890f'}}>{errors?.peopleCount.message}</span>}
        </div>
        <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
          <input type="checkbox" defaultValue='' id="children" {...register('withChildren')}/>
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
        <input type="checkbox" defaultValue='' id="id-order-agreement" name="user-agreement" required/>
        <span className="custom-checkbox__icon">
          <svg width="20" height="17" aria-hidden="true">
            <use xlinkHref="#icon-tick"></use>
          </svg>
        </span>
        <span className="custom-checkbox__label">
          Я&nbsp;согласен с
          <Link className="link link--active-silver link--underlined" to="#">
            правилами обработки персональных данных
          </Link>
          &nbsp;и пользовательским соглашением
        </span>
      </label>

    </form>
  );
}

