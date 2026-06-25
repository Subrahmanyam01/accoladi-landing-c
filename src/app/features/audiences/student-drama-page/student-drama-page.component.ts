import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LegacyPageBase } from '../../../shared/legacy-page-base';

@Component({
  selector: 'app-student-drama-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './student-drama-page.component.html',
})
export class StudentDramaPageComponent extends LegacyPageBase {
  protected readonly bodyClasses = ['modal-open', 'popup-page', 'drama-page'];
  protected readonly pageTitle = 'Accoladi | The Performer';
}
