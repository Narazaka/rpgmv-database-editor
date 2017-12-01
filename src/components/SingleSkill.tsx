import { observer } from "mobx-react";
import * as React from "react";
import { ConnectDragSource, ConnectDropTarget, DragSource, DropTarget } from "react-dnd";
import { Skill } from "./state/Skill";
import { Skills } from "./state/Skills";

const dropTargetDecorator = DropTarget(
    "skill",
    {
        drop(hoverProps: SingleSkillProps, monitor: any) {
            const dragProps: any = monitor.getItem();
            hoverProps.skills.exchange(hoverProps.skill.id, dragProps.skill.id);
        },
    },
    (connect) => ({connectDropTarget: connect.dropTarget()}),
);
const dragSourceDecorator = DragSource(
    "skill",
    {
        beginDrag(props: SingleSkillProps) { return props; },
    },
    (connect) => ({connectDragSource: connect.dragSource()}),
);

export interface SingleSkillProps {
    skills: Skills;
    skill: Skill;
}

interface DnDConnectedProps {
    connectDropTarget: ConnectDropTarget;
    connectDragSource: ConnectDragSource;
}

export const SingleSkill = dropTargetDecorator(dragSourceDecorator(observer((props: SingleSkillProps) =>
    (props as any as DnDConnectedProps).connectDragSource((props as any as DnDConnectedProps).connectDropTarget(
        <li>
            {props.skill.id} {props.skill.name}
        </li>,
    )),
)));
