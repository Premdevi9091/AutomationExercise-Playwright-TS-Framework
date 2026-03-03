@smoke
Feature: Validate Login feature

Scenario Outline: Login a valid credentials
    Given User navigates to Automation Exercise website
    Then Home page should be visible
    When User clicks on SignUp Login
    Then Signup page should be visible
    When "<user>" enters email and password
    And User clicks Login button
    Then verify Logged in as "<user>" should be display

Examples: 
| user        |
| valid_user1 |


Scenario Outline: Login a invalid credentials
    Given User navigates to Automation Exercise website
    Then Home page should be visible
    When User clicks on SignUp Login
    Then Signup page should be visible
    When "<user>" enters email and password
    And User clicks Login button
    Then verify error message for invalid login

Examples: 
| user         |
| invalid_user |