import { toJS } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import Form from "react-jsonschema-form";
import { ItemBase } from "./state/ItemBase";
// tslint:disable-next-line no-require-imports no-var-requires
const GridField = require("react-jsonschema-form-layout");

const genOnChange = (item: ItemBase<any>) => ({formData}: {formData: any}) =>
    Object.keys(formData).forEach((name) => (item as any)[name] = formData[name]);

export interface ItemContentProps {
    schema: {};
    uiSchema?: {};
    item: ItemBase<any>;
}

export const ItemContent = observer(({schema, uiSchema, item}: ItemContentProps) =>
    <div className="ItemContent">
        <Form
            schema={schema}
            uiSchema={uiSchema}
            formData={toJS(item)}
            fields={{layout: GridField}}
            onChange={genOnChange(item)} />
    </div>,
);
