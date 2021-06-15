import { test } from '@jest/globals';
import { Request } from '../framework/services/request.services';

describe('Base email service tests', () => {
  test('Testing a happy path', async () => {
    const result = await new Request().checkEmail('test@test.com');
    expect(result.status).toBe(200);
    expect(result.body.domain).toBe('test.com');
    expect(result.body.format_valid).toBe(true);
  });
  it('Testing wrong email format', async () => {
    const result = await new Request().checkEmail('123.com');
    expect(result.status).toBe(200);
    expect(result.body.format_valid).toBe(false);
  });
  it.each`
    request    | email              | errorCode | errorMessage                       
    ${'check'} | ${''}              | ${210}    | ${'no_email_address_supplied'}  
    ${'0'}     | ${'test@test.com'} | ${103}    | ${'invalid_api_function'}      
  `('Testing error codes', async ({
    request, email, errorCode, errorMessage,
  }) => {
    const result = await new Request().callFunction(request, email);
    expect(result.body.success).toBe(false);
    expect(result.body.error.code).toBe(errorCode);
    expect(result.body.error.type).toBe(errorMessage);
  });
  it.each`
    request             | errorCode | errorType               | errorMessage           
    ${''}               | ${101}    | ${'missing_access_key'} | ${'You have not supplied an API Access Key. [Required format: access_key=YOUR_ACCESS_KEY]'} 
    ${'access_key=123'} | ${101}    | ${'invalid_access_key'} | ${'You have not supplied a valid API Access Key. [Technical Support: support@apilayer.com]'}     
  `('Testing authentication errors', async ({
    request, errorCode, errorType, errorMessage,
  }) => {
    const result = await new Request().callWithAuthentication(`${request}`);
    console.log(result.body);
    expect(result.body.success).toBe(false);
    expect(result.body.error.code).toBe(errorCode);
    expect(result.body.error.type).toBe(errorType);
    expect(result.body.error.info).toBe(errorMessage);
  });
});
