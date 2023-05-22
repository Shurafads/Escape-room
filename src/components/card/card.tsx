import { Link } from 'react-router-dom';
import { TQuest } from '../../types/quests';
import { TReservationInfo } from '../../types/reservation-info';
import { questDate, questLevel } from '../../const';
import { useAppDispatch } from '../../store';
import { deleteReservationAction, } from '../../store/api-action';
import { changePlaces } from '../../store/reservation-data/reservation-data';


type CardProps = {
  quest?: TQuest;
  reservedQuest?: TReservationInfo;
}

export default function Card({quest, reservedQuest}: CardProps) {

  const dispatch = useAppDispatch();

  if (quest) {
    return (
      <div className="quest-card">
        <div className="quest-card__img">
          <picture>
            <source
              type="image/webp"
              srcSet={quest.previewImgWebp}
            />
            <img
              src={quest.previewImg}
              srcSet={quest.previewImg}
              width="344"
              height="232"
              alt="Фотография квеста."
            />
          </picture>
        </div>
        <div className="quest-card__content">
          <div className="quest-card__info-wrapper">
            <Link className="quest-card__link" to={`/quest/${quest.id}`}>
              {quest.title}
            </Link>
          </div>
          <ul className="tags quest-card__tags">
            <li className="tags__item">
              <svg width="11" height="14" aria-hidden="true">
                <use xlinkHref="#icon-person"></use>
              </svg>
              {quest.peopleMinMax[0]}&ndash;{quest.peopleMinMax[1]}&nbsp;чел
            </li>
            <li className="tags__item">
              <svg width="14" height="14" aria-hidden="true">
                <use xlinkHref="#icon-level"></use>
              </svg>
              {questLevel[quest.level]}
            </li>
          </ul>
        </div>
      </div>
    );
  }
  if (reservedQuest) {

    const handleCancelClick = () => {
      dispatch(deleteReservationAction(reservedQuest.id));
      dispatch(changePlaces(reservedQuest.id));
    };

    return (
      <div className="quest-card">
        <div className="quest-card__img">
          <picture>
            <source
              type="image/webp"
              srcSet={reservedQuest.quest.previewImgWebp}
            />
            <img
              src={reservedQuest.quest.previewImg}
              srcSet={reservedQuest.quest.previewImg}
              width="344"
              height="232"
              alt="Фотография квеста."
            />
          </picture>
        </div>
        <div className="quest-card__content">
          <div className="quest-card__info-wrapper">
            <Link className="quest-card__link" to={`/quest/${reservedQuest.quest.id}`}>{reservedQuest.quest.title}</Link>
            <span className="quest-card__info">{questDate[reservedQuest.date]},&nbsp;{reservedQuest.time}. {reservedQuest.location.address}</span>
          </div>
          <ul className="tags quest-card__tags">
            <li className="tags__item">
              <svg width="11" height="14" aria-hidden="true">
                <use xlinkHref="#icon-person"></use>
              </svg>{reservedQuest.peopleCount}&nbsp;чел
            </li>
            <li className="tags__item">
              <svg width="14" height="14" aria-hidden="true">
                <use xlinkHref="#icon-level"></use>
              </svg>
              {questLevel[reservedQuest.quest.level]}
            </li>
          </ul>
          <button className="btn btn--accent btn--secondary quest-card__btn" type="button" onClick={handleCancelClick}>Отменить</button>
        </div>
      </div>
    );
  }
  return null;
}
