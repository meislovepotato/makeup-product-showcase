import { styles } from "./styles";

export default function Header() {
  return (
    <header style={styles.headerContainer}>
      {/* Left Icons */}
      <div style={styles.iconBar}>
        <button
          className="iconButton"
          aria-label="wishlist"
          style={styles.iconButton}
        >
          <i className="fa-regular fa-heart"></i>
        </button>

        <button
          className="iconButton"
          aria-label="cart"
          style={styles.iconButton}
        >
          <i className="fa-solid fa-cart-shopping"></i>
        </button>
      </div>

      {/* Center Logo */}
      <div style={styles.logo}>
        <span style={styles.logoText}>Product Market</span>
      </div>

      {/* Right Icons */}
      <div style={styles.iconBar}>
        <button
          className="iconButton"
          aria-label="account"
          style={styles.iconButton}
        >
          <i className="fa-regular fa-user"></i>
        </button>

        <button
          className="iconButton"
          aria-label="search"
          style={styles.iconButton}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </header>
  );
}
