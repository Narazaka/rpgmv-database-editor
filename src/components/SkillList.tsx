import { observer } from "mobx-react";
import * as React from "react";
import { DragDropContext } from "react-dnd";
import * as ReactDnDHTML5Backend from "react-dnd-html5-backend";
import { SkillListItem } from "./SkillListItem";
import { Skills } from "./state/Skills";

@(DragDropContext(ReactDnDHTML5Backend) as any)
@observer
export class SkillList extends React.Component<{skills: Skills}, {selectedId?: number}> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    onItemClick = (selectedId: number) => {
        this.setState({selectedId});
    }

    render() {
        return <div className="SkillList">
            <div className="title">
                <h1>スキル</h1>
            </div>
            <ul>
                {
                    this.props.skills.all().map((skill) =>
                        <SkillListItem
                            key={skill.id}
                            skills={this.props.skills}
                            skill={skill}
                            selected={this.state.selectedId === skill.id}
                            onClick={() => this.onItemClick(skill.id)} />,
                    )
                }
            </ul>
        </div>;
    }
}
