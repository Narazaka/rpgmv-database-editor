import { remote } from "electron";
import * as React from "react";
import { SkillEditor } from "./SkillEditor";
import state from "./state";
const dialog = remote.dialog;
const win = remote.BrowserWindow.getFocusedWindow();

export interface AppState {
    projectPath?: string;
}

export class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {};
    }

    render() {
        return <div>
            <button onClick={this.setProject}>プロジェクトを指定する</button>
            <p>{this.hasProject ? `現在のプロジェクト: [${state.gameTitle}] ${this.state.projectPath}` : ""}</p>
            {this.hasProject ? <SkillEditor projectPath={this.state.projectPath as string} /> : ""}
        </div>;
    }

    private get hasProject() { return this.state.projectPath !== undefined; }

    private setProject = () => {
        if (this.hasProject) {
            const result = dialog.showMessageBox(win, {
                type: "warning",
                buttons: ["OK", "cancel"],
                title: "プロジェクトの読み込み",
                message: "現在のプロジェクトを閉じてよろしいですか？",
            });
            if (result !== 0) return;
        }
        const projectFiles = dialog.showOpenDialog(win, {
            title: "プロジェクトの読み込み",
            filters: [
                {name: "RPGツクールMV プロジェクト (*.rpgproject)", extensions: ["rpgproject"]},
            ],
            properties: [
                "openFile",
            ],
        });
        if (projectFiles && projectFiles[0] !== undefined) {
            const projectPath = projectFiles[0];
            state.setProjectPath(projectPath);
            this.setState({projectPath});
        }
    }
}
