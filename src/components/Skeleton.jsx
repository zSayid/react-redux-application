const ProductSkeleton = () => (
    <div
      className="card"
      style={{
        width: "18rem",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "180px",
          backgroundColor: "#e0e0e0",
          animation: "pulse 1.5s infinite",
        }}
      />
      <div className="card-body">
        <div
          style={{
            width: "70%",
            height: "20px",
            backgroundColor: "#e0e0e0",
            marginBottom: "10px",
            animation: "pulse 1.5s infinite",
          }}
        />
        <div
          style={{
            width: "50%",
            height: "15px",
            backgroundColor: "#e0e0e0",
            marginBottom: "10px",
            animation: "pulse 1.5s infinite",
          }}
        />
        <div
          style={{
            width: "90%",
            height: "15px",
            backgroundColor: "#e0e0e0",
            animation: "pulse 1.5s infinite",
          }}
        />
      </div>
    </div>
  );
  
  // Add CSS animation globally
  const style = document.createElement("style");
  style.innerHTML = `
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }`;
  document.head.appendChild(style);
  
  export default ProductSkeleton;
  