import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AuthService } from 'shared/services/auth.service';
import { NewsPageComponent } from './news-page/news-page.component';
import { MusicPageComponent } from './music-page/music-page.component';

const firebaseConfig = {
  apiKey: "AIzaSyB0Fth8cK78Ighu0-e8R9WChWy4TFa5vvI",
  authDomain: "buet-hackathon-4f3f9.firebaseapp.com",
  projectId: "buet-hackathon-4f3f9",
  storageBucket: "buet-hackathon-4f3f9.appspot.com",
  messagingSenderId: "617435512787",
  appId: "1:617435512787:web:57352475e622cc50c2b926"
};

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule //
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    RegisterComponent,
    NewsPageComponent,
    MusicPageComponent
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
