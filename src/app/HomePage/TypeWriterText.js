// components/TypewriterText.js
import { useEffect, useState } from 'react';

export default function TypewriterText() {
  const [text, setText] = useState('');
  const fullText = "Crafting stories, one word at a time."; // The text to be displayed

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index + 1));
      index += 1;
      if (index === fullText.length) clearInterval(interval);
    }, 200); // Adjust typing speed here

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="font-mono text-green-400 text-2xl whitespace-nowrap">
      {text}
    </h1>
  );
}