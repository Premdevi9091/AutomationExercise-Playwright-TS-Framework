@products @smoke
Feature: Validate Products functionality

Scenario: List of Products
    Given User navigates to Automation Exercise website
    Then Home page should be visible
    When User click on Products
    Then User should navigated to All Product page
    And click on view products and verify details

Scenario Outline: Search products
    Given User navigates to Automation Exercise website
    Then Home page should be visible
    When User click on Products
    Then User should navigated to All Product page
    And enter the "<product_name>" and click on search
    Then Verify all the products related to "<product_name>" are visible

Examples:
| product_name |
| top |
| shirt |

Scenario: Add product in cart
    Given User navigates to Automation Exercise website
    Then Home page should be visible
    When User click on Products
    Then User should navigated to All Product page
    And hover on the "1" product
    And click on Add to cart
    And click on continue shopping
    And hover on the "4" product
    And click on Add to cart
    And click on continue shopping
    And hover on the "2" product
    And click on Add to cart
    And click on continue shopping
    And hover on the "2" product
    And click on Add to cart
    And click on view cart
    And verify the products in cart
