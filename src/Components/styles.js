// styles.js
export const styles = {
  swiperContainer: {
    width: "189vh",
    height: "100vh",
    position: "relative",
    overflow: "hidden",
  },
  slideContent: (bgColor) => ({
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    color: "white",
    textAlign: "center",
    backgroundColor: bgColor,
    overflow: "hidden",
  }),
  centerContent: {
    zIndex: 3,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  productContainer: {
    cursor: "pointer",
    transition: "transform 0.5s ease",
  },
  productImg: {
    width: 250,
    transition: "all 0.5s ease",
  },
  slideTitle: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginTop: "1rem",
    transition: "opacity 0.3s ease",
  },
  viewBtn: {
    marginTop: "1rem",
    padding: "10px 24px",
    border: "1px solid white",
    background: "transparent",
    color: "white",
    borderRadius: 50,
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  floatingExtra: {
    position: "absolute",
    width: 80,
    opacity: 0.8,
    zIndex: 2,
    cursor: "pointer",
    transition: "all 0.5s ease",
  },
  detailButtonContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 10,
  },
  detailButton: {
    padding: "15px 30px",
    border: "2px solid white",
    background: "transparent",
    color: "white",
    borderRadius: 50,
    fontSize: "1.1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

// CSS animations
const floatingAnimation = `
  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  @keyframes floatExtra {
    0% {
      transform: translateY(0px) rotate(0deg);
    }
    33% {
      transform: translateY(-15px) rotate(5deg);
    }
    66% {
      transform: translateY(10px) rotate(-5deg);
    }
    100% {
      transform: translateY(0px) rotate(0deg);
    }
  }

  .floating {
    animation: float 3s ease-in-out infinite;
  }

  .floating-delay-1 {
    animation: float 3s ease-in-out infinite 0.5s;
  }

  .floating-delay-2 {
    animation: float 3s ease-in-out infinite 1s;
  }

  .floating-extra {
    animation: floatExtra 4s ease-in-out infinite;
  }
`;

// Inject the styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = floatingAnimation;
  document.head.appendChild(styleSheet);
}