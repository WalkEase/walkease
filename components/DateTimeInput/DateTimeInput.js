/* eslint-disable react/prop-types */

import { View, Picker } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './styles';

function DateTimeInput({
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
    defaultHour: 'Select Hour',
    defaultMinute: 'Select Minutes',
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
  const { defaultDay, defaultYear, defaultHour, defaultMinute } = defaultValues;

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

    for (let i = currentYear; i < currentYear + 2; i += 1) {
      yearsList.push(String(i));
    }

    return yearsList;
  }

  const years = getYears();

  function getSixty() {
    const list = [];

    for (let i = 1; i <= 60; i += 1) {
      list.push(String(i));
    }

    return list;
  }

  const hours = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
  ];

  const minutes = getSixty();

  function dateValidator(month, day, year, checkHours = '00', checkMinutes = '00') {
    if (Date.parse(`${day} ${month} ${year} ${checkHours}:${checkMinutes}:00 GMT`))
      return setStateValid(true);

    return setStateValid(false);
  }

  const [pickedMonth, setPickedMonth] = useState(defaultMonth);
  const [daysInPickedMonth, setDaysInPickedMonth] = useState([]);

  const [pickedDay, setPickedDay] = useState(defaultDay);

  const [pickedYear, setPickedYear] = useState(defaultYear);

  const [pickedHour, setPickedHour] = useState(defaultHour);

  const [pickedMinute, setPickedMinute] = useState(defaultMinute);

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
      {/* MONTH PICKER */}
      <Picker
        itemStyle={styles.dobPicker}
        style={styles.dobPicker}
        selectedValue={pickedMonth}
        onValueChange={(newMonth) => {
          handlePickMonth(newMonth);

          dateValidator(newMonth, pickedDay, pickedYear);

          setGivenState(
            Date.parse(
              `${pickedDay} ${newMonth} ${pickedYear} ${pickedHour}:${pickedMinute}:00 GMT`
            )
          );
        }}
      >
        <Picker.Item label="Select Month" value="Select Month" />
        {Object.keys(months).map((month) => (
          <Picker.Item key={`month-${month}`} label={month} value={month} />
        ))}
      </Picker>

      {/* DATE PICKER */}
      <Picker
        itemStyle={styles.dobPicker}
        selectedValue={pickedDay}
        onValueChange={(newDay) => {
          setPickedDay(newDay);

          dateValidator(pickedMonth, newDay, pickedYear);

          setGivenState(
            Date.parse(
              `${newDay} ${pickedMonth} ${pickedYear} ${pickedHour}:${pickedMinute}:00 GMT`
            )
          );
        }}
      >
        <Picker.Item label="Select Day" value="Select Day" />
        {daysInPickedMonth.map((day) => (
          <Picker.Item key={`day-${day}`} label={day} value={day} />
        ))}
      </Picker>

      {/* YEAR PICKER */}
      <Picker
        itemStyle={styles.dobPicker}
        selectedValue={pickedYear}
        onValueChange={(newYear) => {
          setPickedYear(newYear);

          dateValidator(pickedMonth, pickedDay, newYear);

          setGivenState(
            Date.parse(
              `${pickedDay} ${pickedMonth} ${newYear} ${pickedHour}:${pickedMinute}:00 GMT`
            )
          );
        }}
      >
        <Picker.Item label="Select Year" value="Select Year" />
        {years.map((year) => (
          <Picker.Item key={`year-${year}`} label={year} value={year} />
        ))}
      </Picker>

      {/* HOUR PICKER */}
      <Picker
        itemStyle={styles.dobPicker}
        selectedValue={pickedHour}
        onValueChange={(newHour) => {
          setPickedHour(newHour);

          dateValidator(pickedMonth, pickedDay, pickedYear, newHour);

          setGivenState(
            Date.parse(
              `${pickedDay} ${pickedMonth} ${pickedYear} ${newHour}:${pickedMinute}:00 GMT`
            )
          );
        }}
      >
        <Picker.Item label="Select Hour" value="Select Hour" />
        {hours.map((hour) => (
          <Picker.Item key={`hour-${hour}`} label={hour} value={hour} />
        ))}
      </Picker>

      {/* MINUTE PICKER */}
      <Picker
        itemStyle={styles.dobPicker}
        selectedValue={pickedMinute}
        onValueChange={(newMinute) => {
          setPickedMinute(newMinute);

          dateValidator(pickedMonth, pickedDay, pickedYear, pickedHour, newMinute);

          setGivenState(
            Date.parse(
              `${pickedDay} ${pickedMonth} ${pickedYear} ${pickedHour}:${newMinute}:00 GMT`
            )
          );
        }}
      >
        <Picker.Item label="Select Minute" value="Select Minute" />
        {minutes.map((minute) => (
          <Picker.Item key={`minute-${minute}`} label={minute} value={minute} />
        ))}
      </Picker>
    </View>
  );
}

export default DateTimeInput;
