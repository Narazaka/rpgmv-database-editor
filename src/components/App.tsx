import { remote } from "electron";
import * as React from "react";
import { Editor } from "./Editor";
import { Project } from "./state/Project";
const dialog = remote.dialog;
const Menu = remote.Menu;
const win = remote.BrowserWindow.getFocusedWindow();

export interface AppState {
    project?: Project;
}

export class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        win.setMenu(this.menu());
        win.setTitle("データベース");
    }

    render() {
        return (
            <div className="App">
                {
                    this.state.project ?
                    <Editor project={this.state.project} /> :
                    <div className="ProjectControl">
                        <button onClick={this.setProject}>プロジェクトを開く…</button>
                    </div>
                }
            </div>
        );
    }

    private menu() {
        return Menu.buildFromTemplate([
            {label: "ファイル", submenu: [
                {label: "プロジェクトを開く…", accelerator: "Ctrl+O", click: this.setProject},
            ]},
            {label: "ツール", submenu: [
                {label: "開発者ツール", accelerator: "Ctrl+D", click() { win.webContents.openDevTools(); }},
            ]},
        ]);
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
        // tslint:disable-next-line strict-type-predicates
        if (projectFiles && projectFiles[0] !== undefined) {
            const projectPath = projectFiles[0];
            const project = new Project(projectPath);
            this.setState({project});
            win.setTitle(`データベース - ${project.gameTitle} [${project.path}]`);
        }
    }
}
