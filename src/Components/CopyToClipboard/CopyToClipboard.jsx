import "./CopyToClipboard.css"
import { useState, useEffect } from "react";

export default function CopyToClipboard({ hexValue, className = "" }) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(hexValue);
      setIsCopied(true);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

   // To reset message after 3 seconds
  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 3000);

      return () => clearTimeout(timer);  // Cleanup
    }
  }, [isCopied]);

  return (
    <div className={`copy-container ${className}`}>
      <button 
        onClick={copyToClipboard}
        className="copy-btn"
        disabled={isCopied}
      >
   
       {isCopied ? "✅ Copied!" : "📋 Copy"}
      </button>
    </div>
  );
}