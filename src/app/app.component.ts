import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { PopMessageComponent } from './pop-message/pop-message.component';
import { MannegerService } from '../services/manneger.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormComponent, PopMessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private manneger = inject(MannegerService);

  get texts() {
    return this.manneger.texts;
  }
}
