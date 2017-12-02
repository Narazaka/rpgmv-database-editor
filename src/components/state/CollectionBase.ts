import { action, observable } from "mobx";
import { ItemBase } from "./ItemBase";

export class CollectionBase<Item extends ItemBase<any>> {
    @observable private items: Item[];

    constructor(items: Item[]) {
        this.items = items;
    }

    item = (id: number) => this.items.find((item) => item.id === id) as Item;

    all = () => this.items;

    @action
    exchange = (srcId: number, dstId: number) => {
        if (srcId === dstId) return;
        const srcIndex = this.items.findIndex((item) => item.id === srcId);
        const dstIndex = this.items.findIndex((item) => item.id === dstId);
        const [index1, index2] = srcIndex <= dstIndex ? [srcIndex, dstIndex] : [dstIndex, srcIndex];
        const [item2] = this.items.splice(index2, 1);
        this.items.splice(index1, 0, item2);
        const [item1] = this.items.splice(index1 + 1, 1);
        this.items.splice(index2, 0, item1);
        const item1OldId = item1.id;
        item1.id = item2.id;
        item2.id = item1OldId;
    }
}
