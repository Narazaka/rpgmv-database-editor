import { observable } from "mobx";
import { Skill } from "./Skill";

export class Skills {
    @observable private skills: Skill[];

    constructor(skills: Skill[]) {
        this.skills = skills;
    }

    skill = (id: number) => this.skills.find((skill) => skill.id === id);

    all = () => this.skills;
}
