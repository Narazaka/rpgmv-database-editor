import { observable } from "mobx";
import { IDataEffect } from "../../mv/IDataEffect";
import { IDataSkill } from "../../mv/IDataSkill";

export class Skill implements IDataSkill {
    @observable id: number;
    @observable oldId: number;
    @observable animationId?: number;
    @observable damage?: {
        critical?: boolean;
        elementId?: number;
        formula?: string;
        type?: number;
        variance?: number;
    };
    @observable description?: string;
    @observable effects?: IDataEffect[];
    @observable hitType?: number;
    @observable iconIndex?: number;
    @observable message1?: string;
    @observable message2?: string;
    @observable mpCost?: number;
    @observable name?: string;
    @observable note?: string;
    @observable occasion?: number;
    @observable repeats?: number;
    @observable requiredWtypeId1?: number;
    @observable requiredWtypeId2?: number;
    @observable scope?: number;
    @observable speed?: number;
    @observable stypeId?: number;
    @observable successRate?: number;
    @observable tpCost?: number;
    @observable tpGain?: number;
    @observable meta?: any;

    constructor(skill: IDataSkill) {
        for (const name of Object.keys(skill) as Array<keyof IDataSkill>) {
            this[name] = skill[name];
        }
        this.oldId = skill.id as number;
    }
}
