import {Component} from '@angular/core';
import {AddPageComponent} from "./entities/pages/add-page/add-page.component";
import {NavBarComponent} from "./entities/components/nav-bar/nav-bar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [AddPageComponent, NavBarComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

}
