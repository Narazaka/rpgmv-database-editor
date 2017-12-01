import * as fs from "fs";
import { observable } from "mobx";
import * as path from "path";
import { IDataSkill } from "../../mv/IDataSkill";
import { Skill } from "./Skill";
import { Skills } from "./Skills";

export class Project {
    readonly path: string;
    readonly gameTitle: string;
    @observable readonly skills: Skills;

    constructor(projectPath: string) {
        this.path = projectPath;
        this.gameTitle = this.readJson("data/System.json").gameTitle;
        this.skills = new Skills(
            this.readJson<IDataSkill[]>("data/Skills.json").slice(1).map((skill) => new Skill(skill)),
        );
    }

    private readJson<T = any>(targetPath: string) {
        const jsonPath = path.join(this.path, "..", targetPath);
        const json = fs.readFileSync(jsonPath, "utf8");

        return JSON.parse(json) as T;
    }
}
