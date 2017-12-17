import * as fs from "fs";
import { observable } from "mobx";
import * as path from "path";
import { IDataSkill } from "../../mv/IDataSkill";
import { Animation } from "./Animation";
import { Animations } from "./Animations";
import { Skill } from "./Skill";
import { Skills } from "./Skills";
import { System } from "./System";

export class Project {
    readonly path: string;
    readonly gameTitle: string;
    @observable readonly skills: Skills;
    @observable readonly animations: Animations;
    @observable readonly system: System;

    constructor(projectPath: string) {
        this.path = projectPath;
        this.gameTitle = this.readJson("data/System.json").gameTitle;
        this.skills = new Skills(
            this.readJson<IDataSkill[]>("data/Skills.json").slice(1).map((skill) => new Skill(skill)),
        );
        this.animations = new Animations(
            this.readJson("data/Animations.json").slice(1).map((item: any) => new Animation(item)),
        );
        this.system = new System(
            this.readJson("data/System.json"),
        );
    }

    private readJson<T = any>(targetPath: string) {
        const jsonPath = path.join(this.path, "..", targetPath);
        const json = fs.readFileSync(jsonPath, "utf8");

        return JSON.parse(json) as T;
    }
}
