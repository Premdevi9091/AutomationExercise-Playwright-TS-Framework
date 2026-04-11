@register @smoke
Feature: Validate Account Registration and Deletion Functionality 

#Test Case 1: Register User
Scenario Outline: Account Register and Delete
    Given User navigates to Automation Exercise website
    Then Home page should be visible
    When User clicks on SignUp Login
    Then Signup page should be visible
    When "<user>" enters name and email
    And User clicks Signup button
    And User fills account information
    And User clicks Create Account button
    And Account should be created successfully
    Then verify Logged in as "<user>" should be display 
    And User click on Delete Account
    And User account should be deleted successfully

Examples:
    | user  |
    | register_user1 |
    | register_user2 |

#Test Case 5: Register User with existing email
Scenario: Register with existing account
    Given User navigates to Automation Exercise website
    Then Home page should be visible
    When User clicks on SignUp Login
    Then Signup page should be visible
    When "valid_user1" enters name and email
    And User clicks Signup button
    And Then verify error message for existing account
