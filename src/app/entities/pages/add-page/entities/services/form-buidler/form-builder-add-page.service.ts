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
     * Записываем данные из формы
     */
    public get addHeroFormGroup(): FormGroup {
        return this._formBuilder.group({
            [LAddHero.NAME]: [null, [Validators.required, Validators.pattern(/^(?!\s)[А-Яа-яЁё\sa-zA-Z]*(?<!\s)$/)]],
            [LAddHero.POWER]: [null, [Validators.required]],
            [LAddHero.ABILITY_ID]: [null, [Validators.required]],
            [LAddHero.ABILITY_LEVEL]: [null, [Validators.required]],
            [LAddHero.HERO_LEVEL]: [null, [Validators.required]]
        });
    }

    /**
     * Записываем данные из формы
     */
    public get addSkillsFormGroup(): FormGroup {
        return this._formBuilder.group({
            [LAbility.ID]: [null, [Validators.required]],
            [LAbility.LEVEL]: [null, [Validators.required]]
        });
    }

    /**
     * Записываем данные из формы
     */
    public get addSkillFormGroup(): FormGroup {
        return this._formBuilder.group({
            [LInquiryHero.ID]: [null, [Validators.required]],
            [LAddHero.ABILITY_ID]: [{value: null, disabled: true}, [Validators.required]],
            [LAddHero.ABILITY_LEVEL]: [{value: null, disabled: true}, [Validators.required]]
        });
    }

    /**
     * Записываем данные из формы
     */
    public get redactHeroFormGroup(): FormGroup {
        return this._formBuilder.group({
            [LInquiryHero.NAME]: [null, [Validators.required, Validators.pattern(/^(?!\s)[А-Яа-яЁё\sa-zA-Z]*(?<!\s)$/)]],
            [LInquiryHero.POWER]: [null, [Validators.required]],
            [LInquiryHero.HERO_LEVEL]: [null, [Validators.required]],
            [LInquiryHero.ABILITIES]: this._formBuilder.array([])
        });
    }
}

