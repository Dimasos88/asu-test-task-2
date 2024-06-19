import {inject, Injectable} from "@angular/core";
import {IInquiryHero} from "../../components/add-hero/entities/interfaces/inquiry-hero.interface";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, switchMap, tap} from "rxjs";
import {IAbility} from "../../components/add-hero/entities/interfaces/ability.interface";
import {LAbility} from "../../components/add-hero/entities/labels/ability.label";
import {LInquiryHero} from "../../components/add-hero/entities/labels/inquity-hero.label";

@Injectable({
    providedIn: 'root'
})
export class ApiAddHeroService {
    private readonly _httpClient: HttpClient = inject(HttpClient);

    private _heroesData$$: BehaviorSubject<IInquiryHero[]> = new BehaviorSubject<IInquiryHero[]>([]);
    public heroesData$: Observable<IInquiryHero[]> = this._heroesData$$.asObservable();

    /**
     * Сохранение нового героя
     * @param {IInquiryHero} postData - объект свойств нового героя
     */
    public addHeroApi(postData: IInquiryHero): Observable<any> {
         return this._httpClient.post('http://127.0.0.1:3000/items', postData).pipe(
             switchMap(() => this.getHeroes())
         );
    };

    /**
     * Получение массива всех героев
     */
    public getHeroes(): Observable<IInquiryHero[]> {
        return this._httpClient.get('http://127.0.0.1:3000/items').pipe(
            tap((heroesData: IInquiryHero[]) => this._heroesData$$.next(heroesData))
        );
    };

    /**
     * Добавление способности герою
     * @param {number} heroId - идентификатор героя
     * @param {number} abilityId - идентификатор способности
     * @param {number} abilityLevel - уровень способности
     */
    public addNewSkillApi(heroId: number, abilityId: number, abilityLevel: number): Observable<IInquiryHero[]> {
        const hero: IInquiryHero = this._heroesData$$.value.find((item: IInquiryHero) => item[LInquiryHero.ID] === heroId)!;

        const body: Record<string, IAbility[]> = {
            [LInquiryHero.ABILITIES]: [
                ...hero[LInquiryHero.ABILITIES],
                {
                    [LAbility.ID]: abilityId,
                    [LAbility.LEVEL]: abilityLevel
                }],
        };
        return this._httpClient.put(`http://127.0.0.1:3000/items/${heroId}`, body).pipe(
            switchMap(() => this.getHeroes())
        );
    };

    /**
     * Редактирование героя
     * @param {number} id - идентификатор героя
     * @param {string} name - имя героя
     * @param {number} power - сила героя
     * @param {number} level - уровень героя
     * @param {IAbility[]} newAbilities - список новых способностей (идентификатор способности и уровень)
     */
    public editHeroApi(id: number, name: string, power: number, level: number, newAbilities: IAbility[]): Observable<IInquiryHero[]> {
        const body: IInquiryHero = {
            [LInquiryHero.NAME]: name,
            [LInquiryHero.POWER]: power,
            [LInquiryHero.ABILITIES]: newAbilities,
            [LInquiryHero.HERO_LEVEL]: level
        };

        return this._httpClient.put(`http://127.0.0.1:3000/items/${id}`, body).pipe(
            switchMap(() => this.getHeroes())
        );
    }
}
