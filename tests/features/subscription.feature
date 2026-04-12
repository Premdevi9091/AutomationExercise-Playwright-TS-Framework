@subscription
Feature: Validate Subscription functionality

#Test Case 10: Verify Subscription in home page
Scenario Outline: Subscription on Home Page
    Given User navigates to Automation Exercise website
    Then Home page should be visible
    Then verify subscription text and fields
    And enter the "<email>"
    And submit and verify "You have been successfully subscribed!" is visible

Examples:
| email       |
| valid_user1 |

#Test Case 11: Verify Subscription in Cart page
Scenario Outline: Subscription on Cart Page
    Given User navigates to Automation Exercise website
    Then Home page should be visible
    And click on Cart
    Then verify subscription text and fields
    And enter the "<email>"
    And submit and verify "You have been successfully subscribed!" is visible
    
Examples:
| email          |
| register_user1 |
