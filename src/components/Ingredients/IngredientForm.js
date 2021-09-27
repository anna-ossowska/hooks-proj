import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo((props) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');

  // const [inputState, setInputState] = useState({ title: '', amount: '' });

  // const titleChangeHandler = (e) => {
  //   // needs to be stored in a seperate variable
  //   const newTitle = e.target.value;
  //   setInputState((prev) => ({
  //     title: newTitle,
  //     amount: prev.amount,
  //   }));
  // };

  const titleChangeHandler = (e) => {
    setEnteredTitle(e.target.value);
  };

  const amountChangeHandler = (e) => {
    setEnteredAmount(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.onAddIngredient({ title: enteredTitle, amount: enteredAmount });
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              // value={inputState.title}
              value={enteredTitle}
              onChange={titleChangeHandler}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              // value={inputState.amount}
              value={enteredAmount}
              onChange={amountChangeHandler}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
