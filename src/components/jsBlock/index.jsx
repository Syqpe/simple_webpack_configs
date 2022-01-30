import React, { useState } from "react";

const JsBlock = () => {
    const [count, setCount] = useState(0);
    return (
        <>
            <h1>{count}</h1>
            <button
                onClick={() => {
                    setCount(count + 1);
                }}
            >
                press to increase count (JS)
            </button>
        </>
    );
};

export { JsBlock };
