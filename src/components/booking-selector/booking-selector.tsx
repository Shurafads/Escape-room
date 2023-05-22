import { ChangeEvent } from 'react';

type BookingSelectionProps = {
  day: string;
  time: string;
  isAvivable: boolean;
  onDateChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}

export default function BookingSelection({day, time, isAvivable, onDateChange}: BookingSelectionProps) {

  return (
    <label className="custom-radio booking-form__date">
      <input type="radio" id={`${day}${time}`} name="date" value={`${day}${time}`} data-date={day} data-time={time} disabled={!isAvivable} onChange={onDateChange} required/>
      <span className="custom-radio__label">{time}</span>
    </label>
  );
}
