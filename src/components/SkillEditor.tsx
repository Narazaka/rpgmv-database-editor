import { observer } from "mobx-react";
import * as React from "react";
import { SingleSkill } from "./SingleSkill";
import { Project } from "./state/Project";

export const SkillEditor = observer((props: {project: Project}) =>
    <div>
        <ul>
            {
                props.project.skills.all().map((skill) => <SingleSkill skill={skill} />)
            }
        </ul>
    </div>,
);
