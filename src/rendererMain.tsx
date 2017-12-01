import * as React from "react";
import { render } from "react-dom";
import { App } from "./components/App";

window.addEventListener("DOMContentLoaded", () =>
    render(
        <App />,
        document.getElementsByTagName("body")[0],
    ),
);
