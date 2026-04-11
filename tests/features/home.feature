@home @smoke
Feature: Validate Home functionality

#Test Case 25: Verify Scroll Up using 'Arrow' button and Scroll Down functionality
Scenario: Verify Scroll Up using 'Arrow' button
    Given User navigates to Automation Exercise website
    Then Home page should be visible
    Then verify subscription text and fields
    And click on arrow button
    And verify page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen

#Test Case 26: Verify Scroll Up without 'Arrow' button and Scroll Down functionality
Scenario: Verify Scroll Up using without 'Arrow' button
    Given User navigates to Automation Exercise website
    Then Home page should be visible
    Then verify subscription text and fields
    And verify page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen