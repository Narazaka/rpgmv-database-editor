import { observer } from "mobx-react";
import * as React from "react";
import { ItemContent } from "./ItemContent";
import { ItemList } from "./ItemList";
import { schema, uiSchema } from "./schema/Skill";
import { Project } from "./state/Project";

@observer
export class SkillEditor extends React.Component<{project: Project}, {selectedId: number}> {
    constructor(props: any) {
        super(props);
        this.state = {selectedId: 1};
    }

    render() {
        const skills = this.props.project.skills;

        return <div className="EditorMain">
            <ItemList
                title="スキル"
                items={skills}
                selectedId={this.state.selectedId}
                onClick={this.onItemSelect} />
            <ItemContent
                schema={schema(this.props.project)}
                uiSchema={uiSchema}
                item={skills.item(this.state.selectedId)} />
        </div>;
    }

    private readonly onItemSelect = (selectedId: number) => this.setState({selectedId});
}
