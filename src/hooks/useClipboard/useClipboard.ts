import { useState } from "react";

export const useClipboard = () => {
  const [hasCopied, setHasCopied] = useState(false);
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setHasCopied(true);
  };

  return { hasCopied, handleCopy };
};
