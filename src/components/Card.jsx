import "../styles/Card.css";

function Card({ id, name, image, onCardClick }) {
  return (
    <div className="card" onClick={() => onCardClick(id)}>
      <img src={image} alt={name} />
      <p className="card-name">{name}</p>
    </div>
  );
}

export default Card;
