import { observer } from "mobx-react";
import * as React from "react";
import { SkillList } from "./SkillList";
import { Project } from "./state/Project";

export const SkillEditor = observer(({project}: {project: Project}) =>
    <div className="SkillEditor">
        <SkillList skills={project.skills} />
    </div>,
);
