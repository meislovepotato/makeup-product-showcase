import { useState, useEffect } from "react";
import { styles } from "./styles";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 425 : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 425px)");
    const handler = (e) => setIsMobile(e.matches);
    // set initial
    setIsMobile(mq.matches);
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else mq.addListener(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else mq.removeListener(handler);
    };
  }, []);

  return (
    <header style={styles.headerContainer}>
      {/* Left Icons (hidden on mobile) */}
      {!isMobile && (
        <div className="iconBar" style={styles.iconBar}>
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
      )}

      {/* Center Logo */}
      <div style={styles.logo}>
        <span style={styles.logoText}>Product Market</span>
      </div>

      {/* Right Icons (hidden on mobile) */}
      {!isMobile && (
        <div className="iconBar" style={styles.iconBar}>
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
      )}

      {/* Mobile burger button / menu (rendered on mobile) */}
      {isMobile && (
        <div>
          <button
            className="burgerButton"
            aria-label="menu"
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
            style={styles.burgerButton}
          >
            <i className="fa-solid fa-bars"></i>
          </button>

          <div
            className={`mobileMenu ${open ? "open" : ""}`}
            role="menu"
            aria-hidden={!open}
            style={styles.mobileMenu}
          >
            <button
              role="menuitem"
              className="mobileMenuItem"
              aria-label="wishlist"
              style={styles.mobileMenuItem}
              onClick={() => setOpen(false)}
            >
              <i className="fa-regular fa-heart" />
              <span style={{ marginLeft: 10 }}>Wishlist</span>
            </button>

            <button
              role="menuitem"
              className="mobileMenuItem"
              aria-label="cart"
              style={styles.mobileMenuItem}
              onClick={() => setOpen(false)}
            >
              <i className="fa-solid fa-cart-shopping" />
              <span style={{ marginLeft: 10 }}>Cart</span>
            </button>

            <button
              role="menuitem"
              className="mobileMenuItem"
              aria-label="account"
              style={styles.mobileMenuItem}
              onClick={() => setOpen(false)}
            >
              <i className="fa-regular fa-user" />
              <span style={{ marginLeft: 10 }}>Account</span>
            </button>

            <button
              role="menuitem"
              className="mobileMenuItem"
              aria-label="search"
              style={styles.mobileMenuItem}
              onClick={() => setOpen(false)}
            >
              <i className="fa-solid fa-magnifying-glass" />
              <span style={{ marginLeft: 10 }}>Search</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
