import { observer } from "mobx-react";
import * as React from "react";
import { DragDropContext } from "react-dnd";
import * as ReactDnDHTML5Backend from "react-dnd-html5-backend";
import { ItemListItem } from "./ItemListItem";
import { CollectionBase } from "./state/CollectionBase";

export interface ItemListProps {
    title: string;
    items: CollectionBase<any>;
    selectedId?: number;
    onClick(selectedId: number): void;
}

@(DragDropContext(ReactDnDHTML5Backend) as any)
@observer
export class ItemList extends React.Component<ItemListProps> {
    render() {
        return <div className="ItemList">
            <div className="title">
                <h1>{this.props.title}</h1>
            </div>
            <ul>
                {
                    this.props.items.all().map((item) =>
                        <ItemListItem
                            key={item.id}
                            items={this.props.items}
                            item={item}
                            selected={this.props.selectedId === item.id}
                            onClick={() => this.props.onClick(item.id)} />,
                    )
                }
            </ul>
        </div>;
    }
}
