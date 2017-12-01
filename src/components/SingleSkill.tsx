import { observer } from "mobx-react";
import * as React from "react";
import { Skill } from "./state/Skill";

export const SingleSkill = observer(({skill}: {skill: Skill}) =>
    <li>
        {skill.id} {skill.name}
    </li>,
);
