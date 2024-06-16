import {LAbility} from "../labels/ability.label";

/**
 * Интерфейс для добавленных способностей
 *
 * @property {number} ID - идентификатор способности
 * @property {number} LEVEL - уровень способности
 */
export interface IAbility {
    [LAbility.ID]: number,
    [LAbility.LEVEL]: number
}
