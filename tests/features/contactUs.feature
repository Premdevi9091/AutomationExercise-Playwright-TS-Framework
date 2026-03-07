@smoke @contactus
Feature: Validate Contact Us functionality

Scenario: Submit feedback
    Given User navigates to Automation Exercise website
    Then Home page should be visible
    When User click on Contact Us link
    When "valid_user1" fill the form details
    And upload the "test.txt"
    And click on submit button
    Then verify success message
    And User click on Home button
    Then Home page should be visible 


