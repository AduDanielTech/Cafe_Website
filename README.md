<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

  <h1>The Gourmet Griddle</h1>

  <h2>Cafe Website Project </h2>
  <p>Welcome to the Cafe Website Project! This Express.js application simulates the functionality of an online cafe website. Users can explore cafe products, add items to their cart, proceed to checkout, make table reservations, and experience simulated payment processing. The project leverages technologies such as Firebase, Node.js, and Express for its backend operations.</p>
  <a href="https://cafe-website-one.vercel.app/">check out the website here</a>

  <h2>Project Overview</h2>
  <p>This project encompasses a range of modules and functionalities that provide an immersive cafe experience:</p>

  <h3>Backend Functionality</h3>
  <p>The backend, built on Node.js and Express.js, handles various endpoints to manage cart interactions, product operations, payment processing, table reservations, and confirmation emails. It also includes mechanisms for browsing and categorizing cafe products.</p>

  <h3>Key Modules</h3>
  <ul>
    <li><code>productsRepo</code>: Manages product-related operations.</li>
    <li><code>productsIndexTemplate</code> and <code>productsMenuTemplate</code>: Templates for displaying product lists and menus.</li>
    <li><code>emailSender</code>: Sends confirmation emails for table reservations.</li>
    <li><code>Repository</code>: A class for managing Firebase database operations.</li>
  </ul>

  <h3>Endpoints</h3>
  <ul>
    <li><code>GET /</code>: Displays the cafe homepage.</li>
    <li><code>GET /menu</code>: Shows the cafe menu, categorized by product types.</li>
    <li><code>POST /search</code>: Allows users to search for products by title.</li>
    <li><code>GET /category/:category</code>: Displays products filtered by a specific category.</li>
    <li>Routes for handling cart actions, admin authentication, product management, table reservations, and more.</li>
  </ul>

  <h2>Advanced Features</h2>
  <ul>
    <li><strong>Product Caching</strong>: The application employs a caching mechanism for products to enhance performance, clearing cached data every 5 minutes.</li>
    <li><strong>Firebase Integration</strong>: The project integrates seamlessly with Firebase, utilizing the <code>Repository</code> class to perform CRUD operations on Firebase's Realtime Database.</li>
    <li><strong>Middleware Utilization</strong>: Middleware is used for managing static files, form data, and cookie-based session handling.</li>
  </ul>

  <h2>Getting Started</h2>
  <ol>
    <li>Install Node.js and npm.</li>
    <li>Clone this repository from GitHub.</li>
    <li>Navigate to the project directory and run <code>npm install</code> to install dependencies.</li>
    <li>Configure your Firebase settings and provide necessary environment variables.</li>
    <li>Run the application using <code>npm start</code>.</li>
  </ol>
  <p>After starting the server, access the application at <a href="http://localhost:3001">http://localhost:3001</a>.</p>

  <h2>Contribution</h2>
  <p>We welcome contributions to enhance the project! Feel free to submit pull requests, address issues, or propose new features. Share your ideas and improvements on the GitHub repository.</p>

  <h2>License</h2>
  <p>This project is licensed under the <a href="LICENSE">MIT License</a>.</p>

  <p>For detailed code and project information, visit the GitHub repository: <a href="https://github.com/yourusername/your-repo-name">Cafe Website Project</a>.</p>

  <p>Happy coding and cafe experience! ☕🚀</p>

</body>
</html>
