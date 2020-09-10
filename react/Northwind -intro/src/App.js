import React from "react";
import Counter from "./components/counter";
import IncreaseCounter from "./components/increaseCounter";
import IncreaseByToCounter from "./components/increaseByToCounter";
import DecreaseCounter from "./components/decreaseCounter";
//import { decreaseCounter, increaseByTwoCounter } from './redux/actions/counterActions';

function App() {
  return (
    <div>
      <Counter></Counter>
      <IncreaseCounter></IncreaseCounter>
      <DecreaseCounter></DecreaseCounter>
      <IncreaseByToCounter></IncreaseByToCounter>
    </div>
  );
}

export default App;
