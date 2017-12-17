import { ItemAnyBase } from "./ItemAnyBase";

export interface ItemContentBase {
    id: number;
    name?: string;
}

export class ItemBase<ItemContent extends ItemContentBase> extends ItemAnyBase<ItemContent> {
    id: number;
    name?: string;
}
