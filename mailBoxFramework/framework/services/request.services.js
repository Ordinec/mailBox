import supertest from 'supertest';
import { mailData } from '../config/mail';
import { urls } from '../config/urls';

const Request = function Request() {
  this.checkEmail = async function check(emailToCheck) {
    const result = await supertest(urls.base).get(`/check?access_key=${mailData.apiKey}&email=${emailToCheck}`)
      .set('Accept', 'application/json');
    return result;
  };
  this.callFunction = async function call(apiFunction, valueToSend) {
    const result = await supertest(urls.base).get(`/${apiFunction}?access_key=${mailData.apiKey}&${valueToSend}`)
      .set('Accept', 'application/json');
    return result;
  };
  this.callWithAuthentication = async function callWithAuth(authenticationParameter) {
    const result = await supertest(urls.base).get(`/check?${authenticationParameter}`)
      .set('Accept', 'application/json');
    return result;
  };
};

export { Request };
