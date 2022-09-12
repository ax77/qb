import {Component, OnInit} from '@angular/core';
import {NgStyle} from "@angular/common";
import {SharedStateService} from "../service/shared-state.service";

export interface Field {
  name: string;
  owner: TableInfo;
  id: number;
}

export interface TableInfo {
  tableName: string;
  fields: Field[];
}


@Component({
  selector: 'app-query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.scss']
})
export class QueryBuilderComponent implements OnInit {

  // the main structure of the builder
  databaseTables: TableInfo[] = [];
  selectedTables: TableInfo[] = [];
  selectedFields: string[] = [];

  // ng-style, uses for list collapsing
  databaseTablesDisplayBindings: string[] = [];
  selectedTablesDisplayBindings: string[] = [];

  // highlight selected
  databaseTables_selectedTableName: string = '';
  selectedTables_selectedTableName: string = '';

  fieldsAliasesIdx = 0;

  constructor(private service: SharedStateService) {
  }

  ngOnInit(): void {
    this.fillDummyData();

    this.service.sharedSelectedTables.subscribe(t => this.selectedTables = t);
    this.service.sharedSelectedFields.subscribe(f => this.selectedFields = f);
  }

  private fillDummyData() {
    let globalFieldId = 0;
    for (let i = 0; i < 32; i++) {

      let fields: { name: string; owner: TableInfo; id: number; }[] = [];
      let table = {tableName: 'table_' + i.toString(), fields: fields};

      for (let j = 0; j < 16; j++) {
        fields.push({name: 'field' + globalFieldId.toString(), owner: table, id: globalFieldId});
        this.databaseTablesDisplayBindings.push('none');
        globalFieldId++;
      }

      this.databaseTables.push(table);
    }
  }

// database view

  databaseTables_expandListButtonClick(event: Event, tableForClick: TableInfo) {
    event.preventDefault();
    this.eFillCollapsedProperties(event, tableForClick, this.databaseTables, this.databaseTablesDisplayBindings);
  }

  databaseTables_tableNameDblClick(event: Event, clickedTable: TableInfo) {
    event.preventDefault();
    this.ePushTableFromDatabaseViewToSelectedView(clickedTable);
    console.log(event.target);
  }

  databaseTables_fieldNameDblClick(event: Event, f: Field) {
    event.preventDefault();

    let clickedTable = f.owner;
    this.ePushTableFromDatabaseViewToSelectedView(clickedTable);
    this.ePushOneField(this.eFieldName(f));
  }

  databaseTables_tableNameClick(tab: TableInfo) {
    this.databaseTables_selectedTableName = tab.tableName;
  }


  // selected tables view

  selectedTables_expandListButtonClick(event: Event, clickedTable: TableInfo) {
    event.preventDefault();
    this.eFillCollapsedProperties(event, clickedTable, this.selectedTables, this.selectedTablesDisplayBindings);
  }

  selectedTables_tableNameDblClick(event: Event, clickedTable: TableInfo) {
    event.preventDefault();
    for (let f of clickedTable.fields) {
      this.ePushOneField(this.eFieldName(f));
    }
  }

  selectedTables_fieldNameDblClick(event: Event, f: Field) {
    event.preventDefault();
    this.ePushOneField(this.eFieldName(f));
  }

  selectedTables_tableNameClick(tab: TableInfo) {
    this.selectedTables_selectedTableName = tab.tableName;
  }

  selectedTables_deleteSelectedTable() {
    if (this.selectedTables_selectedTableName) {
      this.removeFieldsWhenRemovingTable();
      let index = this.selectedTables.findIndex(d => d.tableName === this.selectedTables_selectedTableName);
      if (index > -1) {
        this.selectedTables.splice(index, 1);
      }
    }
  }

  removeFieldsWhenRemovingTable() {
    if (this.selectedTables_selectedTableName) {
      this.selectedFields = this.selectedFields.filter(f => !f.startsWith(this.selectedTables_selectedTableName));
    }
  }


  // utilities

  ePushOneField(fieldName: string) {
    let index = this.selectedFields.findIndex(d => d === fieldName);
    if (index > -1) {
      let alias = fieldName + '_' + this.fieldsAliasesIdx.toString();
      this.fieldsAliasesIdx++;
      this.selectedFields.push(alias);
    } else {
      this.selectedFields.push(fieldName);
    }
  }

  eFillCollapsedProperties(event: Event, tableForClick: TableInfo, tablesArray: TableInfo[], bindingArray: string[]) {
    for (let table of tablesArray) {
      if (table.tableName == tableForClick.tableName) {
        for (let col of table.fields) {
          if (bindingArray[col.id] == 'none') {
            bindingArray[col.id] = 'block';
          } else {
            bindingArray[col.id] = 'none';
          }
        }
      }
    }
  }

  ePushTableFromDatabaseViewToSelectedView(clickedTable: TableInfo) {
    let already = this.selectedTables.find(x => x.tableName == clickedTable.tableName);
    if (already != undefined) {
      return;
    }

    for (let f in clickedTable.fields) {
      this.selectedTablesDisplayBindings.push('none');
    }

    this.selectedTables.push(clickedTable);
  }

  eFieldName(f: Field) {
    return f.owner.tableName + '.' + f.name;
  }

}
