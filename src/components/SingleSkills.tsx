import { observer } from "mobx-react";
import * as React from "react";
import { SingleSkill } from "./SingleSkill";
import { Skills } from "./state/Skills";

export const SingleSkills = observer(({skills}: {skills: Skills}) =>
    <ul>
        {
            skills.all().map((skill) => <SingleSkill skill={skill} />)
        }
    </ul>,
);
