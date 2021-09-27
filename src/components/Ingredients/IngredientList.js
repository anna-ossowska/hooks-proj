import React from 'react';

import './IngredientList.css';

const IngredientList = (props) => {
  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>
        {props.ingredients.map((ing) => (
          <li key={ing.id} onClick={props.onRemoveItem.bind(null, ing.id)}>
            <span>{ing.title}</span>
            <span>{ing.amount}x</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IngredientList;
