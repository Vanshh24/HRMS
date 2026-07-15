import { useCallback, useMemo, useState } from "react";

export default function Setting() {
  let [data, useData] = useState(1);
  let result = useMemo(() => {
    data * 2;
  }, [data]);

  console.log(result);

  let handleClick = useCallback(() => {
    console.log("I am handle click.");
  });

  return (
    <div>
      <button onClick={handleClick}>Click</button>
    </div>
  );
}
