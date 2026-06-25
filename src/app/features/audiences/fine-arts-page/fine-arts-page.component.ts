import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LegacyPageBase } from '../../../shared/legacy-page-base';

@Component({
  selector: 'app-fine-arts-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './fine-arts-page.component.html',
})
export class FineArtsPageComponent extends LegacyPageBase {
  protected readonly bodyClasses = ['modal-open', 'popup-page', 'finearts-page'];
  protected readonly pageTitle = 'Accoladi | The Mission Builder';
}
