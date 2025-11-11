import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterConfigGridItem } from './Services/GridItem';

import { DataGridComponent } from './Shared/component/data-grid-component/data-grid-component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-masters-config-dashboard-component',
  imports: [CommonModule, DataGridComponent, FormsModule],
  templateUrl: './masters-config-dashboard-component.html',
  styleUrl: './masters-config-dashboard-component.scss'
})

export class MastersConfigDashboardComponent {
  gridData: MasterConfigGridItem[] = [];
  gridTitle: string = 'Master Configuration';
  newItem: MasterConfigGridItem = {
    id: '',
    configValue: '',
    configKey: '',
    description: ''
  };
  editIndex: number | null = null;

  addGridItem() {
  if (!this.newItem.configValue.trim() || !this.newItem.configKey.trim() || !this.newItem.description.trim()) return;
    if (this.editIndex !== null) {
      // Update existing item
      this.gridData[this.editIndex] = { ...this.newItem };
      this.editIndex = null;
    } else {
      // Add new item
      const itemToAdd: MasterConfigGridItem = {
        ...this.newItem,
        id: 'CONF' + (this.gridData.length + 1).toString().padStart(3, '0')
      };
      this.gridData = [...this.gridData, itemToAdd];
    }
  this.newItem = { id: '', configValue: '', configKey: '', description: '' };
  }

  ngOnInit() {
    this.loadSampleData();
  }
  

  loadSampleData() {
    this.gridData = [
      {
        id: 'CONF001',
        configValue: 'User Roles',
        configKey: 'USER_ROLES',
        description: 'Configuration for user role management and permissions'
      },
      {
        id: 'CONF002',
        configValue: 'System Settings',
        configKey: 'SYS_SETTINGS',
        description: 'Global system configuration and environment settings'
      },
      {
        id: 'CONF003',
        configValue: 'Email Templates',
        configKey: 'EMAIL_TMPL',
        description: 'Templates for system-generated emails and notifications'
      },
      {
        id: 'CONF004',
        configValue: 'Security Policies',
        configKey: 'SEC_POLICY',
        description: 'Security rules and access control policies'
      },
      {
        id: 'CONF005',
        configValue: 'Database Config',
        configKey: 'DB_CONFIG',
        description: 'Database connection settings and query configurations'
      },
      {
        id: 'CONF006',
        configValue: 'API Endpoints',
        configKey: 'API_ENDPOINT',
        description: 'External API integration endpoints and credentials'
      },
      {
        id: 'CONF007',
        configValue: 'Notification Rules',
        configKey: 'NOTIF_RULES',
        description: 'Rules for system notifications and alert triggers'
      },
      {
        id: 'CONF008',
        configValue: 'Backup Schedule',
        configKey: 'BACKUP_SCHED',
        description: 'Automated backup schedules and retention policies'
      },
      {
        id: 'CONF009',
        configValue: 'Audit Logs',
        configKey: 'AUDIT_LOGS',
        description: 'Configuration for system audit trails and logging'
      },
      {
        id: 'CONF010',
        configValue: 'Report Templates',
        configKey: 'REPORT_TMPL',
        description: 'Templates for system reports and data exports'
      }
    ];
  }

  onModify(item: MasterConfigGridItem) {
  const index = this.gridData.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.newItem = { ...item };
      this.editIndex = index;
    }
  }

  onDelete(item: MasterConfigGridItem) {
    console.log('Delete item:', item);
    // Implement delete logic
  this.gridData = this.gridData.filter(i => i.id !== item.id);
  }


  onAddNew() {
    console.log('Add new item');
    // Implement add new logic
    const newItem: MasterConfigGridItem = {
      id: 'CONF' + (this.gridData.length + 1).toString().padStart(3, '0'),
      configValue: 'New Configuration',
      configKey: 'NEW_CONFIG',
      description: 'New configuration item description'
    };
    this.gridData = [...this.gridData, newItem];
  }

}
