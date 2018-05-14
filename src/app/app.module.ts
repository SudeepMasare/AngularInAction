import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AccessComponent } from './access/access.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'access', component: AccessComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AccessComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
