import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Button click effect styles
  const getButtonStyle = (baseStyle) => ({
    ...baseStyle,
    transition: "all 0.1s ease",
    transform: "translateY(0px)",
    boxShadow: baseStyle.boxShadow || "0 1px 2px rgba(0,0,0,0.08)",
  });

  const handleButtonMouseDown = (e) => {
    e.target.style.transform = "translateY(1px)";
    e.target.style.boxShadow = "0 1px 1px rgba(0,0,0,0.15)";
  };

  const handleButtonMouseUp = (e) => {
    e.target.style.transform = "translateY(0px)";
    const isActive = e.target.textContent == currentPage;
    e.target.style.boxShadow = isActive
      ? "0 2px 6px rgba(233, 30, 99, 0.3)"
      : "0 1px 2px rgba(0,0,0,0.08)";
  };

  const handleButtonMouseLeave = (e) => {
    e.target.style.transform = "translateY(0px)";
    const isActive = e.target.textContent == currentPage;
    e.target.style.boxShadow = isActive
      ? "0 2px 6px rgba(233, 30, 99, 0.3)"
      : "0 1px 2px rgba(0,0,0,0.08)";
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          onMouseDown={handleButtonMouseDown}
          onMouseUp={handleButtonMouseUp}
          onMouseLeave={handleButtonMouseLeave}
          style={getButtonStyle({
            padding: "8px 12px",
            margin: "0 3px",
            backgroundColor: currentPage === i ? "#e91e63" : "#ffffff",
            color: currentPage === i ? "#ffffff" : "#666666",
            cursor: "pointer",
            borderRadius: "6px",
            fontSize: "13px",
            fontWeight: "500",
            minWidth: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #e9ecef",
            boxShadow:
              currentPage === i
                ? "0 2px 6px rgba(233, 30, 99, 0.3)"
                : "0 1px 2px rgba(0,0,0,0.08)",
            outline: "none",
          })}
          onMouseEnter={(e) => {
            if (currentPage !== i) {
              e.target.style.backgroundColor = "#f8f9fa";
              e.target.style.borderColor = "#e91e63";
            }
          }}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        marginTop: "25px",
        padding: "15px 0",
      }}
    >
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        onMouseDown={currentPage === 1 ? undefined : handleButtonMouseDown}
        onMouseUp={currentPage === 1 ? undefined : handleButtonMouseUp}
        onMouseLeave={currentPage === 1 ? undefined : handleButtonMouseLeave}
        style={getButtonStyle({
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "8px 15px",
          backgroundColor: "#ffffff",
          color: currentPage === 1 ? "#adb5bd" : "#666666",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
          borderRadius: "6px",
          fontSize: "13px",
          fontWeight: "500",
          height: "36px",
          border: "1px solid #e9ecef",
          boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
          outline: "none",
        })}
        onMouseEnter={(e) => {
          if (currentPage !== 1) {
            e.target.style.backgroundColor = "#f8f9fa";
            e.target.style.borderColor = "#e91e63";
          }
        }}
      >
        <span>Previous</span>
      </button>

      <div style={{ display: "flex", gap: "5px" }}>{renderPageNumbers()}</div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        onMouseDown={
          currentPage === totalPages ? undefined : handleButtonMouseDown
        }
        onMouseUp={currentPage === totalPages ? undefined : handleButtonMouseUp}
        onMouseLeave={
          currentPage === totalPages ? undefined : handleButtonMouseLeave
        }
        style={getButtonStyle({
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "8px 15px",
          backgroundColor: "#ffffff",
          color: currentPage === totalPages ? "#adb5bd" : "#666666",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          borderRadius: "6px",
          fontSize: "13px",
          fontWeight: "500",
          height: "36px",
          border: "1px solid #e9ecef",
          boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
          outline: "none",
        })}
        onMouseEnter={(e) => {
          if (currentPage !== totalPages) {
            e.target.style.backgroundColor = "#f8f9fa";
            e.target.style.borderColor = "#e91e63";
          }
        }}
      >
        <span>Next</span>
      </button>
    </div>
  );
};

export default Pagination;
