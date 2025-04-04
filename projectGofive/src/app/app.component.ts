import { Component} from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

declare var Flowbite: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  title = 'projectGofive'
  ngOnInit(): void {
    initFlowbite();
  }
}
