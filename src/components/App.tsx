import { remote } from "electron";
import * as React from "react";
import { SkillEditor } from "./SkillEditor";
import { Project } from "./state/Project";
const dialog = remote.dialog;
const win = remote.BrowserWindow.getFocusedWindow();

export interface AppState {
    project?: Project;
}

export class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {};
    }

    render() {
        return <div>
            <button onClick={this.setProject}>プロジェクトを指定する</button>
            <p>{this.state.project ? `現在のプロジェクト: [${this.state.project.gameTitle}] ${this.state.project.path}` : ""}</p>
            {this.state.project ? <SkillEditor project={this.state.project} /> : ""}
        </div>;
    }

    private setProject = () => {
        if (this.state.project) {
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
            const project = new Project(projectPath);
            this.setState({project});
        }
    }
}
