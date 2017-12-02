import { observable } from "mobx";

export interface ItemContentBase {
    id: number;
    name?: string;
}

export class ItemBase<ItemContent extends ItemContentBase> {
    id: number;
    name?: string;

    @observable private _item: ItemContent;

    constructor(item: {[name in keyof ItemContent]: ItemContent[name]}) {
        this._item = item;

        return new Proxy(this, {
            get(target, name) {
                return (target._item as any)[name];
            },
            set(target, name, value) {
                (target._item as any)[name] = value;

                return true;
            },
            has(target, name) {
                return name in (target._item as any);
            },
            ownKeys(target) {
                return Object.keys(target._item);
            },
            getOwnPropertyDescriptor(target, name) {
                return Object.getOwnPropertyDescriptor(target._item, name);
            },
        });
    }
}
