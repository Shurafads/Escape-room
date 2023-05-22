import { useAppSelector } from '../../store';
import { getQuests } from '../../store/quests-data/quests-data-selectors';
import Card from '../card/card';
import { getReservationList } from '../../store/reservation-data/reservation-data-selectors';
import { useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function CardList() {

  const location = useLocation();
  const questsList = useAppSelector(getQuests);
  const reservationList = useAppSelector(getReservationList);

  return (
    <div className="cards-grid">
      {location.pathname === AppRoute.Main && questsList.map((quest) => <Card key={quest.id} quest={quest} />)}
      {location.pathname === AppRoute.MyQuests && reservationList.map((quest) => <Card key={quest.id} reservedQuest={quest} />)}
    </div>
  );
}

