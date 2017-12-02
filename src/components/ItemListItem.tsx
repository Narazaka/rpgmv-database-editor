import { observer } from "mobx-react";
import * as React from "react";
import { ConnectDragSource, ConnectDropTarget, DragSource, DropTarget } from "react-dnd";
import { CollectionBase } from "./state/CollectionBase";
import { ItemBase } from "./state/ItemBase";

const dropTargetDecorator = DropTarget(
    "item",
    {
        drop(hoverProps: ItemListItemProps, monitor: any) {
            const dragProps: ItemListItemProps = monitor.getItem();
            hoverProps.items.exchange(hoverProps.item.id, dragProps.item.id);
        },
    },
    (connect) => ({connectDropTarget: connect.dropTarget()}),
);
const dragSourceDecorator = DragSource(
    "item",
    {
        beginDrag(props: ItemListItemProps) { return props; },
    },
    (connect) => ({connectDragSource: connect.dragSource()}),
);

export interface ItemListItemProps {
    items: CollectionBase<any>;
    item: ItemBase<any>;
    onClick?(): void;
    selected?: boolean;
}

interface DnDConnectedProps {
    connectDropTarget: ConnectDropTarget;
    connectDragSource: ConnectDragSource;
}

const zeropad = (id: number) => `0000${id}`.slice(-4);

export const ItemListItem = dropTargetDecorator(dragSourceDecorator(observer((props: ItemListItemProps) =>
    (props as any as DnDConnectedProps).connectDragSource((props as any as DnDConnectedProps).connectDropTarget(
        <li className={`ItemListItem ${props.selected ? "selected" : ""}`} onClick={props.onClick}>
            {zeropad(props.item.id)} {props.item.name}
        </li>,
    )),
)));
