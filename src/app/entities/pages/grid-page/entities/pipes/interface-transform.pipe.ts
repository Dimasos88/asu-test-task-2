import {Pipe, PipeTransform} from "@angular/core";
import {IItem} from "../../../../interfaces/item.interface";
import {LItem} from "../../../../labels/item.label";
import {
    IAbility
} from "../../../add-page/entities/components/add-hero/entities/interfaces/ability.interface";
import {LAbility} from "../../../add-page/entities/components/add-hero/entities/labels/ability.label";

@Pipe({
    name: 'interfaceTransform',
    standalone: true,
    pure: true
})
export class InterfaceTransformPipe implements PipeTransform {
    /**
     * Перевод id способностей в их названия
     * @param {IAbility[]} value - массив способностей героя
     * @param {IItem[]} skillThesaurus - справочник способностей
     */
    public transform(value: IAbility[], skillThesaurus: IItem[]) {
        return value
            .map((ability: IAbility) => {
                return skillThesaurus.find((abilityFromThesaurus: IItem) => {
                    return abilityFromThesaurus[LItem.ID] === ability[LAbility.ID];
                })![LItem.NAME];
            })
            .join(', ');
    };
}
