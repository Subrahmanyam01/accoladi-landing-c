import { Routes } from '@angular/router';

import { AjNeubertPageComponent } from './features/profiles/aj-neubert-page/aj-neubert-page.component';
import { FineArtsPageComponent } from './features/audiences/fine-arts-page/fine-arts-page.component';
import { HomePageComponent } from './features/home/page/home-page.component';
import { HowPageComponent } from './features/info/how-page/how-page.component';
import { RecruiterPageComponent } from './features/audiences/recruiter-page/recruiter-page.component';
import { StoryPageComponent } from './features/stories/story-page/story-page.component';
import { StudentDancePageComponent } from './features/audiences/student-dance-page/student-dance-page.component';
import { StudentDramaPageComponent } from './features/audiences/student-drama-page/student-drama-page.component';
import { StudentMusicPageComponent } from './features/audiences/student-music-page/student-music-page.component';
import { TeacherPageComponent } from './features/audiences/teacher-page/teacher-page.component';
import { WhatPageComponent } from './features/info/what-page/what-page.component';
import { WhyPageComponent } from './features/info/why-page/why-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'what', component: WhatPageComponent },
  { path: 'how', component: HowPageComponent },
  { path: 'why', component: WhyPageComponent },
  { path: 'students/music', component: StudentMusicPageComponent },
  { path: 'students/dance', component: StudentDancePageComponent },
  { path: 'students/drama', component: StudentDramaPageComponent },
  { path: 'recruiters', component: RecruiterPageComponent },
  { path: 'educators/teachers', component: TeacherPageComponent },
  { path: 'educators/fine-arts', component: FineArtsPageComponent },
  { path: 'profiles/aj-neubert', component: AjNeubertPageComponent },
  { path: 'story', component: StoryPageComponent },
  { path: '**', redirectTo: '' },
];
