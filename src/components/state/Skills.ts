import { action, observable } from "mobx";
import { Skill } from "./Skill";

export class Skills {
    @observable private skills: Skill[];

    constructor(skills: Skill[]) {
        this.skills = skills;
    }

    skill = (id: number) => this.skills.find((skill) => skill.id === id);

    all = () => this.skills;

    @action
    exchange = (srcId: number, dstId: number) => {
        if (srcId === dstId) return;
        const srcIndex = this.skills.findIndex((skill) => skill.id === srcId);
        const dstIndex = this.skills.findIndex((skill) => skill.id === dstId);
        const [index1, index2] = srcIndex <= dstIndex ? [srcIndex, dstIndex] : [dstIndex, srcIndex];
        const [skill2] = this.skills.splice(index2, 1);
        this.skills.splice(index1, 0, skill2);
        const [skill1] = this.skills.splice(index1 + 1, 1);
        this.skills.splice(index2, 0, skill1);
        const skill1OldId = skill1.id;
        skill1.id = skill2.id;
        skill2.id = skill1OldId;
    }
}
