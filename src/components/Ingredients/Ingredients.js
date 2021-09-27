import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  const addIngredientHandler = (ing) => {
    setUserIngredients((prev) => {
      return [...prev, { id: Math.random().toString(), ...ing }];
    });
  };

  const removeItemHandler = (id) => {
    const updatedIngredients = userIngredients.filter((ing) => ing.id !== id);
    setUserIngredients(updatedIngredients);
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeItemHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
