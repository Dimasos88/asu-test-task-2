import {inject, Injectable, Input} from "@angular/core";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LAddHero} from "../../components/add-hero/entities/labels/add-hero.label";
import {LInquiryHero} from "../../components/add-hero/entities/labels/inquity-hero.label";
import {LAbility} from "../../components/add-hero/entities/labels/ability.label";

@Injectable({
    providedIn: 'root'
})
export class FormBuilderAddPageService {
    private readonly _formBuilder: FormBuilder = inject(FormBuilder);

    /**
     * Получаем форму для добавления героя
     */
    public get addHeroGroup(): FormGroup {
        return this._formBuilder.group({
            [LAddHero.NAME]: [null, [Validators.required, Validators.pattern(/^(?!\s)[А-яЁё\sA-z]*(?<!\s)$/)]],
            [LAddHero.POWER]: [null, [Validators.required]],
            [LAddHero.ABILITY_ID]: [null, [Validators.required]],
            [LAddHero.ABILITY_LEVEL]: [null, [Validators.required]],
            [LAddHero.HERO_LEVEL]: [null, [Validators.required]]
        });
    };

    /**
     * Получаем форму для добавления способностей
     */
    public get addSkillsGroup(): FormGroup {
        return this._formBuilder.group({
            [LAbility.ID]: [null, [Validators.required]],
            [LAbility.LEVEL]: [null, [Validators.required]]
        });
    };

    /**
     * Получаем форму для добавления способности
     */
    public get addSkillGroup(): FormGroup {
        return this._formBuilder.group({
            [LInquiryHero.ID]: [null, [Validators.required]],
            [LAddHero.ABILITY_ID]: [{value: null, disabled: true}, [Validators.required]],
            [LAddHero.ABILITY_LEVEL]: [{value: null, disabled: true}, [Validators.required]]
        });
    };

    /**
     * Получаем форму для редактирования героя
     */
    public get redactHeroGroup(): FormGroup {
        return this._formBuilder.group({
            [LInquiryHero.NAME]: [null, [Validators.required, Validators.pattern(/^(?!\s)[А-яЁё\sA-z]*(?<!\s)$/)]],
            [LInquiryHero.POWER]: [null, [Validators.required]],
            [LInquiryHero.HERO_LEVEL]: [null, [Validators.required]],
            [LInquiryHero.ABILITIES]: this._formBuilder.array([])
        });
    }
}
