import * as React from "react";

export interface SkillEditorProps {
    projectPath: string;
}

export interface SkillEditorState {

}

export class SkillEditor extends React.Component<SkillEditorProps, SkillEditorState> {
    constructor(props: SkillEditorProps) {
        super(props);
        this.state = {};
    }

    render() {
        return <p />;
    }
}
