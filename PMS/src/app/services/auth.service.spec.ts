import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { registerDetails } from '../interfaces/register.interfaces';
import { loginDetails } from '../interfaces/login.interfaces';



describe('AuthService', () => {
  let service: AuthService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
    testingController = TestBed.inject(HttpTestingController)
  });

  afterEach(()=> {testingController.verify()})

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('registers a user', ()=>{
    let mockUser: registerDetails = {
      name: "user",
      email: "user@yopmail.com",
      password: "user"

    }

    service.registerUser(mockUser).subscribe(res=>{
      expect(res.message).toEqual("Account created successfully")
    })

    const mockReq = testingController.expectOne('http://localhost:4100/users');
    expect(mockReq.request.method).toEqual('POST')
    expect(mockReq.request.body).toBe(mockUser)
    mockReq.flush({"message": "Account created successfully"})
  })
  it('it logs a user', ()=>{
    let mockUserlogins: loginDetails = {
      email: "user@yopmail.com",
      password: "user"

    }

    service.loginUser(mockUserlogins).subscribe(res=>{
      expect(res.message).toEqual("Login successfully Redirecting .....")
    })

    const mockReq = testingController.expectOne('http://localhost:4100/users/login');
    expect(mockReq.request.method).toEqual('POST')
    expect(mockReq.request.body).toBe(mockUserlogins)
    mockReq.flush({"message": "Login successfully Redirecting ....."})
  })
});
