import { Text, View, Picker } from 'react-native';
import React, { useState } from 'react';

function DateInput() {
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

  const [pickedMonth, setPickedMonth] = useState('Select Month');
  const [daysInPickedMonth, setDaysInPickedMonth] = useState([]);
  const [pickedDay, setPickedDay] = useState('Select Day');

  function handlePickMonth(inputMonth) {
    const days = [];

    for (let i = 1; i <= months[inputMonth]; i += 1) {
      days.push(i);
    }

    setDaysInPickedMonth(days);

    console.log('days array = ', days);
  }

  return (
    <View>
      <Picker selectedValue={pickedMonth} onValueChange={handlePickMonth}>
        <Picker.Item label="Select Month" value="Select Month" />
        {Object.keys(months).map((month) => (
          <Picker.Item key={month} label={month} value={month} />
        ))}
      </Picker>
      <Picker>
        <Picker.Item label="Select Day" value="Select Day" />
        {months[pickedMonth]}
      </Picker>
    </View>
  );
}

export default DateInput;
