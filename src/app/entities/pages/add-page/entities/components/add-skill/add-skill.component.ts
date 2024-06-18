import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {MHeroSkillsData} from "../../mocks/hero-skills-data.mock";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {DxButtonModule, DxNumberBoxModule, DxSelectBoxModule, DxTextBoxModule} from "devextreme-angular";
import {ApiAddHeroService} from "../../services/api/api-add-hero.service";
import {FormBuilderAddPageService} from "../../services/form-buidler/form-builder-add-page.service";
import {LInquiryHero} from "../add-hero/entities/labels/inquity-hero.label";
import {LAbility} from "../add-hero/entities/labels/ability.label";
import {LAddHero} from "../add-hero/entities/labels/add-hero.label";
import {LItem} from "../../../../../labels/item.label";
import {AsyncPipe} from "@angular/common";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {IItem} from "../../../../../interfaces/item.interface";

@Component({
    selector: 'app-add-skill',
    standalone: true,
    imports: [DxTextBoxModule, DxButtonModule, DxSelectBoxModule, ReactiveFormsModule, DxNumberBoxModule, AsyncPipe],
    templateUrl: './add-skill.component.html',
    styleUrls: ['./add-skill.component.scss']
})
export class AddSkillComponent implements OnInit {
    private readonly _apiAddHeroService: ApiAddHeroService = inject(ApiAddHeroService);
    private readonly _formBuilderAddPageService: FormBuilderAddPageService = inject(FormBuilderAddPageService);
    private readonly _destroyRef: DestroyRef = inject(DestroyRef);

    public addSkillFormGroup: FormGroup = this._formBuilderAddPageService.addSkillFormGroup;

    public heroesData$ = this._apiAddHeroService.heroesData$;

    protected readonly heroSkillData: IItem[] = MHeroSkillsData;

    protected readonly LInquiryHero: typeof LInquiryHero = LInquiryHero;
    protected readonly LAddHero: typeof LAddHero = LAddHero;
    protected readonly LItem: typeof LItem = LItem;
    protected readonly LAddHeroSkill: typeof LAbility = LAbility;

    public ngOnInit(): void {
        this._apiAddHeroService.getHeroes().subscribe();
        this._subscribeSelectedHero();
    }

    /**
     * Передаём данные формы в put-запрос, очищаем форму
     */
    public addNewSkill(): void {
        this._apiAddHeroService.addNewSkillApi(
            this.addSkillFormGroup.value[LInquiryHero.ID],
            this.addSkillFormGroup.value[LAddHero.ABILITY_ID],
            this.addSkillFormGroup.value[LAddHero.ABILITY_LEVEL]
        )
            .subscribe(() => {
                this.addSkillFormGroup.reset();
                this.getAddSkillFormControl(LAddHero.ABILITY_ID)?.disable();
                this.getAddSkillFormControl(LAddHero.ABILITY_LEVEL)?.disable();
            });
    };

    /**
     * Подписываемся на изменение формы
     */
    public _subscribeSelectedHero(): void {
        this.getAddSkillFormControl(LInquiryHero.ID).valueChanges
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => {
                if (this.getAddSkillFormControl(LInquiryHero.ID).value) {
                    this.getAddSkillFormControl(LAddHero.ABILITY_ID).enable();
                    this.getAddSkillFormControl(LAddHero.ABILITY_LEVEL).enable();
                } else {
                    this.getAddSkillFormControl(LAddHero.ABILITY_ID).disable();
                    this.getAddSkillFormControl(LAddHero.ABILITY_LEVEL).disable();
                }
            });
    };

    /**
     * Обращаемся к полю формы
     * @param {string} field - название поля формы
     */
    public getAddSkillFormControl(field: string): FormControl {
        return this.addSkillFormGroup.get(field) as FormControl;
    };
}
