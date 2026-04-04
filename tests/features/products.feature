@smoke @products
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


#Test Case 18: View Category Products
Scenario Outline: View Category Products
    Then verify the Category
    When user select category "<category>"
    And user select sub-category "<sub_category>"
    Then all products related to "<category>" and "<sub_category>" should be display

    Examples:
    | category   | sub_category |
    |   Women    |    Tops      |
    |   Kids     |    Dress     |

#Test Case 19: View & Cart Brand Products
Scenario Outline: View & Cart Brand Products
    Then verify the Brands
    When user select brand "<brand>"
    Then all products related to "<brand>" should be display

    Examples:
    |       brand           |
    |         H&M           |
    |   Allen Solly Junior  |


#Test Case 20: Search Products and Verify Cart After Login
Scenario Outline: Search Products and Verify Cart After Login
    When enter the "<product_name>" and click on search
    Then Verify all the products related to "<product_name>" are visible
    #first 3 products
    And add first "<number>" products to cart  
    And click on Cart
    Then verify the products in cart
    When User clicks on SignUp Login
    When "<user>" enters email and password
    And User clicks Login button
    Then verify Logged in as "<user>" should be display
    And click on Cart
    Then verify the products in cart
    And click on logout button

Examples:
| product_name |  number   |      user      |
|     top      |    5      |   login_user1  |

#Test Case 21: Add review on product
Scenario: Add review on product
    When User click on view Product for "4"
    And verify review section
    And enter the "login_user2" details and review
    And click on submit
    And verify review success message

#Test Case 22: Add to cart from Recommended items
Scenario: Add to cart from Recommended items
    And User click on Home page
    Then verify recommended items section
    And add product from recommended section
    And click on Cart
    Then verify the products in cart