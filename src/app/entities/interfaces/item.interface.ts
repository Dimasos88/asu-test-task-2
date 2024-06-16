import {LItem} from "../labels/item.label";

/**
 * Интерфейс для добавления сособности
 *
 * @property {number} ID - идентификатор способности
 * @property {string} NAME - название способности
 */
export interface IItem {
    [LItem.ID]: number;
    [LItem.NAME]: string;
}
