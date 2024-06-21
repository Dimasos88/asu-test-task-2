import {Component, inject} from '@angular/core';
import {DxButtonModule, DxNumberBoxModule, DxSelectBoxModule, DxTextBoxModule} from "devextreme-angular";
import {MHeroSkillsData} from "../../mocks/hero-skills-data.mock";
import {IItem} from "../../../../../interfaces/item.interface";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FormBuilderAddPageService} from "../../services/form-buidler/form-builder-add-page.service";
import {LAddHero} from "./entities/labels/add-hero.label";
import {LAbility} from "./entities/labels/ability.label";
import {LItem} from "../../../../../labels/item.label";
import {IInquiryHero} from "./entities/interfaces/inquiry-hero.interface";
import {LInquiryHero} from "./entities/labels/inquity-hero.label";
import {ApiAddHeroService} from "src/app/entities/pages/add-page/entities/services/api/api-add-hero.service";
import {NgLetModule} from "ng-let";

@Component({
    selector: 'app-add-hero',
    standalone: true,
    imports: [DxTextBoxModule, DxSelectBoxModule, DxButtonModule, ReactiveFormsModule, DxNumberBoxModule, NgLetModule],
    templateUrl: './add-hero.component.html',
    styleUrls: ['./add-hero.component.scss']
})
export class AddHeroComponent {
    private readonly _formBuilderAddPageService: FormBuilderAddPageService = inject(FormBuilderAddPageService);
    private readonly _apiAddHeroService: ApiAddHeroService = inject(ApiAddHeroService);

    public heroSkillData: IItem[] = MHeroSkillsData;

    public addHeroFormGroup: FormGroup = this._formBuilderAddPageService.addHeroGroup;

    protected readonly LAddHero: typeof LAddHero = LAddHero;
    protected readonly LItem: typeof LItem = LItem;

    /**
     * Метод создания нового героя
     */
    public createHero(): void {
        const postHero: IInquiryHero = {
            [LInquiryHero.NAME]: this.addHeroFormGroup.value[LAddHero.NAME],
            [LInquiryHero.POWER]: this.addHeroFormGroup.value[LAddHero.POWER],
            [LInquiryHero.ABILITIES]: [
                {
                    [LAbility.ID]: this.addHeroFormGroup.value[LAddHero.ABILITY_ID],
                    [LAbility.LEVEL]: this.addHeroFormGroup.value[LAddHero.ABILITY_LEVEL]
                }
            ],
            [LInquiryHero.HERO_LEVEL]: this.addHeroFormGroup.value[LAddHero.HERO_LEVEL]
        };

        this._apiAddHeroService.addHeroApi(postHero)
            .subscribe(() => {
                this.addHeroFormGroup.reset();
            });
    }
}
