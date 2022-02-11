import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { Routes, RouterModule } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'

import { AppComponent } from './app.component';
import { ViewComponent } from './view/view.component'

const routes: Routes = [
	{
		path: ':server',
		component: ViewComponent
	}
]
@NgModule({
	declarations: [AppComponent, ViewComponent],
	imports: [BrowserModule, RouterTestingModule, RouterModule.forRoot(routes)],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
