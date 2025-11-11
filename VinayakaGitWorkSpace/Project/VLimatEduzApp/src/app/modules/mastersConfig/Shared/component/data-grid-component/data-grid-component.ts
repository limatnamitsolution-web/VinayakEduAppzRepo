import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MasterConfigGridItem } from '../../../Services/GridItem';

@Component({
  selector: 'app-data-grid',
  imports:  [CommonModule, FormsModule],
  templateUrl: './data-grid-component.html',
  styleUrl: './data-grid-component.scss'
})
export class DataGridComponent {
@Input() data: MasterConfigGridItem[] = [];
  @Input() title: string = 'Data Grid';
  @Input() hideHeader: boolean = false;
  @Output() modify = new EventEmitter<MasterConfigGridItem>();
  @Output() delete = new EventEmitter<MasterConfigGridItem>();
  @Output() view = new EventEmitter<MasterConfigGridItem>();
  @Output() addNew = new EventEmitter<void>();

  // Pagination and filtering
  filteredData: MasterConfigGridItem[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  pageSizeOptions: Array<{ value: number; label: string }> = [];
  totalPages: number = 1;
  searchText: string = '';
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  selectedItem: MasterConfigGridItem | null = null;

  // Make Math available in template
  Math = Math;

  ngOnInit() {
    this.filterData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.filterData();
    }
  }

  filterData() {
    let result = [...this.data];

    // Apply search filter
    if (this.searchText) {
      const searchLower = this.searchText.toLowerCase();
      result = result.filter(item => 
        item.configValue.toLowerCase().includes(searchLower) ||
        item.configKey.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.id.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    if (this.sortColumn) {
      result.sort((a, b) => {
        let aValue: any = a[this.sortColumn as keyof MasterConfigGridItem];
        let bValue: any = b[this.sortColumn as keyof MasterConfigGridItem];

        if (this.sortColumn === 'index') {
          aValue = this.data.indexOf(a);
          bValue = this.data.indexOf(b);
        }

        if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    this.filteredData = result;
    // update available page sizes based on filtered length
    this.updatePageSizeOptions();
    this.updatePagination();
  }

  /** Build page size options dynamically based on filteredData length */
  updatePageSizeOptions() {
    const total = this.filteredData.length;
    const base = [5, 10, 20, 50];
    const opts: Array<{ value: number; label: string }> = [];

    // include base sizes that are less than total
    base.forEach((n) => {
      if (n < total) opts.push({ value: n, label: n.toString() });
    });

    // always include a size equal to total (All) if total > 0
    if (total > 0) {
      // if total matches a base option, ensure it's present
      if (!opts.find((o) => o.value === total)) {
        const label = total === base[base.length - 1] ? total.toString() : 'All';
        opts.push({ value: total, label });
      }
    }

    // fallback if no options (small datasets)
    if (opts.length === 0) {
      opts.push({ value: Math.max(1, total), label: total > 0 ? total.toString() : '1' });
    }

    this.pageSizeOptions = opts;

    // adjust current pageSize if it's larger than total (or zero)
    if (total === 0) {
      this.pageSize = 10;
    } else if (this.pageSize > total) {
      this.pageSize = total;
    }
  }

  sortData(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.filterData();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
    this.currentPage = Math.max(1, Math.min(this.currentPage, this.totalPages));
  }

  get paginatedData(): MasterConfigGridItem[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredData.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  onPageSizeChange() {
    this.currentPage = 1;
    this.updatePagination();
  }

  onSearch() {
    this.currentPage = 1;
    this.filterData();
  }

  // Event handlers with confirmation
  onModify(item: MasterConfigGridItem) {
    this.selectedItem = item;
    this.modify.emit(item);
  }

  onDelete(item: MasterConfigGridItem) {
    if (confirm(`Are you sure you want to delete "${item.configValue}"?`)) {
      this.delete.emit(item);
    }
  }

  onView(item: MasterConfigGridItem) {
    this.selectedItem = item;
    this.view.emit(item);
  }

  onAddNew() {
    this.addNew.emit();
  }
}
