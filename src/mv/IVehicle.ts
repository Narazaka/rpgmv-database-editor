import { IDataSound } from "./IDataSound";

export interface IVehicle {
    bgm?: IDataSound;
    characterIndex?: number;
    characterName?: string;
    startMapId?: number;
    startX?: number;
    startY?: number;
}
