import { Component, inject } from '@angular/core';
import { MannegerService } from '../../services/manneger.service';

@Component({
  selector: 'app-pop-message',
  standalone: true,
  imports: [],
  templateUrl: './pop-message.component.html',
  styleUrl: './pop-message.component.scss',
})
export class PopMessageComponent {
  private manneger = inject(MannegerService);
  get texts() {
    return this.manneger.texts;
  }
}
