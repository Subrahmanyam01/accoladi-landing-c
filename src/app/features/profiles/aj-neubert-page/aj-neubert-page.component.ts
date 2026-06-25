import { Component } from '@angular/core';

import { LegacyPageBase } from '../../../shared/legacy-page-base';

@Component({
  selector: 'app-aj-neubert-page',
  standalone: true,
  templateUrl: './aj-neubert-page.component.html',
})
export class AjNeubertPageComponent extends LegacyPageBase {
  protected readonly bodyClasses = ['story-page'];
  protected readonly pageTitle = 'Accoladi | A.J. Neubert';
}
