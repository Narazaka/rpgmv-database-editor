import { IDataEffect } from "../../mv/IDataEffect";
import { IDataSkill } from "../../mv/IDataSkill";
import { ItemBase } from "./ItemBase";

export class Skill extends ItemBase<IDataSkill> implements IDataSkill {
    id: number;
    animationId?: number;
    damage?: {
        critical?: boolean;
        elementId?: number;
        formula?: string;
        type?: number;
        variance?: number;
    };
    description?: string;
    effects?: IDataEffect[];
    hitType?: number;
    iconIndex?: number;
    message1?: string;
    message2?: string;
    mpCost?: number;
    name?: string;
    note?: string;
    occasion?: number;
    repeats?: number;
    requiredWtypeId1?: number;
    requiredWtypeId2?: number;
    scope?: number;
    speed?: number;
    stypeId?: number;
    successRate?: number;
    tpCost?: number;
    tpGain?: number;
    meta?: any;
}
