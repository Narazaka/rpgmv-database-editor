import { observer } from "mobx-react";
import * as React from "react";
import { ConnectDragSource, ConnectDropTarget, DragSource, DropTarget } from "react-dnd";
import { Skill } from "./state/Skill";
import { Skills } from "./state/Skills";

const dropTargetDecorator = DropTarget(
    "skill",
    {
        drop(hoverProps: SkillListItemProps, monitor: any) {
            const dragProps: any = monitor.getItem();
            hoverProps.skills.exchange(hoverProps.skill.id, dragProps.skill.id);
        },
    },
    (connect) => ({connectDropTarget: connect.dropTarget()}),
);
const dragSourceDecorator = DragSource(
    "skill",
    {
        beginDrag(props: SkillListItemProps) { return props; },
    },
    (connect) => ({connectDragSource: connect.dragSource()}),
);

export interface SkillListItemProps {
    skills: Skills;
    skill: Skill;
    onClick?(): void;
    selected?: boolean;
}

interface DnDConnectedProps {
    connectDropTarget: ConnectDropTarget;
    connectDragSource: ConnectDragSource;
}

const zeropad = (id: number) => `0000${id}`.slice(-4);

export const SkillListItem = dropTargetDecorator(dragSourceDecorator(observer((props: SkillListItemProps) =>
    (props as any as DnDConnectedProps).connectDragSource((props as any as DnDConnectedProps).connectDropTarget(
        <li className={`SkillListItem ${props.selected ? "selected" : ""}`} onClick={props.onClick}>
            {zeropad(props.skill.id)} {props.skill.name}
        </li>,
    )),
)));
