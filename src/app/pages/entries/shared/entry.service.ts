import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from '../../../shared/services/base-resource.service';
import { CategoryService } from './../../categories/shared/category.service';
import { Entry } from './entry.model';

import { Observable } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

	constructor(protected injector: Injector, private categoryService: CategoryService) {
		super('api/entries', injector);
	}

	create(entry: Entry): Observable<Entry> {
		return this.categoryService.getById(entry.categoryId).pipe(
			flatMap(category => {
				entry.category = category;

				return this.http.post(this.apiPath, entry).pipe(
					catchError(this.handleError),
					map(this.jsonDataToResource)
				);
			})
		);
	}

	update(entry: Entry): Observable<Entry> {
		const url = `${this.apiPath}/${entry.id}`;

		return this.categoryService.getById(entry.categoryId).pipe(
			flatMap(category => {
				entry.category = category;

				return this.http.put(url, entry).pipe(
					catchError(this.handleError),
					map(() => entry)
				);
			})
		);
	}

	// PROTECTED METHODS

	protected jsonDataToResources(jsonData: any[]): Entry[] {
		const entries: Entry[] = [];

		jsonData.forEach(element => {
			const entry = Object.assign(new Entry(), element);
			entries.push(entry);
		});

		return entries;
	}

	protected jsonDataToResource(jsonData: any): Entry {
		return Object.assign(new Entry(), jsonData);
	}
}
