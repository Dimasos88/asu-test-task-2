import {IAbility} from "./ability.interface";
import {LInquiryHero} from "../labels/inquity-hero.label";

/**
 * Интерфейс для различных запросов и манипуляций для героя
 *
 * @property {string} NAME - имя героя
 * @property {number} POWER - сила героя
 * @property {IAbility[]} ABILITIES - способности героя
 * @property {number} HERO_LEVEL - уровень героя
 * @property {number} [ID] - идентификатор героя
 */
export interface IInquiryHero {
    [LInquiryHero.NAME]: string;
    [LInquiryHero.POWER]: number;
    [LInquiryHero.ABILITIES]: IAbility[];
    [LInquiryHero.HERO_LEVEL]: number;
    [LInquiryHero.ID]?: number;
}
