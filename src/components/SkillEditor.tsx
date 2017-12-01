import { observer } from "mobx-react";
import * as React from "react";
import { SingleSkills } from "./SingleSkills";
import { Project } from "./state/Project";

export const SkillEditor = observer(({project}: {project: Project}) =>
    <div>
        <SingleSkills skills={project.skills} />
    </div>,
);
