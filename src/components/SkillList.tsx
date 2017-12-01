import { observer } from "mobx-react";
import * as React from "react";
import { DragDropContext } from "react-dnd";
import * as ReactDnDHTML5Backend from "react-dnd-html5-backend";
import { SkillListItem } from "./SkillListItem";
import { Skills } from "./state/Skills";

export const SkillList = DragDropContext(ReactDnDHTML5Backend)(observer(({skills}: {skills: Skills}) =>
    <div className="SkillList">
        <div className="title">
            <h1>スキル</h1>
        </div>
        <ul>
            {
                skills.all().map((skill) =>
                    <SkillListItem key={skill.id} skills={skills} skill={skill} />,
                )
            }
        </ul>
    </div>,
));
