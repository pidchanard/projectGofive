import { Component, OnInit } from '@angular/core';
import { FlowbiteService } from '../../flowbite.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-documents',
  standalone: false,
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent implements OnInit{
  documents = [
    { name: 'Lorem ipsum', date: 'April 9, 2022', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.' },
    { name: 'Document 2', date: 'May 10, 2023', description: 'Example document description.' },
    { name: 'Project Plan', date: 'June 15, 2021', description: 'Project overview and details.' }
  ];
constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
}