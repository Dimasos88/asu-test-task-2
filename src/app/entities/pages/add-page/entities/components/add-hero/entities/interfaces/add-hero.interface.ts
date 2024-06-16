import {LAddHero} from "../labels/add-hero.label";

/**
 * Интерфейс для формы создания героя
 *
 * @property {string} NAME - имя героя
 * @property {number} POWER - сила героя
 * @property {number} ABILITY_ID - идентификатор способности героя
 * @property {number} ABILITY_LEVEL - уровень способности
 * @property {number} HERO_LEVEL - уровень героя
 */
export interface IAddHero {
    [LAddHero.NAME]: string;
    [LAddHero.POWER]: number;
    [LAddHero.ABILITY_ID]: number;
    [LAddHero.ABILITY_LEVEL]: number;
    [LAddHero.HERO_LEVEL]: number;
}
