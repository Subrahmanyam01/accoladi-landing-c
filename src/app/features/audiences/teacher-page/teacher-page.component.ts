import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LegacyPageBase } from '../../../shared/legacy-page-base';

@Component({
  selector: 'app-teacher-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './teacher-page.component.html',
})
export class TeacherPageComponent extends LegacyPageBase {
  protected readonly bodyClasses = ['modal-open', 'popup-page', 'teacher-page'];
  protected readonly pageTitle = 'Accoladi | The Champion';
}
