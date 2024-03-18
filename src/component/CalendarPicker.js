import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const CalendarPicker = ({onDateSelect}) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
      setSelectedDate(date);
      onDateSelect(date);
    };
  

  return (
    <div>
        <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="MMMM d, yyyy h:mm aa"
      />

    </div>
  )
}

export default CalendarPicker
