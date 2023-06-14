import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BoardComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
