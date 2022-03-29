import { View, Picker } from 'react-native';
import React, { useState } from 'react';

import styles from './styles';

function DateInput({ setGivenState, setStateValid }) {
  const months = {
    January: 31,
    February: 29,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31,
  };

  function getYears() {
    const date = new Date();
    const currentYear = date.getFullYear();
    const yearsList = [];

    for (let i = currentYear - 18; i > currentYear - 168; i -= 1) {
      yearsList.push(String(i));
    }

    return yearsList;
  }

  const years = getYears();

  function dateValidator(month, day, year) {
    if (Date.parse(`${day} ${month} ${year} 00:00:00 GMT`)) return setStateValid(true);

    return setStateValid(false);
  }

  const [pickedMonth, setPickedMonth] = useState('Select Month');
  const [daysInPickedMonth, setDaysInPickedMonth] = useState([]);
  const [pickedDay, setPickedDay] = useState('Select Day');
  const [pickedYear, setPickedYear] = useState('Select Year');

  function handlePickMonth(inputMonth) {
    const days = [];

    setPickedMonth(inputMonth);

    for (let i = 1; i <= months[inputMonth]; i += 1) {
      days.push(String(i));
    }

    setDaysInPickedMonth(days);
  }

  return (
    <View>
      <Picker
        itemStyle={styles.dobPicker}
        style={styles.dobPicker}
        selectedValue={pickedMonth}
        onValueChange={(newMonth) => {
          handlePickMonth(newMonth);

          dateValidator(newMonth, pickedDay, pickedYear);

          setGivenState(Date.parse(`${pickedDay} ${newMonth} ${pickedYear} 00:00:00 GMT`));
        }}
      >
        <Picker.Item label="Select Month" value="Select Month" />
        {Object.keys(months).map((month) => (
          <Picker.Item key={`month-${month}`} label={month} value={month} />
        ))}
      </Picker>

      <Picker
        itemStyle={styles.dobPicker}
        selectedValue={pickedDay}
        onValueChange={(newDay) => {
          setPickedDay(newDay);

          dateValidator(pickedMonth, newDay, pickedYear);

          setGivenState(Date.parse(`${newDay} ${pickedMonth} ${pickedYear} 00:00:00 GMT`));
        }}
      >
        <Picker.Item label="Select Day" value="Select Day" />
        {daysInPickedMonth.map((day) => (
          <Picker.Item key={`day-${day}`} label={day} value={day} />
        ))}
      </Picker>

      <Picker
        itemStyle={styles.dobPicker}
        selectedValue={pickedYear}
        onValueChange={(newYear) => {
          setPickedYear(newYear);

          dateValidator(pickedMonth, pickedDay, newYear);

          setGivenState(Date.parse(`${pickedDay} ${pickedMonth} ${newYear} 00:00:00 GMT`));
        }}
      >
        <Picker.Item label="Select Year" value="Select Year" />
        {years.map((year) => (
          <Picker.Item key={`year-${year}`} label={year} value={year} />
        ))}
      </Picker>
    </View>
  );
}

export default DateInput;

// --== USAGE ==--

// initialise state:
// const [givenDate, setGivenDate] = useState();

// invoke component, pass setState function on props:
// <DateInput setGivenState={setGivenDate} />;
