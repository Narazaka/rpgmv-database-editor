import { observer } from "mobx-react";
import * as React from "react";
import { Skill } from "./state/Skill";

export const SkillContent = observer(({skill}: {skill: Skill}) =>
    <div className="ItemContent">
        {skill.id}
    </div>,
);
