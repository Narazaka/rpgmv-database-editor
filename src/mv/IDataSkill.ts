import { IDataEffect } from "./IDataEffect";

/** スキル */
export interface IDataSkill {
    /** ID */
    id: number;
    /** アニメーション */
    animationId?: number;
    /** ダメージ */
    damage?: {
        /** 会心 */
        critical?: boolean;
        /** 属性 */
        elementId?: number;
        /** 計算式 */
        formula?: string;
        /** タイプ */
        type?: number;
        /** 分散度 */
        variance?: number;
    };
    /** 説明 */
    description?: string;
    /** 使用効果 */
    effects?: IDataEffect[];
    /** 命中タイプ */
    hitType?: number;
    /** アイコン */
    iconIndex?: number;
    /** メッセージ (使用者の名前)～ */
    message1?: string;
    /** メッセージ */
    message2?: string;
    /** 消費MP */
    mpCost?: number;
    /** 名前 */
    name?: string;
    /** メモ */
    note?: string;
    /** 使用可能時 */
    occasion?: number;
    /** 連続回数 */
    repeats?: number;
    /** 武器タイプ1 */
    requiredWtypeId1?: number;
    /** 武器タイプ2 */
    requiredWtypeId2?: number;
    /** 範囲 */
    scope?: number;
    /** 速度補正 */
    speed?: number;
    /** スキルタイプ */
    stypeId?: number;
    /** 成功率 */
    successRate?: number;
    /** 消費TP */
    tpCost?: number;
    /** 得TP */
    tpGain?: number;
    /** メタ情報 */
    meta?: any;
}
