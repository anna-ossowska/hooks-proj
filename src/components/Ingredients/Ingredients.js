import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  useEffect(() => {
    fetch(
      'https://react-http-92c39-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json'
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        const loadedIngredients = [];
        for (const key in data) {
          loadedIngredients.push({
            id: key,
            title: data[key].title,
            amount: data[key].amount,
          });
        }
        setUserIngredients(loadedIngredients);
      });
  }, []);

  const addIngredientHandler = (ing) => {
    fetch(
      'https://react-http-92c39-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json',
      {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(ing),
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        // .name comes from the FireBase
        setUserIngredients((prev) => [...prev, { id: data.name, ...ing }]);
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
