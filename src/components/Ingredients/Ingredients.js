import React, { useReducer, useCallback, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const ingredientReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...state, action.ingredient];
    case 'DELETE':
      return state.filter((ing) => ing.id !== action.id);
    default:
      throw new Error('Should not get there');
  }
};

const httpReducer = (state, action) => {
  switch (action.type) {
    case 'SEND':
      return { isLoading: true, error: null };
    case 'RESPONSE':
      return { ...state, isLoading: false };
    case 'ERROR':
      return { isLoading: false, error: action.errorMsg };
    case 'CLEAR':
      return { ...state, error: null };
    default:
      throw new Error('Should not get there');
  }
};

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    isLoading: false,
    error: null,
  });

  const addIngredientHandler = useCallback((ing) => {
    dispatchHttp({ type: 'SEND' });
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
          dispatchHttp({ type: 'RESPONSE' });
          return response.json();
        }
      })
      .then((data) => {
        // .name comes from the FireBase
        dispatch({ type: 'ADD', ingredient: { id: data.name, ...ing } });
      });
  }, []);

  const loadIngredientsHandler = useCallback((filteredIngredients) => {
    dispatch({ type: 'SET', ingredients: filteredIngredients });
  }, []);

  const removeItemHandler = useCallback((ingredientId) => {
    dispatchHttp({ type: 'SEND' });
    fetch(
      `https://react-http-92c39-default-rtdb.europe-west1.firebasedatabase.app/ingredients/${ingredientId}.json`,
      {
        method: 'DELETE',
      }
    )
      .then((response) => {
        if (response.ok) {
          dispatch({ type: 'DELETE', id: ingredientId });
          dispatchHttp({ type: 'RESPONSE' });
        }
      })
      .catch((err) => {
        dispatchHttp({
          type: 'ERROR',
          errorMsg: `Something went wrong. ${err.message}`,
        });
      });
  }, []);

  const clearError = useCallback(() => {
    dispatchHttp({ type: 'CLEAR' });
  }, []);

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={removeItemHandler}
      />
    );
  }, [userIngredients, removeItemHandler]);

  return (
    <div className="App">
      {httpState.error && (
        <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>
      )}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={httpState.isLoading}
      />

      <section>
        <Search onLoadIngredients={loadIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
};

export default Ingredients;
