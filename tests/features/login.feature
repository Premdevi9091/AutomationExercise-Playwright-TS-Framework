@login @smoke
Feature: Validate Login functionality

#Test Case 2: Login User with correct email and password
#Test Case 4: Logout User
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

#Test Case 3: Login User with incorrect email and password
Scenario: Login with invalid credentials
    Given User navigates to Automation Exercise website
    Then Home page should be visible
    When User clicks on SignUp Login
    Then Signup page should be visible
    When "invalid_user" enters email and password
    And User clicks Login button
    Then verify error message for invalid login