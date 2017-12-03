import { Project } from "../state/Project";

export const schema = (project: Project) => ({
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
        hitType: { type: "number", title: "命中タイプ" },
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
        stypeId: { type: "number", title: "スキルタイプ" },
        successRate: { type: "number", title: "成功率" },
        tpCost: { type: "number", title: "消費TP" },
        tpGain: { type: "number", title: "得TP" },
        // meta: { type: "object" },
    },
    required: ["id"],
});

export const uiSchema = {
    "ui:field": "layout",
    "ui:layout": [
        {name: {md: 6}, iconIndex: {md: 6}},
        {animationId: {md: 6}},
        {effects: {md: 6}},
        {damage: {md: 6}},
    ],
    "ui:order": ["name", "iconIndex", "description", "*"],
    "id": {"ui:widget": "hidden"},
    "description": {"ui:widget": "textarea"},
    "damage": {
        critical: {
            "ui:widget": "select",
        },
    },
};
