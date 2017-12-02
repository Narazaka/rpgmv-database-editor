import * as React from "react";

export const ItemPropertyBox = ({title, children}: {title: string; children?: React.ReactNode}) =>
    <div className="ItemPropertyBox">
        <strong className="title">{title}</strong>
        <div className="properties">
            {children}
        </div>
    </div>;
