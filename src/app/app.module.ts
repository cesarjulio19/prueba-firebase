import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: 'firebaseConfig', useValue: {
      apiKey: "AIzaSyCB8uMx1tlD8arlvQeXo3TUN9YXO5L3d9M",
      authDomain: "pokemontcg-3b5dd.firebaseapp.com",
      projectId: "pokemontcg-3b5dd",
      storageBucket: "pokemontcg-3b5dd.firebasestorage.app",
      messagingSenderId: "842543653853",
      appId: "1:842543653853:web:234cb843f27e17d91d8c34",
      measurementId: "G-NDQ5FKWBJV"
    }}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
