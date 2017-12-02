import { observer } from "mobx-react";
import * as React from "react";
import { ItemContent } from "./ItemContent";
import { ItemPropertyBox } from "./ItemPropertyBox";
import { Skill } from "./state/Skill";

export const SkillContent = observer(({skill}: {skill: Skill}) =>
    <ItemContent>
        <ItemPropertyBox title="基本設定">
            {skill.name}
        </ItemPropertyBox>
    </ItemContent>,
);
