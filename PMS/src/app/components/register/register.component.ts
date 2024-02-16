import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { registerDetails } from '../../interfaces/register.interfaces';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ CommonModule, NavbarComponent, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  errorMsg!:string
  successMsg!:string

  register(details:registerDetails){
    console.log(details);
  }

}
