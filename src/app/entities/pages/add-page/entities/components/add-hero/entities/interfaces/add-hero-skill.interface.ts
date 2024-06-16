import {LAddHeroSkill} from "../labels/add-hero-skill.label";

/**
 * интерфейс для добавленных способностей
 *
 * @param {number} ID - идентификатор способности
 * @param {number} LEVEL - уровень способности
 */
export interface IAddHeroSkill {
    [LAddHeroSkill.ID]: number,
    [LAddHeroSkill.LEVEL]: number
}
