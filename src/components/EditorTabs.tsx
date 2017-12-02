import { observer } from "mobx-react";
import * as React from "react";
import { Tab } from "./settings/tabs";

export const EditorTabs = observer((props: {tabs: Tab[]; tabIndex: number; onClick(tabIndex: number): void}) =>
    <div className="EditorTabs">
        <ul>
            {
                props.tabs.map((tab, index) =>
                    <li
                        className={props.tabIndex === index ? "selected" : ""}
                        onClick={() => props.onClick(index)}
                    >{tab.name}</li>,
                )
            }
        </ul>
    </div>,
);
