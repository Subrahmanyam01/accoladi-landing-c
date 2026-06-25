import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LegacyPageBase } from '../../../shared/legacy-page-base';

@Component({
  selector: 'app-student-music-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './student-music-page.component.html',
})
export class StudentMusicPageComponent extends LegacyPageBase {
  protected readonly bodyClasses = ['modal-open', 'popup-page'];
  protected readonly pageTitle = 'Accoladi | The Performer';
}
