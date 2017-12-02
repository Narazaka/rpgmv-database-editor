import { Project } from "../state/Project";

export const schema = (project: Project) => {
    console.log(2);

    return {
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
            description: { type: "string" },
            effects: {
                type: "array",
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
            hitType: { type: "number" },
            iconIndex: { type: "number", title: "アイコン" },
            message1: { type: "string" },
            message2: { type: "string" },
            mpCost: { type: "number" },
            name: { type: "string", title: "名前" },
            note: { type: "string", title: "メモ" },
            occasion: { type: "number" },
            repeats: { type: "number" },
            requiredWtypeId1: { type: "number" },
            requiredWtypeId2: { type: "number" },
            scope: { type: "number" },
            speed: { type: "number" },
            stypeId: { type: "number" },
            successRate: { type: "number" },
            tpCost: { type: "number" },
            tpGain: { type: "number" },
            // meta: { type: "object" },
        },
        required: ["id"],
    };
};

export const uiSchema = {
    "ui:order": ["name", "iconIndex", "description", "*"],
    "id": {"ui:widget": "hidden"},
    "description": {"ui:widget": "textarea"},
    "damage": {
        critical: {
            "ui:widget": "select",
        },
    },
};
