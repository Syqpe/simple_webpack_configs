import React, { useState, FC } from "react";

const TsBlock: FC = () => {
    const [count, setCount] = useState<number>(0);
    return (
        <>
            <h1>{count}</h1>
            <button
                onClick={() => {
                    setCount(count + 1);
                }}
            >
                press to increase count (TS)
            </button>
        </>
    );
};

export { TsBlock };
