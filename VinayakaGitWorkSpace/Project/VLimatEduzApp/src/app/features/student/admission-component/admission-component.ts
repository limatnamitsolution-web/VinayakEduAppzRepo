import { Component, OnInit, inject, effect, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { AdmissionGridComponent } from './admission-grid-component';

@Component({
  selector: 'app-admission-component',
  imports: [CommonModule, AdmissionGridComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './admission-component.html',
  styleUrl: './admission-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdmissionComponent implements OnInit {
  gridData = signal<any[]>([]);
  filteredGridData = signal<any[]>([]);
  gridTitle: string = 'Admission Management';
  form: FormGroup;
  private fb = inject(FormBuilder);
  editIndex: number | null = null;
  searchTerm: string = '';

  // Hardcoded data for now
  private initialData = [
    {
      AdmnNo: '1001',
      AdmnDate: '2023-04-01',
      DOB: '2010-05-12',
      Student: 'Rahul Sharma',
      Class: '5',
      Sec: 'A',
      Father: 'Amit Sharma',
      Mother: 'Sunita Sharma',
      FMobileNo: '9876543210',
      MMobileNo: '9876543211'
    },
    {
      AdmnNo: '1002',
      AdmnDate: '2023-04-02',
      DOB: '2011-08-23',
      Student: 'Priya Singh',
      Class: '6',
      Sec: 'B',
      Father: 'Rakesh Singh',
      Mother: 'Meena Singh',
      FMobileNo: '9876543222',
      MMobileNo: '9876543223'
    },
    {
      AdmnNo: '1003',
      AdmnDate: '2023-04-03',
      DOB: '2010-06-15',
      Student: 'Arjun Verma',
      Class: '5',
      Sec: 'A',
      Father: 'Suresh Verma',
      Mother: 'Anita Verma',
      FMobileNo: '9876543233',
      MMobileNo: '9876543234'
    },
    {
      AdmnNo: '1004',
      AdmnDate: '2023-04-04',
      DOB: '2011-09-10',
      Student: 'Sneha Gupta',
      Class: '6',
      Sec: 'B',
      Father: 'Manoj Gupta',
      Mother: 'Ritu Gupta',
      FMobileNo: '9876543244',
      MMobileNo: '9876543245'
    },
    {
      AdmnNo: '1005',
      AdmnDate: '2023-04-05',
      DOB: '2010-07-20',
      Student: 'Rohan Das',
      Class: '5',
      Sec: 'C',
      Father: 'Vikram Das',
      Mother: 'Pooja Das',
      FMobileNo: '9876543255',
      MMobileNo: '9876543256'
    },
    {
      AdmnNo: '1006',
      AdmnDate: '2023-04-06',
      DOB: '2011-10-05',
      Student: 'Anjali Mehta',
      Class: '6',
      Sec: 'A',
      Father: 'Sanjay Mehta',
      Mother: 'Neha Mehta',
      FMobileNo: '9876543266',
      MMobileNo: '9876543267'
    },
    {
      AdmnNo: '1007',
      AdmnDate: '2023-04-07',
      DOB: '2010-08-12',
      Student: 'Kabir Khan',
      Class: '5',
      Sec: 'B',
      Father: 'Sameer Khan',
      Mother: 'Zara Khan',
      FMobileNo: '9876543277',
      MMobileNo: '9876543278'
    },
    {
      AdmnNo: '1008',
      AdmnDate: '2023-04-08',
      DOB: '2011-11-15',
      Student: 'Ishita Roy',
      Class: '6',
      Sec: 'C',
      Father: 'Alok Roy',
      Mother: 'Sima Roy',
      FMobileNo: '9876543288',
      MMobileNo: '9876543289'
    },
    {
      AdmnNo: '1009',
      AdmnDate: '2023-04-09',
      DOB: '2010-09-25',
      Student: 'Aryan Singh',
      Class: '5',
      Sec: 'A',
      Father: 'Rajeev Singh',
      Mother: 'Kavita Singh',
      FMobileNo: '9876543299',
      MMobileNo: '9876543290'
    },
    {
      AdmnNo: '1010',
      AdmnDate: '2023-04-10',
      DOB: '2011-12-01',
      Student: 'Riya Kapoor',
      Class: '6',
      Sec: 'B',
      Father: 'Anil Kapoor',
      Mother: 'Sunita Kapoor',
      FMobileNo: '9876543300',
      MMobileNo: '9876543301'
    },
    {
      AdmnNo: '1011',
      AdmnDate: '2023-04-11',
      DOB: '2010-10-10',
      Student: 'Vivaan Joshi',
      Class: '5',
      Sec: 'C',
      Father: 'Deepak Joshi',
      Mother: 'Meera Joshi',
      FMobileNo: '9876543311',
      MMobileNo: '9876543312'
    },
    {
      AdmnNo: '1012',
      AdmnDate: '2023-04-12',
      DOB: '2011-01-20',
      Student: 'Diya Malhotra',
      Class: '6',
      Sec: 'A',
      Father: 'Rajesh Malhotra',
      Mother: 'Anju Malhotra',
      FMobileNo: '9876543322',
      MMobileNo: '9876543323'
    },
    {
      AdmnNo: '1013',
      AdmnDate: '2023-04-13',
      DOB: '2010-11-05',
      Student: 'Aarav Patel',
      Class: '5',
      Sec: 'B',
      Father: 'Sunil Patel',
      Mother: 'Geeta Patel',
      FMobileNo: '9876543333',
      MMobileNo: '9876543334'
    },
    {
      AdmnNo: '1014',
      AdmnDate: '2023-04-14',
      DOB: '2011-02-15',
      Student: 'Myra Saxena',
      Class: '6',
      Sec: 'C',
      Father: 'Vinay Saxena',
      Mother: 'Rekha Saxena',
      FMobileNo: '9876543344',
      MMobileNo: '9876543345'
    },
    {
      AdmnNo: '1015',
      AdmnDate: '2023-04-15',
      DOB: '2010-12-20',
      Student: 'Reyansh Jain',
      Class: '5',
      Sec: 'A',
      Father: 'Amit Jain',
      Mother: 'Priya Jain',
      FMobileNo: '9876543355',
      MMobileNo: '9876543356'
    },
    {
      AdmnNo: '1016',
      AdmnDate: '2023-04-16',
      DOB: '2011-03-10',
      Student: 'Saanvi Agarwal',
      Class: '6',
      Sec: 'B',
      Father: 'Rahul Agarwal',
      Mother: 'Nidhi Agarwal',
      FMobileNo: '9876543366',
      MMobileNo: '9876543367'
    },
    {
      AdmnNo: '1017',
      AdmnDate: '2023-04-17',
      DOB: '2011-01-05',
      Student: 'Advait Nair',
      Class: '5',
      Sec: 'C',
      Father: 'Kamal Nair',
      Mother: 'Lakshmi Nair',
      FMobileNo: '9876543377',
      MMobileNo: '9876543378'
    },
    {
      AdmnNo: '1018',
      AdmnDate: '2023-04-18',
      DOB: '2011-04-25',
      Student: 'Ananya Kulkarni',
      Class: '6',
      Sec: 'A',
      Father: 'Sandeep Kulkarni',
      Mother: 'Vidya Kulkarni',
      FMobileNo: '9876543388',
      MMobileNo: '9876543389'
    },
    {
      AdmnNo: '1019',
      AdmnDate: '2023-04-19',
      DOB: '2011-02-12',
      Student: 'Atharv Reddy',
      Class: '5',
      Sec: 'B',
      Father: 'Prakash Reddy',
      Mother: 'Swati Reddy',
      FMobileNo: '9876543399',
      MMobileNo: '9876543390'
    },
    {
      AdmnNo: '1020',
      AdmnDate: '2023-04-20',
      DOB: '2011-05-15',
      Student: 'Pari Choudhary',
      Class: '6',
      Sec: 'C',
      Father: 'Vikas Choudhary',
      Mother: 'Rina Choudhary',
      FMobileNo: '9876543400',
      MMobileNo: '9876543401'
    },
    {
      AdmnNo: '1021',
      AdmnDate: '2023-04-21',
      DOB: '2011-03-20',
      Student: 'Shaurya Mishra',
      Class: '5',
      Sec: 'A',
      Father: 'Ashok Mishra',
      Mother: 'Suman Mishra',
      FMobileNo: '9876543411',
      MMobileNo: '9876543412'
    },
    {
      AdmnNo: '1022',
      AdmnDate: '2023-04-22',
      DOB: '2011-06-10',
      Student: 'Avni Thakur',
      Class: '6',
      Sec: 'B',
      Father: 'Nitin Thakur',
      Mother: 'Seema Thakur',
      FMobileNo: '9876543422',
      MMobileNo: '9876543423'
    }
  ];

  constructor() {
    this.form = this.fb.group({
      id: 0,
      configValue: ['', Validators.required], // Mapping to Student Name for now
      configKey: ['', Validators.required],   // Mapping to AdmnNo
      description: ['', Validators.required], // Mapping to Class
      configuration: ['']
    });

    // Initialize data
    this.gridData.set(this.initialData);
    this.applyFilters();
  }

  ngOnInit(): void {
      // Any init logic
  }

  // Filtering logic for search
  applyFilters(): void {
    const term = this.searchTerm.toLowerCase();
    const allData = this.gridData();
    this.filteredGridData.set(
      allData.filter((item: any) =>
        (item.Student || '').toLowerCase().includes(term) ||
        (item.AdmnNo || '').toLowerCase().includes(term) ||
        (item.Class || '').toLowerCase().includes(term) ||
        (item.Father || '').toLowerCase().includes(term)
      )
    );
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  addGridItem() {
    console.log('Adding/Updating grid item');
    if (this.form.invalid) return;
    // Logic to add item would go here
  }

  resetForm() {
    this.form.reset();
    this.editIndex = null;
  }

  onModify(item: any) {
      // Handle modify
  }

  onDelete(item: any) {
      // Handle delete
  }
}
