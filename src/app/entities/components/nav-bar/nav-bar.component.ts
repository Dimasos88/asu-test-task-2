import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DxButtonModule} from "devextreme-angular";
import {RouterLink, RouterModule} from "@angular/router";

@Component({
    selector: 'app-nav-bar',
    standalone: true,
    imports: [CommonModule, DxButtonModule, RouterLink, RouterModule],
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

}
