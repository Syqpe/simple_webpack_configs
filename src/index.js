import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import { JsBlock } from "./components/jsBlock";
import { TsBlock } from "./components/tsBlock";

import "./index.css";
import "./index.less";
import "./index.scss";

const Index = () => {
    return (
        <Fragment>
            <JsBlock />
            <TsBlock />
        </Fragment>
    );
};

ReactDOM.render(<Index />, document.getElementById("root"));
