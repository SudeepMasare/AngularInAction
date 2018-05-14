import { Component, Input, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

@Injectable()
export class AppComponent {

  accessToken: String;
  allowDenyflag: boolean;
  radio: String;
  resourceAccessResponse: String;

  @Input()
  name: string;

  @Input()
  password: string;

  constructor(public http: HttpClient, public navigation: Router) {

  }

  login(event: any, inputName: any, inputPassword: any) {

    var inputName = inputName.value;
    var inputPassword = inputPassword.value;

    let tokenHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic SERGQzpGRFNlY3VyZWRIREZD',
        'Accept': 'application/json'
      }
    );

    var body = 'client_id=HDFC'
      + '&client_secret=FDSecuredHDFC'
      + '&username=FirstData'
      + '&password=FDAuthentication'
      + '&grant_type=password'
      + '&scope=openid';

    console.log(inputName);
    console.log(inputPassword);

    if (inputName == "1" && inputPassword == "1") {

      console.log("Yes Bank");
      console.log(tokenHeaders.get('Content-Type'));
      console.log(tokenHeaders.get('Authorization'));
      console.log("Body :" + body);

      this.http.post('http://localhost:8081/firstdata/oauth/token', body, { headers: tokenHeaders }).subscribe(
        tokenResponse => {
          console.log(tokenResponse);
          this.accessToken = tokenResponse.access_token;
          console.log("Access Token : " + this.accessToken);
        }
      );

      if (this.accessToken !== null) {
        this.allowDenyflag = true;
        console.log("allowDenyflag : " + this.allowDenyflag);
      }

    }

  }

  authorize() {
    console.log(this.radio);
    if (this.radio == "allow") {

      let resourceHeaders = new HttpHeaders(
        {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + this.accessToken,
          'Accept': 'application/json'
        }
      );

      console.log(resourceHeaders.get('Authorization'));

      const options = { resourceHeaders, responseType: 'text' as 'text' };

      this.http.get('http://localhost:8082/resource', { headers: resourceHeaders, responseType: 'text' }).subscribe(
        resourceResponse => {
          console.log(resourceResponse);
          if (resourceResponse.search("Successful") == -1) {
            console.log("Not found");
          } else {
            console.log("found");
            this.navigation.navigateByUrl("/access");
          }
        }
      );
    }
  }
}