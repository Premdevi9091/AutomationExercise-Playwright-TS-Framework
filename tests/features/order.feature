@order @smoke
Feature: Validate Orders functionality

#Test Case 14: Place Order: Register while Checkout
Scenario Outline: Place order with register while checkout
    Given User navigates to Automation Exercise website
    Then Home page should be visible
    And hover on the "<product1_id>" product
    And click on Add to cart
    And click on continue shopping
    And hover on the "<product2_id>" product
    And click on Add to cart
    And click on view cart
    And click on Proceed To Checkout
    And click on Register Login
    Then Signup page should be visible
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
|     4       |       2       |  register_user2 |
