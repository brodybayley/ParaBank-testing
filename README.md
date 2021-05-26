# ParaBank-testing

Cypress automated smoke test suite created exclusively for Parabank.

## Getting Started

1. Install dependencies with `npm install`.
2. Start the web server using the `npm run cypress:open` command. Cypress should open automatically in the browser, but depending on the device this may take some time to open.
3. Once the browser opens you will see a list of integration tests.
4. Add a `cypress.env.json` file to the project root directory and then create a `.gitignore` and add `/cypress.env.json` to the `.gitignore`.
5. If you don't already have an account that you would like to use for testing then register a test account before proceeding. Copy the below object and paste it into your `cypress.env.json` file and replace the below highlighted pieces of information from your test account:
   `{
   "firstName": "ADD TEST FIRST NAME IN BETWEEN QUOTES",
   "lastName": "ADD TEST LAST NAME IN BETWEEN QUOTES",
   "username": "ADD USERNAME IN BETWEEN QUOTES",
   "password": "ADD PASSWORD"
   }`

## Dependencies

- Cypress

## Using Application

- On the browser under `INTEGRATION TESTS` click on any of the hyperlinked tests.
- A new browser will open up and the tests will begin running
- You can view the tests as they run, stop/start tests and see which tests pass or fail.

## Key Decisions

- Structured test cases based on requirements and to ensure high test coverage.
- Added a few comments within the test cases to help guide other developers in using the code.
- Added some recommendations in the code for improvement around error messages for a stronger user experience.
- Section 05 transfer-funds: For client security it would be worthwhile to add a test case to check that the amount of funds transferred doesn’t exceed what is in the account. Also, a test case checking that the transfer account numbers are different would be useful. There doesn’t appear to be functionality yet that is checking these highlighted points so I didn’t add test cases, but would add these tests if/when the functionality is implemented.
- Section 06 Bill Pay: For client security, once/if the functionality is implemented it would be useful to add a test case to check that the amount of funds being transferred to pay the bill doesn’t exceed what is in the account. Also, when the account or amount starts with a number and then has a letter added in at some other point an error message isn't produced, but wen you press submit an error is produced. This appears to be a glitch, but wanted to bring it to your attention and added a test case just in case it is expected behavior.
