describe('Working with fixtures', () => {
    let data: { email: string; password: string };

    before(() => {
      cy.fixture('login').then((info) => {
        data = info;
      });
    });

    it('logs in user using fixture data', () => {
      cy.visit('/login');

      cy.get('.email').type(data.email);
      cy.get('.password').type(data.password);
      cy.get('.loginbtn').click();
      cy.contains('Login successful. Redirecting to user dashboard...');
      cy.contains('users works!');
    });
});
describe('Working with fixtures', () => {
    let data: { email: string; password: string };

    before(() => {
      cy.fixture('login2').then((info) => {
        data = info;
      });
    });

    it('trying to log in with wrong credentials', () => {
      cy.visit('/login');

      cy.fixture('login2.json').then((dataarray)=>{
        dataarray.forEach((data:{email:string, password:string})=>{

        cy.get('.email').type(data.email);
        cy.get('.password').type(data.password);


        if(data.email == 'favourgaitano@gmail.com' && data.password == '123456'){
            cy.get('.loginbtn').click().then(el=>{
                cy.location('pathname').should('equal', '/users')
                cy.get('.loginbtn').click();
                cy.visit('/login')
            })
        }else if(data.email != 'favourgaitano@gmail.com' && data.password =='123456'){
            cy.get('.loginbtn').click()
            cy.contains('Login failed. Please check your credentials and try again')
        }
        })});


    });
});


