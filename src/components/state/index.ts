// tslint:disable max-classes-per-file
import * as fs from "fs";
import * as path from "path";
import { IDataSkill } from "../../mv/IDataSkill";

export class StateBase {
    projectPath: string;
    skills: IDataSkill[];
    gameTitle: string;
}

export class State extends StateBase {
    setProjectPath(projectPath: string) {
        this.projectPath = projectPath;
        this.gameTitle = this.readJson("data/System.json").gameTitle;
        this.skills = this.readJson("data/Skills.json");
    }

    setState<Key extends keyof StateBase>(state: Pick<StateBase, Key>) {
        for (const key of Object.keys(state)) {
            this[key as Key] = state[key as Key];
        }
    }

    readJson<T = any>(targetPath: string) {
        const jsonPath = path.join(this.projectPath, "..", targetPath);
        const json = fs.readFileSync(jsonPath, "utf8");

        return JSON.parse(json) as T;
    }
}

// tslint:disable-next-line no-default-export
export default new State();
