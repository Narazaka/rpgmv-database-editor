import * as React from "react";
import { Project } from "../state/Project";

// tslint:disable no-magic-numbers

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
                elementId: {
                    type: "number",
                    title: "属性",
                    enum: [-1].concat(project.system.elements.map((_, index) => index)),
                    enumNames: ["通常攻撃"].concat(project.system.elements.map((value) => value ? value : "なし")),
                },
                formula: { type: "string", title: "計算式" },
                type: {
                    type: "number",
                    title: "タイプ",
                    enum: [0, 1, 2, 3, 4, 5, 6],
                    enumNames: ["なし", "HPダメージ", "MPダメージ", "HP回復", "MP回復", "HP吸収", "MP吸収"],
                },
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
        occasion: {
            type: "number",
            title: "使用可能時",
            enum: [0, 1, 2, 3],
            enumNames: ["常時", "バトル画面", "メニュー画面", "使用不可"],
        },
        repeats: { type: "number", title: "連続回数" },
        requiredWtypeId1: {
            type: "number",
            title: "武器タイプ1",
            enum: project.system.weaponTypes.map((_, index) => index),
            enumNames: project.system.weaponTypes.map((value) => value ? value : "なし"),
        },
        requiredWtypeId2: {
            type: "number",
            title: "武器タイプ2",
            enum: project.system.weaponTypes.map((_, index) => index),
            enumNames: project.system.weaponTypes.map((value) => value ? value : "なし"),
        },
        scope: {
            type: "number",
            title: "範囲",
            enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            enumNames: [
                "なし", "敵単体", "敵全体",
                "敵1体ランダム", "敵2体ランダム", "敵3体ランダム", "敵4体ランダム",
                "味方単体", "味方全体", "味方単体（戦闘不能）", "味方全体（戦闘不能）",
                "使用者",
            ],
        },
        speed: { type: "number", title: "速度補正" },
        stypeId: {
            type: "number",
            title: "スキルタイプ",
            enum: project.system.skillTypes.map((_, index) => index),
            enumNames: project.system.skillTypes.map((value) => value ? value : "なし"),
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
    "damage": {
        "ui:field": "layout_grid",
        "ui:layout_grid": {"ui:row": [
            {"ui:col": {md: 12, children: [
                {"ui:row": [
                    {"ui:col": {md: 6, children: ["type"]}},
                    {"ui:col": {md: 6, children: ["elementId"]}},
                ]},
                {"ui:row": [
                    {"ui:col": {md: 12, children: ["formula"]}},
                ]},
                {"ui:row": [
                    {"ui:col": {md: 4, children: ["variance"]}},
                    {"ui:col": {md: 4, children: ["critical"]}},
                ]},
            ]}},
        ]},
        "critical": { "ui:widget": "select" },
        "variance": { "ui:widget": "updown" },
    },
    "description": {"ui:widget": "textarea"},
    "message1": {"ui:options": {label: false}},
    "message2": {"ui:options": {label: false}},
    "mpCost": { "ui:widget": "updown" },
    "note": {"ui:widget": "textarea", "ui:options": {label: false}},
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
            {"ui:group": "メッセージ", "ui:col": {md: 12, children: [
                {"ui:row": [
                    {"ui:col": {md: 3, children: [{render: () => <p>（使用者の名前）</p>}]}},
                    {"ui:col": {md: 9, children: ["message1"]}},
                ]},
                {"ui:row": [
                    {"ui:col": {md: 12, children: ["message2"]}},
                ]},
            ]}},
            {"ui:group": "必要武器", "ui:col": {md: 12, children: [
                {"ui:row": [
                    {"ui:col": {md: 6, children: ["requiredWtypeId1"]}},
                    {"ui:col": {md: 6, children: ["requiredWtypeId2"]}},
                ]},
            ]}},
        ]}},
        {"ui:col": {md: 6, children: [
            {"ui:group": "ダメージ", "ui:col": {md: 12, children: [
                {"ui:row": [
                    {"ui:col": {md: 12, children: ["damage"]}},
                ]},
            ]}},
            {"ui:group": "使用効果", "ui:col": {md: 12, children: [
                {"ui:row": [
                    {"ui:col": {md: 12, children: ["effects"]}},
                ]},
            ]}},
            {"ui:group": "メモ", "ui:col": {md: 12, children: [
                {"ui:row": [
                    {"ui:col": {md: 12, children: ["note"]}},
                ]},
            ]}},
        ]}},
    ]},
};
