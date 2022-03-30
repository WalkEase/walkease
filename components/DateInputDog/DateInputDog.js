import { View, Picker } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './styles';

function DateInputDog({
  setGivenState = () => {
    console.warn("WARNING: No state setting function found for 'setGivenState' property");
  },
  setStateValid = () => {
    console.warn("WARNING: No state setting function found for 'setStateValid' property");
  },
  defaultValues = {
    defaultMonthToParse: 'Select Month',
    defaultDay: 'Select Day',
    defaultYear: 'Select Year',
  },
}) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const defaultMonth = monthNames[defaultValues.defaultMonth];
  const { defaultDay, defaultYear } = defaultValues;

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

    for (let i = currentYear - 1; i > currentYear - 30; i -= 1) {
      yearsList.push(String(i));
    }

    return yearsList;
  }

  const years = getYears();

  function dateValidator(month, day, year) {
    if (Date.parse(`${day} ${month} ${year} 00:00:00 GMT`)) return setStateValid(true);

    return setStateValid(false);
  }

  const [pickedMonth, setPickedMonth] = useState(defaultMonth);
  const [daysInPickedMonth, setDaysInPickedMonth] = useState([]);
  const [pickedDay, setPickedDay] = useState(defaultDay);
  const [pickedYear, setPickedYear] = useState(defaultYear);

  function handlePickMonth(inputMonth) {
    const days = [];

    setPickedMonth(inputMonth);

    for (let i = 1; i <= months[inputMonth]; i += 1) {
      days.push(String(i));
    }

    setDaysInPickedMonth(days);
  }

  useEffect(() => {
    if (defaultMonth !== 'Select Month') handlePickMonth(defaultMonth);
  }, []);

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

export default DateInputDog;
