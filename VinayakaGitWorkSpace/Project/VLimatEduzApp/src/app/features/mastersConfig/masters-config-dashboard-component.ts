import { Component, OnInit, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterConfig } from './models/MasterConfig.model';
import { MastersConfig } from './Services/masters-config';
import { ActivatedRoute } from '@angular/router';

import { DataGridComponent } from './Shared/component/data-grid-component/data-grid-component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-masters-config-dashboard-component',
  imports: [CommonModule, DataGridComponent, FormsModule],
  templateUrl: './masters-config-dashboard-component.html',
  styleUrl: './masters-config-dashboard-component.scss'
})

export class MastersConfigDashboardComponent implements OnInit {
  private mastersConfig = inject(MastersConfig);
  private route = inject(ActivatedRoute);
  gridData: MasterConfig[] = [];
  gridTitle: string = 'Master Configuration';
  newItem: MasterConfig = {
    id: '',
    configValue: '',
    configKey: '',
    description: ''
  };
  editIndex: number | null = null;
  keyParam: string = '';

  constructor() {
    console.log('MastersConfigDashboardComponent initialized');
    this.route.paramMap.subscribe(params => {
      this.keyParam = params.get('key') || 'ClassGroup';
      this.mastersConfig.fetchMasterConfig("1klk", this.keyParam);
    });
    effect(() => {
      const data = this.mastersConfig.masterConfig();
      if (data && Array.isArray(data)) {
        this.gridData = data;
      }
    });
  }
  addGridItem() {
  if (!this.newItem.configValue.trim() || !this.newItem.configKey.trim() || !this.newItem.description.trim()) return;
    if (this.editIndex !== null) {
      // Update existing item
      this.gridData[this.editIndex] = { ...this.newItem };
      this.editIndex = null;
    } else {
      // Add new item
      const itemToAdd: MasterConfig = {
        ...this.newItem,
        id: 'CONF' + (this.gridData.length + 1).toString().padStart(3, '0')
      };
      this.gridData = [...this.gridData, itemToAdd];
    }
  this.newItem = { id: '', configValue: '', configKey: '', description: '' };
  }

  ngOnInit() {
    // Fetch master config data from API
   
  }
  

  // Removed loadSampleData; now data is loaded from API

  onModify(item: MasterConfig) {
  const index = this.gridData.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.newItem = { ...item };
      this.editIndex = index;
    }
  }

  onDelete(item: MasterConfig) {
    console.log('Delete item:', item);
    // Implement delete logic
  this.gridData = this.gridData.filter(i => i.id !== item.id);
  }


  onAddNew() {
    console.log('Add new item');
    // Implement add new logic
    const newItem: MasterConfig = {
      id: 'CONF' + (this.gridData.length + 1).toString().padStart(3, '0'),
      configValue: 'New Configuration',
      configKey: 'NEW_CONFIG',
      description: 'New configuration item description'
    };
    this.gridData = [...this.gridData, newItem];
  }

}
