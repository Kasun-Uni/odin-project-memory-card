import Card from "./Card.jsx";
import "../styles/CardGrid.css";

function CardGrid({ cards, onCardClick }) {
  return (
    <div className="card-grid">
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          name={card.name}
          image={card.image}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
}

export default CardGrid;
