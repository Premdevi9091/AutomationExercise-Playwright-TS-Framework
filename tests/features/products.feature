@products
Feature: Verify Products functionality

Scenario: Verify list of Products
    Given User navigates to Automation Exercise website
    Then Home page should be visible
    When User click on Product button
    Then User should navigated to All Product page
    And click on view products and verify details

Scenario Outline: Verify search products
    Given User navigates to Automation Exercise website
    Then Home page should be visible
    When User click on Product button
    Then User should navigated to All Product page
    And enter the "<product_name>" and click on search
    Then Verify all the products related to "<product_name>" are visible

Examples:
| product_name |
| top |
| shirt |