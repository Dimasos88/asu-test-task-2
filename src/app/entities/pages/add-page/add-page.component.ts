import {Component} from '@angular/core';
import {AddHeroComponent} from "./entities/components/add-hero/add-hero.component";
import {AddSkillComponent} from "./entities/components/add-skill/add-skill.component";
import {NavBarComponent} from "src/app/entities/components/nav-bar/nav-bar.component";

@Component({
    selector: 'app-add-page',
    standalone: true,
    imports: [AddHeroComponent, AddSkillComponent, NavBarComponent],
    templateUrl: './add-page.component.html',
    styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent {

}
