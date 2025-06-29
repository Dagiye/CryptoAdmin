import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search Username or Email",
}) => {
  return (
    <div style={{ position: "relative", width: "300px" }}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "10px 40px 10px 15px",
          border: "2px solid #f8bbd9",
          borderRadius: "20px",
          fontSize: "13px",
          backgroundColor: "#ffffff",
          outline: "none",
          transition: "all 0.3s ease",
          color: "#e91e63",
          fontWeight: "400",
        }}
        placeholder={placeholder}
        onFocus={(e) => {
          e.target.style.borderColor = "#e91e63";
          e.target.style.boxShadow = "0 0 0 3px rgba(233, 30, 99, 0.1)";
          e.target.style.transform = "translateY(-1px)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#f8bbd9";
          e.target.style.boxShadow = "none";
          e.target.style.transform = "translateY(0px)";
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "15px",
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
          pointerEvents: "none",
        }}
      >
        <Search size={16} style={{ color: "#e91e63" }} />
      </div>
    </div>
  );
};

export default SearchBar;
