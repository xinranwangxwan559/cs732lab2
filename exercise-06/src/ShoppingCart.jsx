import styles from "./ShoppingCart.module.css";

/**
 * Displays the items in user's shopping cart, grouped by item - i.e. instead of displaying "Abra, Abra, Abra", it would display "Abra x3".
 * Also displays the total cost of items in the cart.
 */
export default function ShoppingCart({ items }) {
  const totalCost = items.map((item) => item.cost).reduce((prev, cost) => prev + cost, 0);
  const groups = groupItems(items);

  return (
    <div className={styles.cart}>
      <h3>My cart</h3>
      {groups.map((group, index) => (
        <ShoppingCartItem key={index} group={group} />
      ))}

      <p style={{ alignSelf: "flex-end" }}>
        <strong>Total cost:</strong> 🪙{totalCost.toLocaleString("en-NZ")}
      </p>
    </div>
  );
}

function ShoppingCartItem({ group }) {
  const { item, count } = group;
  return (
    <div className={styles.cartItem}>
      <img width={50} height={50} src={item.image} className={styles.image} />
      <span style={{ flexGrow: 1 }}>
        <strong>{item.name}</strong>
      </span>
      <span>x {count}</span>
    </div>
  );
}

/**
 * Takes a list of products to purchase, and groups them by item name, with a "count" of each item.
 */
function groupItems(items) {
  const groupedItems = [];
  items.forEach((item) => {
    const group = groupedItems.find((g) => g.item.name === item.name);
    if (group) {
      group.count++;
    } else {
      groupedItems.push({ item, count: 1 });
    }
  });
  return groupedItems;
}
