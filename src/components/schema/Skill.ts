import { Project } from "../state/Project";

export interface JsonSchemaPropertyBase {
    optional?: boolean;
    default?: any;
}

export type JsonSchemaProperty =
    JsonSchemaStringProperty |
    JsonSchemaNumberProperty |
    JsonSchemaBooleanProperty |
    JsonSchemaArrayProperty |
    JsonSchemaObjectProperty;

export interface JsonSchemaStringProperty extends JsonSchemaPropertyBase {
    type: "string";
    enum?: string[];
}

export interface JsonSchemaNumberProperty extends JsonSchemaPropertyBase {
    type: "number";
    enum?: number[];
}

export interface JsonSchemaBooleanProperty extends JsonSchemaPropertyBase {
    type: "boolean";
    enum?: boolean[];
}

export interface JsonSchemaArrayProperty extends JsonSchemaPropertyBase {
    type: "array";
    items: JsonSchemaProperty;
    enum?: never;
}

export interface JsonSchemaObjectProperty extends JsonSchemaPropertyBase {
    type: "object";
    properties: {[name: string]: JsonSchemaProperty};
    required?: string[];
    enum?: never;
}

const withOptional = (srcSchema: JsonSchemaProperty) => {
    if (srcSchema.type === "object") {
        const newSchema: JsonSchemaObjectProperty & {required: string[]} = {...srcSchema, properties: {}, required: []};
        for (const name of Object.keys(srcSchema.properties)) {
            newSchema.properties[name] = withOptional(srcSchema.properties[name]);
            const prop = newSchema.properties[name];
            if (!prop.optional) {
                newSchema.required.push(name);
                if (prop.enum) prop.default = prop.enum[0];
            }
        }

        return newSchema;
    } else if (srcSchema.type === "array") {
        const newSchema: JsonSchemaArrayProperty = {...srcSchema};
        newSchema.items = withOptional(srcSchema.items);

        return newSchema;
    } else {
        return {...srcSchema};
    }
};

export const schema = (project: Project) => withOptional({
    type: "object",
    properties: {
        id: { type: "number", title: "ID" },
        animationId: {
            type: "number",
            title: "アニメーション",
            enum: [-1, 0].concat(project.animations.all().map((animation: any) => animation.id)),
            enumNames: ["通常攻撃", "なし"].concat(project.animations.all().map((animation: any) => animation.name)),
        },
        damage: {
            type: "object",
            title: "ダメージ",
            properties: {
                critical: { type: "boolean", title: "会心", enumNames: ["あり", "なし"] },
                elementId: { type: "number", title: "属性" },
                formula: { type: "string", title: "計算式" },
                type: { type: "number", title: "タイプ" },
                variance: { type: "number", title: "分散度" },
            },
        },
        description: { type: "string", title: "説明" },
        effects: {
            type: "array",
            title: "使用効果",
            items: {
                type: "object",
                properties: {
                    code: { type: "number" },
                    dataId: { type: "number" },
                    value1: { type: "number" },
                    value2: { type: "number" },
                },
            },
        },
        hitType: {
            type: "number",
            title: "命中タイプ",
            enum: [0, 1, 2],
            enumNames: ["必中", "物理攻撃", "魔法攻撃"],
        },
        iconIndex: { type: "number", title: "アイコン" },
        message1: { type: "string", title: "メッセージ (使用者の名前)～" },
        message2: { type: "string", title: "メッセージ" },
        mpCost: { type: "number", title: "消費MP" },
        name: { type: "string", title: "名前" },
        note: { type: "string", title: "メモ" },
        occasion: { type: "number", title: "使用可能時" },
        repeats: { type: "number", title: "連続回数" },
        requiredWtypeId1: { type: "number", title: "武器タイプ1" },
        requiredWtypeId2: { type: "number", title: "武器タイプ2" },
        scope: { type: "number", title: "範囲" },
        speed: { type: "number", title: "速度補正" },
        stypeId: {
            type: "number",
            title: "スキルタイプ",
            enum: project.system.skillTypes!.map((_, index) => index),
            enumNames: project.system.skillTypes!.map((value) => value ? value : "なし"),
        },
        successRate: { type: "number", title: "成功率" },
        tpCost: { type: "number", title: "消費TP" },
        tpGain: { type: "number", title: "得TP" },
        // meta: { type: "object" },
    },
});

export const uiSchema = {
    "ui:order": ["name", "iconIndex", "description", "*"],

    "id": {"ui:widget": "hidden"},
    "note": {"ui:widget": "textarea"},
    "damage": {
        critical: { "ui:widget": "select" },
        variance: { "ui:widget": "updown" },
    },
    "description": {"ui:widget": "textarea"},
    "mpCost": { "ui:widget": "updown" },
    "repeats": { "ui:widget": "updown" },
    "speed": { "ui:widget": "updown" },
    "successRate": { "ui:widget": "updown" },
    "tpCost": { "ui:widget": "updown" },
    "tpGain": { "ui:widget": "updown" },

    "ui:field": "layout_grid",
    "ui:layout_grid": {"ui:row": [
        {"ui:col": {md: 6, children: [
            {"ui:group": "基本設定", "ui:col": {md: 12, children: [
                {"ui:row": [
                    {"ui:col": {md: 6, children: ["name"]}},
                    {"ui:col": {md: 6, children: ["iconIndex"]}},
                ]},
                {"ui:row": [
                    {"ui:col": {md: 12, children: ["description"]}},
                ]},
                {"ui:row": [
                    {"ui:col": {md: 6, children: ["stypeId"]}},
                    {"ui:col": {md: 3, children: ["mpCost"]}},
                    {"ui:col": {md: 3, children: ["tpCost"]}},
                ]},
                {"ui:row": [
                    {"ui:col": {md: 6, children: ["scope"]}},
                    {"ui:col": {md: 6, children: ["occasion"]}},
                ]},
            ]}},
            {"ui:group": "発動", "ui:col": {md: 12, children: [
                {"ui:row": [
                    {"ui:col": {md: 3, children: ["speed"]}},
                    {"ui:col": {md: 3, children: ["successRate"]}},
                    {"ui:col": {md: 3, children: ["repeats"]}},
                    {"ui:col": {md: 3, children: ["tpGain"]}},
                ]},
                {"ui:row": [
                    {"ui:col": {md: 6, children: ["hitType"]}},
                    {"ui:col": {md: 6, children: ["animationId"]}},
                ]},
            ]}},
        ]}},
        {"ui:col": {md: 6, children: [
            {"ui:group": "メモ", "ui:col": {md: 12, children: [
                {"ui:row": [
                    {"ui:col": {md: 12, children: ["note"]}},
                ]},
            ]}},
        ]}},
    ]},
};
