import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-detail-component.html',
  styleUrls: ['./student-detail-component.scss']
})
export class StudentDetailComponent {
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  studentForm: FormGroup;
  activeTab: string = 'Student';
  tabs = [
    { id: 'Student', label: 'Student', index: 0 },
    { id: 'Parents', label: "Parent's", index: 1 },
    { id: 'Transport', label: 'Transport', index: 2 },
    { id: 'Academic', label: 'Academic', index: 3 },
    { id: 'DocumentUpload', label: 'Document Upload', index: 4 },
    { id: 'Other', label: 'Other', index: 5 },
    { id: 'History', label: 'History', index: 6 },
    { id: 'CategoryCertificate', label: 'Category Certificate', index: 7 }
  ];

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      tabs: this.fb.array([
        this.createStudentGroup(),
        this.createParentGroup(),
        this.fb.group({}), // Transport
        this.fb.group({}), // Academic
        this.fb.group({}), // Document Upload
        this.fb.group({}), // Other
        this.fb.group({}), // History
        this.fb.group({})  // Category Certificate
      ])
    });
  }

  get tabsArray(): FormArray {
    return this.studentForm.get('tabs') as FormArray;
  }

  createStudentGroup(): FormGroup {
    return this.fb.group({
      branchName: [''],
      admissionNo: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: [''],
      admissionDate: [''],
      dateOfJoining: [''],
      srNo: [''],
      gender: ['Male'],
      dob: [''],
      religion: [''],
      
      // Parent/Contact Info (Basic)
      fatherTitle: ['Mr.'],
      fatherName: [''],
      motherTitle: ['Mrs.'],
      motherName: [''],
      fatherMobile: [''],
      motherMobile: [''],
      studentMobile: [''],
      smsAlert: [''],
      admnCategory: [''],
      bloodGroup: [''],
      category: [''],
      caste: [''],

      // Academic Info (Admit/Current)
      admitGroup: [''], currentGroup: [''],
      admitStream: [''], currentStream: [''],
      admitClass: [''], currentClass: [''],
      admitSection: [''], currentSection: [''],
      admitRollNo: [''], currentRollNo: [''],
      admitSemester: [''], currentSemester: [''],
      admitConcession: [''], currentConcession: [''],
      admitFeeGroup: [''], currentFeeGroup: [''],
      admitClub: [''], currentClub: [''],
      admitHouse: [''], currentHouse: [''],

      // Addresses
      presentAddress: [''],
      presentState: [''],
      presentCity: [''],
      presentPincode: [''],
      permanentAddress: [''],
      permanentState: [''],
      permanentCity: [''],
      permanentPincode: [''],

      // Documents
      docsAddressProof: [false],
      docsBaptismCert: [false],
      docsCasteCert: [false],
      docsDobCert: [false],
      docsTransferCert: [false]
    });
  }

  createParentGroup(): FormGroup {
    return this.fb.group({
      fatherQualification: [''],
      fatherOccupation: [''],
      fatherDesignation: [''],
      fatherEmail: [''],
      fatherOfficeAddress: [''],
      fatherIncome: [''],
      fatherAdhar: [''],
      isFatherEmployee: [false],

      motherQualification: [''],
      motherOccupation: [''],
      motherDesignation: [''],
      motherEmail: [''],
      motherOfficeAddress: [''],
      motherIncome: [''],
      motherAdhar: [''],
      isMotherEmployee: [false],

      guardian1Name: [''],
      guardian1Mobile: [''],
      guardian1Address: [''],
      guardian2Name: [''],
      guardian2Mobile: [''],
      guardian2Address: [''],
      
      otherDetails: ['']
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  onSubmit() {
    if (this.studentForm.valid) {
      // Combine all tab values into one object if needed, or send as is
      const formValue = this.studentForm.value;
      const combinedValue = {
        ...formValue.tabs[0],
        ...formValue.tabs[1],
        // ... merge other tabs
      };
      this.save.emit(combinedValue);
    }
  }

  onCancel() {
    this.close.emit();
  }
}
