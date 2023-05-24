import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { TBookingForm } from '../../types/booking';
import { ChangeEvent } from 'react';

type BookingSelectionProps = {
  date: 'tomorrow' | 'today';
  time: string;
  isAvivable: boolean;
  register: UseFormRegister<TBookingForm>;
  setValue: UseFormSetValue<TBookingForm>;
  onDateChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}

export default function BookingSelection({date, time, isAvivable, register, setValue, onDateChange}: BookingSelectionProps) {

  return (
    <label className="custom-radio booking-form__date">
      <input type="radio" id={`${date}${time}`} value={time} data-date={date} data-time={time} disabled={!isAvivable} required
        {...register('time',
          {
            onChange: (evt: ChangeEvent<HTMLInputElement>) => {
              setValue('date', date, { shouldValidate: true });
              onDateChange(evt);
            },
          })}
      />
      <span className="custom-radio__label">{time}</span>
    </label>
  );
}
