@order
Feature: Validate Orders functionality

#Test Case 14: Place Order: Register while Checkout
Scenario Outline: Place order with register while checkout
    Given User navigates to Automation Exercise website
    Then Home page should be visible
    And hover on the "<product_id>" product
    And click on Add to cart
    And click on view cart
    And verify the products in cart
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
    And verify the products in cart
    And click on Proceed To Checkout
    And User click on Delete Account
    And User account should be deleted successfully

Examples:
| product_id |      user        |
|     1      | register_user1   |