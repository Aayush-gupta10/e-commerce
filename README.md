**NAGP Angular Assignment**

- **Project Name:** e-commerce

- **Git Hub and Netlify Links**
  - Git Hub: [click here](https://github.com/Aayush-gupta10/e-commerce)
  - Netlify: [click here](https://epic-goldberg-471999.netlify.app)

- **Login Credentials**
  - Username: guest
  - Password: guest

- **Bonus Point (**Both Attempted**)**
  - Category Tree: By default, all products that are store in the json db rendered on the home page but when the user selects the category from the category menu products gets filtered on the home page itself.
  - Translation: System supports two languages i.e., English and French and there is drop-down provided in the header to choose the language. Based on the selection content gets updated.

- **Unit Testing:** Unit test cases of one component and one service are written. 
  - Component Name: Cart-page component
    - ` `File Name: cart-page.component.spec.ts
  - Service Name: Cart Service
    - File Name: cart.service.spec.ts

- **Backend Approach:**  JSON file.

- **Project Structure:** Project is divided into 3 parts i.e., core, feature and shared.
  - Core: - It contains code that will be used to instantiate app and load some core functionality. App contains: 
    - Guards: Only the authorized user can go the cart and checkout page.
    - Models: It is used for modelling the data. App contains:
      - Cart Model
      - Product Model
      - User Model
    - Resolver: It allows the application to fetch data before navigating to the route. App used following resolvers:
      - Product List: To fetch the list of the products form json db.
      - Product: To fetch the particular product form json db.
    - Services: It is used to maintain data throughout the life of an application and share data among different components.            Project contains following services:
      - Auth Service: To check the authenticity of the user.
      - Product Service: It consist of methods to fetch the product list from the json database, to get the particular product form the db, and get the searched product based on the filtering criteria.
      - Cart Service: It is responsible for various cart-based operations like add product to the cart, remove product, update product quantity and calculate total cost of the added products.

- Feature: Feature module is an organizational best practice. It delivers a cohesive set of functionalities focused on a specific application. App contains following feature modules:
  - Authentication Module: It consist of login component which serves the login page for the user and directs the authentic user to the return URL and shows alert with invalid credentials for unauthorized users.
  - Product Module: It contains two components, product-list and product-detail component. Product list component is responsible to show the product grid on the dashboard user can add product to the cart. Product detail component served the detail of the selected product and user can add product to the cart with its quantity.
  - Cart Module: It consist of the cart-page component which rendered only for the logged users and it served the cart page so that the user can see their cart products and can increase, decrease the product quantity, and can also delete the product from the cart.
  - Checkout Module: It consist of two components namely checkout-products and shipping details. Both rendered for the logged users Checkout-products serve the view to show the final cart and total cost for the same. Shipping detail component rendered a reactive form to enter the shipping details and place the order.
  - Dashboard Module: It is responsible for the routing of the different screens and render the same.

- Shared Module: It contains things that are used everywhere in the app. It contains header and footer component.

- Miscellaneous:
  - Linting: On executing ng lint command application shows “All file pass linting.”
  - Form Validation: Login and shipping details form contains required form validation.
  - Pagination: pagination is applied on the product-list page.


