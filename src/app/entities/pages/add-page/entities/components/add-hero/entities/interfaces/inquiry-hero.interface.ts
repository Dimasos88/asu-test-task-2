import {IAbility} from "./ability.interface";
import {LInquiryHero} from "../labels/inquity-hero.label";

/**
 * Интерфейс для различных запросов и манипуляций для героя
 *
 * @property {number} [ID] - идентификатор героя
 * @property {string} NAME - имя героя
 * @property {number} POWER - сила героя
 * @property {IAbility[]} ABILITIES - способности героя
 * @property {number} HERO_LEVEL - уровень героя
 */
export interface IInquiryHero {
    [LInquiryHero.ID]?: number;
    [LInquiryHero.NAME]: string;
    [LInquiryHero.POWER]: number;
    [LInquiryHero.ABILITIES]: IAbility[];
    [LInquiryHero.HERO_LEVEL]: number;
}
