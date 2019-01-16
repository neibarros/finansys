import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-page-header',
	templateUrl: './page-header.component.html',
	styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

	@Input('page-title') pageTitle: string; // tslint:disable-line:no-input-rename
	@Input('button-class') buttonClass: string; // tslint:disable-line:no-input-rename
	@Input('button-text') buttonText: string; // tslint:disable-line:no-input-rename
	@Input('button-link') buttonLink: string; // tslint:disable-line:no-input-rename

	constructor() { }

	ngOnInit() {
	}

}
