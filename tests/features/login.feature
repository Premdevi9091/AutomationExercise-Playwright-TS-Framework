@smoke @login
Feature: Validate Login functionality

Scenario Outline: Login & Logout with valid credentials
    Given User navigates to Automation Exercise website
    Then Home page should be visible
    When User clicks on SignUp Login
    Then Signup page should be visible
    When "<user>" enters email and password
    And User clicks Login button
    Then verify Logged in as "<user>" should be display
    And click on logout button
    Then Signup page should be visible

Examples: 
| user        |
| valid_user1 |


Scenario: Login with invalid credentials
    Given User navigates to Automation Exercise website
    Then Home page should be visible
    When User clicks on SignUp Login
    Then Signup page should be visible
    When "invalid_user" enters email and password
    And User clicks Login button
    Then verify error message for invalid login