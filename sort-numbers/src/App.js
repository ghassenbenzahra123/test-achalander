import React, { useState } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [formValue, setformValue] = useState({
    numbers: '',
    orderType: 'asc'
  });
  const [fetchedData, setFetchedData] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    //remove spaces from inputs and push into array
    var finalArr = []
    let numbers = formValue.numbers.trim().split(/[ ,]+/);
    for (let i = 0; i < numbers.length; i++) {
      finalArr.push(numbers[i]);
    }
    const config = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
    await axios.post("http://localhost:8000/api/sort", {
      numbers: finalArr,
      order: formValue.orderType
    }, config)
      .then((response) => {
        setFetchedData(response.data);
      });
  }
  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }
  return (
    <form id="form" className="topBefore" onSubmit={handleSubmit}>
      <p>Enter numbers separated by space</p>
      <textarea name="numbers" rows="4" cols="50" placeholder="Type here your numbers!" value={formValue.numbers} onChange={handleChange} >
      </textarea>
      <p>Please select the sort type:</p>
      <select name="orderType" value={formValue.orderType} onChange={handleChange}>
        <option value="asc">Ascending order (from small to large)</option>
        <option value="des">Descending order (from large to small)</option>
      </select>
      <input id="submit" type="submit" value="GO!" />

      <p>Sorted numbers: </p>
      <ul>{fetchedData ? fetchedData.map((item, i) => <li key={i}>{item}</li>) : ''}</ul>
    </form>
  )
}

export default App;
