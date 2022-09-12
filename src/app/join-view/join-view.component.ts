import { Component, OnInit } from '@angular/core';
import {SharedStateService} from "../service/shared-state.service";
import {Field, TableInfo} from "../query-builder/query-builder.component";

@Component({
  selector: 'app-join-view',
  templateUrl: './join-view.component.html',
  styleUrls: ['./join-view.component.scss']
})
export class JoinViewComponent implements OnInit {

  selectedTables: TableInfo[] = [];

  leftTableFields: Field[] = [];
  rightTableFields: Field[] = [];

  // temp-test
  curJoinIdx = 0;
  joins = new Array<number>();

  constructor(private service: SharedStateService) { }

  ngOnInit(): void {
    this.service.sharedSelectedTables.subscribe(t => this.selectedTables = t);
  }

  leftTableSelectChange(e: any) {
    let tableName = e.target.value;
    if(tableName) {
      for(let tab of this.selectedTables) {
        if(tab.tableName == tableName) {
          this.leftTableFields = tab.fields;
        }
      }
    }
  }

  rightTableSelectChange(e: any) {
    let tableName = e.target.value;
    if(tableName) {
      for(let tab of this.selectedTables) {
        if(tab.tableName == tableName) {
          this.rightTableFields = tab.fields;
        }
      }
    }
  }

  addNewJoin() {
    this.joins.push(this.curJoinIdx);
    this.curJoinIdx++;
  }

  deleteCurrentJoin(joinId: number) {
    let index = this.joins.findIndex(d => d === joinId);
    if(index > -1) {
      this.joins.splice(index, 1);
    }
  }
}
