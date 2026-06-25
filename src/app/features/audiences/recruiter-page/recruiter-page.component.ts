import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LegacyPageBase } from '../../../shared/legacy-page-base';

@Component({
  selector: 'app-recruiter-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recruiter-page.component.html',
})
export class RecruiterPageComponent extends LegacyPageBase {
  protected readonly bodyClasses = ['modal-open', 'popup-page', 'recruiter-page'];
  protected readonly pageTitle = 'Accoladi | The Scout';
}
