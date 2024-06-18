import {LItem} from "../labels/item.label";

/**
 * Интерфейс для добавления способности
 *
 * @property {number} ID - идентификатор способности
 * @property {string} NAME - название способности
 */
export interface IItem {
    [LItem.ID]: number;
    [LItem.NAME]: string;
}
