// ********************** Initialize server **********************************

const server = require('../src/index.js'); //TODO: Make sure the path to your index.js is correctly added

// ********************** Import Libraries ***********************************

const chai = require('chai'); // Chai HTTP provides an interface for live integration testing of the API's.
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const {assert, expect} = chai;

// ********************** DEFAULT WELCOME TESTCASE ****************************

describe('Server!', () => {
  // Sample test case given to test / endpoint.
  it('Returns the default welcome message', done => {
    chai
      .request(server)
      .get('/welcome')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals('success');
        assert.strictEqual(res.body.message, 'Welcome!');
        done();
      });
  });
});

// *********************** TODO: WRITE 2 UNIT TESTCASES **************************
describe('Testing register API', () => {
  it('positive : /register', done => {
    chai
      .request(server)
      .post('/register')
      .send({username: 'olco', email: 'olco2433@colorado.edu', password: 'fortnite'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

it('Negative : /register. Checking invalid name', done => {
  chai
    .request(server)
    .post('/register')
    .send({username: 10, email: 10, password: 'fortnite'})
    .end((err, res) => {
      expect(res).to.have.status(404);
      done();
    });
});
});

describe('Positive: Testing Render', () => {
  // Sample test case given to test /test endpoint.
  it('test "/home" route should render with an html response', done => {
    chai
      .request(server)
      .get('/home') // for reference, see lab 8's login route (/login) which renders home.hbs
      .end((err, res) => {
        res.should.have.status(200); // Expecting a success status code
        res.should.be.html; // Expecting a HTML response
        done();
      });
  });
});

describe('Negative: Testing Redirect', () => {
  // Sample test case given to test /test endpoint.
  it('\login route should redirect to /login', done => {
    chai
      .request(server)
      .post('/login')
      .end((err, res) => {
        res.should.redirectTo(/^http:\/\/127\.0\.0\.1:\d+\/register\?message=User%20not%20found\.\%20Please%20register\.$/); // Expecting a redirect to /login with the mentioned Regex
        done();
      });
  });
});
// ********************************************************************************
