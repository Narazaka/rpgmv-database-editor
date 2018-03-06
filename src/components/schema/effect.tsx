import { IDataEffect } from "../../mv/IDataEffect";

// tslint:disable no-magic-numbers

export function effectDataToDisplay(effectData: IDataEffect) {
    const targetSchema = schema.oneOf.find((s) => s.properties.code.default === effectData.code);
    if (!targetSchema) return {type: "(エラー)", content: "(エラー)"};

    const contents = [];
    for (const name of ["dataId", "value1", "value2"] as Array<"dataId" | "value1" | "value2">) {
        const property = targetSchema.properties[name];
        if (property.title != null) { // tslint:disable-line no-null-keyword
            const value = effectData[name];
            let useValue;
            if (
                property.type === "enum" &&
                "enum" in property &&
                property.enum &&
                "enumNames" in property &&
                property.enumNames
            ) {
                const enumIndex = property.enum.findIndex((enumValue) => value === enumValue);
                useValue = property.enumNames[enumIndex];
            } else {
                useValue = value;
            }
            if (property.title === "+") {
                contents.push(`${property.title} ${useValue}`);
            } else if (property.title === "%") {
                    contents.push(`${(useValue as number) * 100} ${property.title}`);
            } else {
                contents.push(`${useValue} ${property.title}`);
            }
        }
    }

    return {
        type: targetSchema.title,
        content: contents.join(" "),
    };
}

export const schema = {
    oneOf: [
        {
            type: "object",
            title: "HP回復",
            properties: {
                code: { type: "number", default: 11 },
                dataId: { type: "number", default: 0 },
                value1: { type: "number", default: 100, title: "%" },
                value2: { type: "number", default: 0, title: "+" },
            },
        },
        {
            type: "object",
            title: "MP回復",
            properties: {
                code: { type: "number", default: 12 },
                dataId: { type: "number", default: 0 },
                value1: { type: "number", default: 100, title: "%" },
                value2: { type: "number", default: 0, title: "+" },
            },
        },
        {
            type: "object",
            title: "MP回復",
            properties: {
                code: { type: "number", default: 13 },
                dataId: { type: "number", default: 0 },
                value1: { type: "number", default: 0, title: "" },
                value2: { type: "number", default: 0 },
            },
        },
        {
            type: "object",
            title: "ステート付加",
            properties: {
                code: { type: "number", default: 21 },
                dataId: {
                    type: "enum",
                    default: 0,
                    title: "",
                    enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    enumNames: ["通常攻撃", "戦闘不能", "防御", "不死身", "毒", "暗闇", "沈黙", "激昂", "混乱", "魅了", "睡眠"],
                },
                value1: { type: "number", default: 0, title: "%" },
                value2: { type: "number", default: 0 },
            },
        },
        {
            type: "object",
            title: "ステート解除",
            properties: {
                code: { type: "number", default: 22 },
                dataId: {
                    type: "enum",
                    default: 0,
                    title: "",
                    enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    enumNames: ["通常攻撃", "戦闘不能", "防御", "不死身", "毒", "暗闇", "沈黙", "激昂", "混乱", "魅了", "睡眠"],
                },
                value1: { type: "number", default: 0, title: "%" },
                value2: { type: "number", default: 0 },
            },
        },
        {
            type: "object",
            title: "強化",
            properties: {
                code: { type: "number", default: 31 },
                dataId: {
                    type: "enum",
                    default: 0,
                    title: "",
                    enum: [0, 1, 2, 3, 4, 5, 6, 7],
                    enumNames: ["最大HP", "最大MP", "攻撃力", "防御力", "魔法力", "魔法防御", "敏捷性", "運"],
                },
                value1: { type: "number", default: 0, title: "ターン" },
                value2: { type: "number", default: 0 },
            },
        },
        {
            type: "object",
            title: "弱体",
            properties: {
                code: { type: "number", default: 32 },
                dataId: {
                    type: "enum",
                    default: 0,
                    title: "",
                    enum: [0, 1, 2, 3, 4, 5, 6, 7],
                    enumNames: ["最大HP", "最大MP", "攻撃力", "防御力", "魔法力", "魔法防御", "敏捷性", "運"],
                },
                value1: { type: "number", default: 0, title: "ターン" },
                value2: { type: "number", default: 0 },
            },
        },
        {
            type: "object",
            title: "強化の解除",
            properties: {
                code: { type: "number", default: 33 },
                dataId: {
                    type: "enum",
                    default: 0,
                    title: "",
                    enum: [0, 1, 2, 3, 4, 5, 6, 7],
                    enumNames: ["最大HP", "最大MP", "攻撃力", "防御力", "魔法力", "魔法防御", "敏捷性", "運"],
                },
                value1: { type: "number", default: 0 },
                value2: { type: "number", default: 0 },
            },
        },
        {
            type: "object",
            title: "弱体の解除",
            properties: {
                code: { type: "number", default: 34 },
                dataId: {
                    type: "enum",
                    default: 0,
                    title: "",
                    enum: [0, 1, 2, 3, 4, 5, 6, 7],
                    enumNames: ["最大HP", "最大MP", "攻撃力", "防御力", "魔法力", "魔法防御", "敏捷性", "運"],
                },
                value1: { type: "number", default: 0 },
                value2: { type: "number", default: 0 },
            },
        },
        {
            type: "object",
            title: "特殊効果",
            properties: {
                code: { type: "number", default: 41 },
                dataId: {
                    type: "enum",
                    default: 0,
                    title: "",
                    enum: [0],
                    enumNames: ["逃げる"],
                },
                value1: { type: "number", default: 1 },
                value2: { type: "number", default: 0 },
            },
        },
        {
            type: "object",
            title: "成長",
            properties: {
                code: { type: "number", default: 42 },
                dataId: {
                    type: "enum",
                    default: 0,
                    title: "",
                    enum: [0, 1, 2, 3, 4, 5, 6, 7],
                    enumNames: ["最大HP", "最大MP", "攻撃力", "防御力", "魔法力", "魔法防御", "敏捷性", "運"],
                },
                value1: { type: "number", default: 1, title: "+" },
                value2: { type: "number", default: 0 },
            },
        },
        {
            type: "object",
            title: "スキル取得",
            properties: {
                code: { type: "number", default: 43 },
                dataId: { // TODO: スキル番号
                    type: "enum",
                    default: 1,
                    title: "",
                    enum: [2],
                    enumNames: ["0001 スキル1"],
                },
                value1: { type: "number", default: 1 },
                value2: { type: "number", default: 0 },
            },
        },
        {
            type: "object",
            title: "コモンイベント",
            properties: {
                code: { type: "number", default: 44 },
                dataId: { // TODO: コモンイベント番号
                    type: "enum",
                    default: 1,
                    title: "",
                    enum: [1, 2, 3, 4],
                    enumNames: ["0001 コモンイベント1", "0002 コモンイベント2", "0003 コモンイベント3", "0004 コモンイベント4"],
                },
                value1: { type: "number", default: 1 },
                value2: { type: "number", default: 0 },
            },
        },
    ],
};
