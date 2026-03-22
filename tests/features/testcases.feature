@testcases @smoke
Feature: Validate Test Cases functionality

#Test Case 7: Verify Test Cases Page
Scenario Outline: Test Cases Page
    Given User navigates to Automation Exercise website
    Then Home page should be visible
    And click on Test Cases
    And User should navigated to Test Cases page
    And verify the list of TestCases
