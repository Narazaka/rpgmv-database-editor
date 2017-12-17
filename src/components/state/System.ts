import { IDataSound } from "../../mv/IDataSound";
import { IDataSystem } from "../../mv/IDataSystem";
import { IVehicle } from "../../mv/IVehicle";
import { ItemAnyBase } from "./ItemAnyBase";

export class System extends ItemAnyBase<IDataSystem> implements IDataSystem {
    airship?: IVehicle;
    armorTypes?: string[];
    attackMotions?: Array<{
        type?: number;
        weaponImageId?: number;
    }>;
    battleBgm?: IDataSound;
    battleback1Name?: string;
    battleback2Name?: string;
    battlerHue?: number;
    battlerName?: string;
    boat?: IVehicle;
    currencyUnit?: string;
    defeatMe?: IDataSound;
    editMapId?: number;
    elements?: string[];
    equipTypes?: string[];
    gameTitle?: string;
    gameoverMe?: IDataSound;
    locale?: string;
    magicSkills?: number[];
    menuCommands?: boolean[];
    optDisplayTp?: boolean;
    optDrawTitle?: boolean;
    optExtraExp?: boolean;
    optFloorDeath?: boolean;
    optFollowers?: boolean;
    optSideView?: boolean;
    optSlipDeath?: boolean;
    optTransparent?: boolean;
    partyMembers?: number[];
    ship?: IVehicle;
    skillTypes?: string[];
    sounds?: IDataSound[];
    startMapId?: number;
    startX?: number;
    startY?: number;
    switches?: string[];
    terms?: {
        basic?: string[];
        commands: string[];
        params: string[];
        messages: {
            possession: string;
            expTotal: string;
            expNext: string;
            saveMessage: string;
            loadMessage: string;
            file?: string;
            partyName?: string;
            emerge?: string;
            preemptive?: string;
            surprise?: string;
            escapeStart?: string;
            escapeFailure?: string;
            victory?: string;
            defeat?: string;
            obtainExp?: string;
            obtainGold?: string;
            obtainItem?: string;
            levelUp?: string;
            obtainSkill?: string;
            useItem?: string;
            criticalToEnemy?: string;
            criticalToActor?: string;
            actorDamage?: string;
            actorRecovery?: string;
            actorGain?: string;
            actorLoss?: string;
            actorDrain?: string;
            actorNoDamage?: string;
            actorNoHit?: string;
            enemyDamage?: string;
            enemyRecovery?: string;
            enemyGain?: string;
            enemyLoss?: string;
            enemyDrain?: string;
            enemyNoDamage?: string;
            enemyNoHit?: string;
            evasion?: string;
            magicEvasion?: string;
            magicReflection?: string;
            counterAttack?: string;
            substitute?: string;
            buffAdd?: string;
            debuffAdd?: string;
            buffRemove?: string;
            actionFailure?: string;
            bgmVolume?: string;
            bgsVolume?: string;
            meVolume?: string;
            seVolume?: string;
            alwaysDash?: string;
            commandRemember?: string;
        };
    };
    testBattlers?: Array<{
        actorId?: number;
        equips?: number[];
        level?: number;
    }>;
    testTroopId?: number;
    title1Name?: string;
    title2Name?: string;
    titleBgm?: IDataSound;
    variables?: string[];
    versionId?: number;
    victoryMe?: IDataSound;
    weaponTypes?: string;
    windowTone?: number[];
    meta?: any;
}