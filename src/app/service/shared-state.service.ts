import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Field, TableInfo} from "../query-builder/query-builder.component";

@Injectable({
  providedIn: 'root'
})
export class SharedStateService {

  constructor() { }

  public selectedTables = new BehaviorSubject<TableInfo[]>([]);
  public sharedSelectedTables = this.selectedTables.asObservable();

  public selectedFields = new BehaviorSubject<string[]>([]);
  public sharedSelectedFields = this.selectedFields.asObservable();

}
