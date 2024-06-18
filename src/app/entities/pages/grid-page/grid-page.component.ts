import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    DxButtonModule,
    DxCheckBoxModule,
    DxDataGridModule,
    DxNumberBoxModule, DxPopupModule,
    DxSelectBoxModule
} from "devextreme-angular";
import {ApiAddHeroService} from "../add-page/entities/services/api/api-add-hero.service";
import {LInquiryHero} from "../add-page/entities/components/add-hero/entities/labels/inquity-hero.label";
import {InterfaceTransformPipe} from "./entities/pipes/interface-transform.pipe";
import {MHeroSkillsData} from "../add-page/entities/mocks/hero-skills-data.mock";
import {IItem} from "../../interfaces/item.interface";
import {PopupComponent} from "./entities/components/popup/popup.component";
import {IInquiryHero} from "../add-page/entities/components/add-hero/entities/interfaces/inquiry-hero.interface";
import {Observable} from "rxjs";

@Component({
    selector: 'app-grid-page',
    standalone: true,
    imports: [CommonModule, DxDataGridModule, DxSelectBoxModule, InterfaceTransformPipe, PopupComponent, DxNumberBoxModule, DxCheckBoxModule, DxButtonModule, DxPopupModule],
    templateUrl: './grid-page.component.html',
    styleUrls: ['./grid-page.component.scss']
})
export class GridPageComponent implements OnInit {
    private readonly _apiAddHeroService: ApiAddHeroService = inject(ApiAddHeroService);

    public heroesData$: Observable<IInquiryHero[]> = this._apiAddHeroService.heroesData$;

    public heroSkillData: IItem[] = MHeroSkillsData;

    public heroData: IInquiryHero;

    protected readonly LInquiryHero = LInquiryHero;

    public isPopupVisible: boolean = false;

    public ngOnInit(): void {
        this._apiAddHeroService.getHeroes().subscribe();
    }

    /**
     * Открытие попапа и запись данных героя
     * @param {IInquiryHero} hero - герой
     */
    public openPopup(hero: IInquiryHero): void {
        this.heroData = hero;
        this.isPopupVisible = !this.isPopupVisible;
    };
}
