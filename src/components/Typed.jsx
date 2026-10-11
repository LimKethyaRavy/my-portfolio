import { useEffect, useState } from "react";

export default function Typed({ words }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 90);
    return () => clearInterval(id);
  }, []);

  const total = words.reduce((sum, w) => sum + w.length + 14, 0);
  let k = tick % total;
  let i = 0;
  while (k >= words[i].length + 14) {
    k -= words[i].length + 14;
    i++;
  }

  return (
    <span>
      {words[i].slice(0, Math.min(k, words[i].length))}
      <span className="cursor">▍</span>
    </span>
  );
}