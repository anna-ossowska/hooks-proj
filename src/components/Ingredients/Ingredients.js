import React, { useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const addIngredientHandler = (ing) => {
    setIsLoading(true);
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
          setIsLoading(false);
          return response.json();
        }
      })
      .then((data) => {
        // .name comes from the FireBase
        setUserIngredients((prev) => [...prev, { id: data.name, ...ing }]);
      });
  };

  const loadIngredientsHandler = useCallback((filteredIngredients) => {
    setUserIngredients(filteredIngredients);
  }, []);

  const removeItemHandler = (id) => {
    setIsLoading(true);
    fetch(
      `https://react-http-92c39-default-rtdb.europe-west1.firebasedatabase.app/ingredients/${id}.jso`,
      {
        method: 'DELETE',
      }
    )
      .then((response) => {
        if (response.ok) {
          setIsLoading(false);
          setUserIngredients((prev) => prev.filter((ing) => ing.id !== id));
        }
      })
      .catch((err) => {
        // These two lines run synchronously
        // But React batches two states together and produces ONE render cycle
        setError(`Something went wrong. ${err.message}.`);
        setIsLoading(false);
      });
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={loadIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeItemHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
