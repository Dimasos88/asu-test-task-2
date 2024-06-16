import {AfterViewInit, Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    DxButtonModule,
    DxDropDownBoxModule,
    DxListModule,
    DxNumberBoxModule,
    DxPopupModule,
    DxSelectBoxModule,
    DxTextBoxModule
} from "devextreme-angular";
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FormBuilderAddPageService} from "../../../../add-page/entities/services/form-buidler/form-builder-add-page.service";
import {ApiAddHeroService} from "../../../../add-page/entities/services/api/api-add-hero.service";
import {LAbility} from "../../../../add-page/entities/components/add-hero/entities/labels/ability.label";
import {MHeroSkillsData} from "../../../../add-page/entities/mocks/hero-skills-data.mock";
import {LItem} from "../../../../../labels/item.label";
import {IInquiryHero} from "../../../../add-page/entities/components/add-hero/entities/interfaces/inquiry-hero.interface";
import {LInquiryHero} from "../../../../add-page/entities/components/add-hero/entities/labels/inquity-hero.label";
import {InterfaceTransformPipe} from "../../pipes/interface-transform.pipe";
import {map, Observable, of} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {IAbility} from "../../../../add-page/entities/components/add-hero/entities/interfaces/ability.interface";


@Component({
    selector: 'app-popup',
    standalone: true,
    imports: [CommonModule, DxPopupModule, DxButtonModule, DxTextBoxModule, ReactiveFormsModule, DxNumberBoxModule, DxSelectBoxModule, DxListModule, DxDropDownBoxModule, InterfaceTransformPipe],
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit, AfterViewInit {
    private readonly _formBuilderAddPageService: FormBuilderAddPageService = inject(FormBuilderAddPageService);
    private readonly _ApiAddHeroService: ApiAddHeroService = inject(ApiAddHeroService);
    private readonly _destroyRef: DestroyRef = inject(DestroyRef);

    @Input({required: true})
    public currentHero: IInquiryHero;

    @Input({required: true})
    public isPopupVisible: boolean;

    @Output()
    public isPopupVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>;

    protected readonly heroSkillData: typeof MHeroSkillsData = MHeroSkillsData;
    protected readonly LAddHeroSkill: typeof  LAbility = LAbility;
    protected readonly LInquiryHero: typeof LInquiryHero = LInquiryHero;
    protected readonly LItem: typeof LItem = LItem;

    public redactHeroFormGroup: FormGroup = this._formBuilderAddPageService.redactHeroFormGroup;

    public isFormUnchanged$: Observable<boolean>  = of(true);

    public ngOnInit(): void {
        this.getForm(LInquiryHero.NAME).setValue(this.currentHero[LInquiryHero.NAME]);
        this.getForm(LInquiryHero.POWER).setValue(this.currentHero[LInquiryHero.POWER]);
        this.getForm(LInquiryHero.HERO_LEVEL).setValue(this.currentHero[LInquiryHero.HERO_LEVEL]);
        this.currentHero[LInquiryHero.ABILITIES].forEach(() => {
            this.abilities.push(this._formBuilderAddPageService.addSkillsFormGroup);
        });
        this.getForm(LInquiryHero.ABILITIES).patchValue(this.currentHero[LInquiryHero.ABILITIES]);
    };

    public ngAfterViewInit(): void {
        this._subscribeFormEditing();
    };

    /**
     * Подписка на изменение формы и сравнение с начальными данными героя
     */
    public _subscribeFormEditing(): void {
        this.isFormUnchanged$ = this.redactHeroFormGroup.valueChanges
            .pipe(
                takeUntilDestroyed(this._destroyRef),
                map(() => {
                    return this.redactHeroFormGroup.get(LInquiryHero.NAME).value === this.currentHero[LInquiryHero.NAME] &&
                           this.redactHeroFormGroup.get(LInquiryHero.POWER).value === this.currentHero[LInquiryHero.POWER] &&
                           this.redactHeroFormGroup.get(LInquiryHero.HERO_LEVEL).value === this.currentHero[LInquiryHero.HERO_LEVEL] &&
                           this.compareAbilities(this.redactHeroFormGroup.get(LInquiryHero.ABILITIES).value, this.currentHero[LInquiryHero.ABILITIES]);
                })
            );
    };

    /**
     * Сравнение способностей героя с формой
     * @param {IAbility[]} newHeroSkills - новый массив способностей
     * @param {IAbility[]} currentHeroSkills - текущий массив способностей
     */
    public compareAbilities(newHeroSkills: IAbility[], currentHeroSkills: IAbility[]): boolean {
        if (newHeroSkills.length !== currentHeroSkills.length) {
            return false;
        }

        return newHeroSkills.every((newAbility: IAbility) => {
            return currentHeroSkills.some((currentAbility: IAbility) => {
                return JSON.stringify(newAbility) === JSON.stringify(currentAbility);
            });
        });
    };

    /**
     * Закрытие попапа
     */
    public closePopup(): void {
        this.isPopupVisibleChange.emit(this.isPopupVisible);
    };

    /**
     * Изменение героя
     */
    public editHero(): void {
        this._ApiAddHeroService.redactHeroApi(
            this.currentHero[LInquiryHero.ID],
            this.redactHeroFormGroup.value[LInquiryHero.NAME],
            this.redactHeroFormGroup.value[LInquiryHero.POWER],
            this.redactHeroFormGroup.value[LInquiryHero.HERO_LEVEL],
            this.redactHeroFormGroup.value[LInquiryHero.ABILITIES]
        )
            .subscribe(() => {
            this.redactHeroFormGroup.reset();
            this.isPopupVisibleChange.emit(false);
        });
    };

    /**
     * Получить формконтрол
     * @param {any} field - название формконтрола
     */
    public getForm(field: string): FormControl {
        return this.redactHeroFormGroup.get(field) as FormControl;
    };

    /**
     * Получить формконтрол для массива способностей
     */
    public get abilities() : FormArray {
        return this.redactHeroFormGroup.get(LInquiryHero.ABILITIES) as FormArray;
    };

    /**
     * Добавить новую способность (формгруппу) в массив FormArray
     */
    public addAbilities(): void {
        this.abilities.push(this._formBuilderAddPageService.addSkillsFormGroup);
    };

    /**
     * Удалить формгруппу для новой способности
     */
    public removeAbility(abilityIndex: number): void {
        this.redactHeroFormGroup.markAsDirty();
        this.abilities.removeAt(abilityIndex);
    };
}
