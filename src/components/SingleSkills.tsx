import { observer } from "mobx-react";
import * as React from "react";
import { DragDropContext } from "react-dnd";
import * as ReactDnDHTML5Backend from "react-dnd-html5-backend";
import { SingleSkill } from "./SingleSkill";
import { Skills } from "./state/Skills";

export const SingleSkills = DragDropContext(ReactDnDHTML5Backend)(observer(({skills}: {skills: Skills}) =>
    <ul>
        {
            skills.all().map((skill) =>
                <SingleSkill key={skill.id} skills={skills} skill={skill} />,
            )
        }
    </ul>,
));
