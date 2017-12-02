import { observer } from "mobx-react";
import * as React from "react";
import { EditorTabs } from "./EditorTabs";
import { tabs } from "./settings/tabs";
import { Project } from "./state/Project";

@observer
export class Editor extends React.Component<{project: Project}, {tabIndex: number}> {
    constructor(props: any) {
        super(props);
        this.state = {tabIndex: 0};
    }

    render() {
        const tab = tabs[this.state.tabIndex];
        const TabComponent = tab.component;

        return <div className="Editor">
            <EditorTabs tabs={tabs} tabIndex={this.state.tabIndex} onClick={this.onTabClick} />
            <TabComponent project={this.props.project} />
        </div>;
    }

    private onTabClick = (tabIndex: number) => this.setState({tabIndex});
}
