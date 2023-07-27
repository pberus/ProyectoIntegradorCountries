import Card from "../Card/Card";
import React from "react";
import style from "./Cards.module.css";

const Cards = ({ characters, onClose }) => {
  return (
    <div className={style.cardsContainer}>
      {characters?.map((character) => {
        return (
          <Card key={character.id} character={character} onClose={onClose} />
        );
      })}
    </div>
  );
};

export default Cards;