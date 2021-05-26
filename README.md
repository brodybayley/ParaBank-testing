# ParaBank-testing

Cypress automated smoke test suite created exclusively for Parabank.

## Getting Started

1. Install dependencies with `npm install`.
2. Start the web server using the 'npm run cypress:open' command. Cypress should open automatically in the browser, but depending on the device this may take some time to open.
3. Once the browser opens you will see a list of integration tests.
4. Add a cypress.env.json file to the project root directory and then create a .gitignore and add '/cypress.env.json' to the .gitignore.
5. If you don't already have an account that you would like to use for testing then register a test account before proceeding. Copy the below object and paste it into your cypress.env.json file and replace the below highlighted pieces of information from your test account:
   {
   "firstName": "ADD TEST FIRST NAME IN BETWEEN QUOTES",
   "lastName": "ADD TEST LAST NAME IN BETWEEN QUOTES",
   "username": "ADD USERNAME IN BETWEEN QUOTES",
   "password": "ADD PASSWORD"
   }

## Dependencies

- Cypress

## Using Application

- On the browser under 'INTEGRATION TESTS' click on any of the hyperlinked tests.
- A new browser will open up and the tests will begin running
- You can view the tests as they run, stop/start tests and see which tests pass or fail.
