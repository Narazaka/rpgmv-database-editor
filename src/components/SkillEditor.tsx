import { observer } from "mobx-react";
import * as React from "react";
import { ItemList } from "./ItemList";
import { Project } from "./state/Project";

@observer
export class SkillEditor extends React.Component<{project: Project}, {selectedId: number}> {
    constructor(props: any) {
        super(props);
        this.state = {selectedId: 1};
    }

    render() {
        return <div className="EditorMain">
            <ItemList
                title="スキル"
                items={this.props.project.skills}
                selectedId={this.state.selectedId}
                onClick={this.onItemSelect} />
        </div>;
    }

    private onItemSelect = (selectedId: number) => this.setState({selectedId});
}
