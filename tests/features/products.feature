@smoke
Feature: Validate Products functionality

Background: 
    Given User navigates to Automation Exercise website
    Then Home page should be visible
    When User click on Products
    Then User should navigated to All Product page

#Test Case 8: Verify All Products and product detail page
Scenario: List of Products
    When click on view products and verify details

#Test Case 9: Search Product
Scenario Outline: Search products
    When enter the "<product_name>" and click on search
    Then Verify all the products related to "<product_name>" are visible

Examples:
| product_name |
|     top      |
|     shirt    |

#Test Case 12: Add Products in Cart
Scenario Outline: Add product in cart
    When hover on the "<product1_id>" product
    And click on Add to cart
    And click on continue shopping
    And hover on the "<product2_id>" product
    And click on Add to cart
    And click on continue shopping
    And hover on the "<product3_id>" product
    And click on Add to cart
    And click on view cart
    Then verify the products in cart

Examples:
| product1_id | product2_id | product3_id |
|       1     |     2       |      5      |
|       7     |     7       |      7      |
|       4     |     2       |      4      |

#Test Case 13: Verify Product quantity in Cart
Scenario Outline: Product quantity in cart
    When User click on view Product for "<product_id>"
    And User increase quantity to "<increase_qty>" from product details page
    And click on Add to cart from product details page
    And click on view cart
    Then verify the products in cart

Examples:
| product_id | increase_qty |
|     3      |      3       |
|     7      |     10       |

@products
#Test Case 17: Remove Products From Cart
Scenario Outline: Remove Products From Cart
    When hover on the "<product1_id>" product
    And click on Add to cart
    And click on continue shopping
    And hover on the "<product2_id>" product
    And click on Add to cart
    And click on view cart
    And remove the "<rem_product_id>" from cart

Examples:
| product1_id | product2_id | rem_product_id |
|     3       |      4      |       3        |
