import {Component} from '@angular/core';
import {DxButtonModule} from "devextreme-angular";
import {RouterLink, RouterModule} from "@angular/router";

@Component({
    selector: 'app-nav-bar',
    standalone: true,
    imports: [DxButtonModule, RouterLink, RouterModule],
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

}
