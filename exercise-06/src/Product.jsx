import styles from "./Product.module.css";

export default function Product({ item, onAddToCart }) {
  return (
    <div className={styles.product}>
      <div>
        <img width={200} height={200} src={item.image} className={styles.image} />
      </div>
      <div>
        <h3>{item.name}</h3>
        <p>
          <strong>Cost: </strong>🪙{item.cost.toLocaleString("en-NZ")}
        </p>
        <button onClick={() => onAddToCart(item)}>Add to cart</button>
      </div>
    </div>
  );
}
