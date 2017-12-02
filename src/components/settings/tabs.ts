import { SkillEditor } from "../SkillEditor";
import { Project } from "../state/Project";

export interface Tab {
    name: string;
    component: React.ComponentClass<{project: Project}> | React.SFC<{project: Project}>;
}

export const tabs: Tab[] = [
    {name: "スキル", component: SkillEditor },
    {name: "ステート", component: SkillEditor },
];
