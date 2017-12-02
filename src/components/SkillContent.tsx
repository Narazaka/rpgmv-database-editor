import { toJS } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import Form from "react-jsonschema-form";
import { ItemContent } from "./ItemContent";
import { schema, uiSchema } from "./schema/Skill";
import { ItemBase } from "./state/ItemBase";
import { Project } from "./state/Project";
// import { ItemPropertyBox } from "./ItemPropertyBox";
import { Skill } from "./state/Skill";

const genOnChange = (item: ItemBase<any>) => ({formData}: {formData: any}) =>
    Object.keys(formData).forEach((name) => (item as any)[name] = formData[name]);

export const SkillContent = observer(({project, skill}: {project: Project; skill: Skill}) =>
    <ItemContent>
        <Form
            schema={schema(project)}
            uiSchema={uiSchema}
            formData={toJS(skill)}
            onChange={genOnChange(skill)} />
    </ItemContent>,
);
