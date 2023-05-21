
type BookingSelectionProps = {
  day: string;
  time: string;
  isAvivable: boolean;
}

export default function BookingSelection({day, time, isAvivable}: BookingSelectionProps) {

  return (
    <label className="custom-radio booking-form__date">
      <input type="radio" id={`${day}9h45m`} name="date" required value="today9h45m" />
      <span className="custom-radio__label">9:45</span>
    </label>
  );
}
