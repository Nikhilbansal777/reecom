import { useEffect, useRef, useState } from "react";

const Practice = () => {
  const [count, setCount] = useState(0);
  let a =  useRef(0);
  const btnRef = useRef();
  useEffect(() => {
    btnRef.current.style.backgroundColor = "red";
  });

  const handleClick = () => {
    // setCount((count) => count + 1);
    a.current = a.current + 1;
    console.log(a.current)
  };
  return (
    <>
      <button ref={btnRef} onClick={handleClick}>
        Click
      </button>
      {a.current}
    </>
  );
};

export default Practice;
