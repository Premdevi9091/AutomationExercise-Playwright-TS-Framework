@order @smoke
Feature: Validate Orders functionality

Background: 
    Given User navigates to Automation Exercise website
    Then Home page should be visible

#Test Case 14: Place Order: Register while Checkout
#Test Case 23: Verify address details in checkout page
Scenario Outline: Place order register while checkout
    When hover on the "<product1_id>" product
    And click on Add to cart
    And click on continue shopping
    When hover on the "<product2_id>" product
    And click on Add to cart
    And click on view cart
    And click on Proceed To Checkout
    And click on Register Login
    When "<user>" enters name and email
    And User clicks Signup button
    And User fills account information
    And User clicks Create Account button
    And Account should be created successfully
    Then verify Logged in as "<user>" should be display 
    And click on Cart
    And click on Proceed To Checkout
    And verify Address Details section
    And verify Review Your Order
    And verify the products in cart
    And enter description in comment text
    And click on Place Order
    And enter the card details
    And click on Pay and Confirm Order
    Then verify order placed successfully
    And User click on Delete Account
    Then User account should be deleted successfully

Examples:
| product1_id |  product2_id  |    user         |
|     1       |       3       |  register_user1 |
#|     4       |       2       |  register_user2 |

#Test Case 15: Place Order: Register before Checkout
Scenario Outline: Place order after register
    When User clicks on SignUp Login
    When "<user>" enters name and email
    And User clicks Signup button
    And User fills account information
    And User clicks Create Account button
    And Account should be created successfully
    Then verify Logged in as "<user>" should be display 
    When User click on Products
    Then User should navigated to All Product page
    And User click on view Product for "<product_id>"
    And click on Add to cart from product details page
    And click on view cart
    And verify the products in cart
    And click on Proceed To Checkout
    And verify Address Details section
    And verify Review Your Order
    And verify the products in cart
    And enter description in comment text
    And click on Place Order
    And enter the card details
    And click on Pay and Confirm Order
    Then verify order placed successfully
    And User click on Delete Account
    Then User account should be deleted successfully

Examples:
| product_id  |    user         |
|     4       |  register_user2 |


#Test Case 16: Place Order: Login while Checkout
Scenario Outline: Place order login while checkout
    When User click on Products
    Then User should navigated to All Product page
    And User click on view Product for "<product_id>"
    And click on Add to cart from product details page
    And click on view cart
    And click on Proceed To Checkout
    And click on Register Login
    Then Signup page should be visible
    When "<user>" enters email and password
    And User clicks Login button
    Then verify Logged in as "<user>" should be display
    And click on Cart
    And click on Proceed To Checkout
    And verify the products in cart
    And enter description in comment text
    And click on Place Order
    And enter the card details
    And click on Pay and Confirm Order
    Then verify order placed successfully
    And click on logout button

Examples:
| product_id  |    user       |
|     4       |  valid_user1  |


#Test Case 17: Place Order: Login after Checkout
Scenario Outline: Place order after login
    When User clicks on SignUp Login
    Then Signup page should be visible
    When "<user>" enters email and password
    And User clicks Login button
    Then verify Logged in as "<user>" should be display
    When hover on the "<product_id>" product
    And click on Add to cart
    And click on view cart
    And verify the products in cart
    And click on Proceed To Checkout
    And verify Review Your Order
    And verify the products in cart
    And enter description in comment text
    And click on Place Order
    And enter the card details
    And click on Pay and Confirm Order
    Then verify order placed successfully
    And click on logout button

Examples:
| product_id  |    user       |
|      5      |  valid_user1  |