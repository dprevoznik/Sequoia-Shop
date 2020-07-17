# Sequoia Shop <br>

## Overview

This is a retail fashion website's product detail page created in Javascript and designed to run in a Chrome V8 enviornment. It is made up of a Single page application that re-renders depending on the product data and related meta-data it receives from an external API containing data on products, associated meta-data, reviews, and Q&A . All changes to the page are dynamically rendered based on user input and API response, and any elements which are clicked have their clicks logged to the API for further analysis.
<br/>
This is accomplished using mainly the following tools:

- [React](https://reactjs.org/) <br/>
- [React Router](https://reacttraining.com/react-router/) <br/>
- [Redux](https://redux.js.org/) <br/>
- [Axios](https://github.com/axios/axios) <br/>
- [Bulma](https://bulma.io/) <br/>

## Page Modules

### Product Details

_Developed by Ryan Fulmer_

The Product Details section allows users to view a product's name and price, as well as different images for each product via a dynamic image carousel. The user can select different styles of the product to view, and the interfaces supports an expanded image view for users who wish to look at an enlarged images for greater detail.
<br><br>
![details-functionality](http://g.recordit.co/n7eIvu0bHY.gif)
<br><br>
Users can share the product to various social media platforms, including Facebook, Pinterest, and Twitter. The posts automatically populate with the product's information as well as a link back to the website. Users can also select the number of units they want to purchase and the interface populates the form with the number of units left in stock. Users' purchases can then be added to their cart.
<br><br>
![social-media-functionality](http://g.recordit.co/lMKE7gPg75.gif)
<br><br>

### Questions and Answers

_Developed by Tristan Deitzer_

The Questions and Answers section allows users to view and contribute questions about the displayed product as well as answers to existing questions. The questions and answers are sorted by the 'helpful' rating given by users (users are limited to one helpful vote by site data stored in the browser's local storage), however an answer from the Seller will be displayed before all others. If a user 'reports' a question it will be removed from the display and flagged for internal review by a site administrator.
<br><br>
The module displays only the two most prominent questions and their two most proment answers by default. Buttons allow the user to expand the display of questions to take up a maximum of 100% of the view port, and expand the display of answers to take up a maximum of 50% of the view port. All additional questions or answers are then displayed in their own scrollable lists.
<br><br>
![expand-functionality](http://g.recordit.co/QE1PgEXPWQ.gif)
<br><br>
Users can add a question or an answer about a product through a modal popup, the information inputted for both questions and answers is validated using a combination of [regex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) and functional checks to make sure required feilds are utilized.
<br><br>
![add-question-answer-functionality](http://g.recordit.co/SQtKuu208b.gif)
<br><br>
Users can search existing questions for desired terms using a the live search bar at the top of the module, which will narrow results dynamically as the user inputs charcters.
<br><br>
![live-search-functionality](http://g.recordit.co/zfrnXyVjbr.gif)
<br><br>

### Related Products

_Developed by Dan Prevoznik_

The Related Products section contains a list of products, determined internally, that are related to the product currently being viewed.
![arrow-functionality](http://g.recordit.co/PJU6hDV5IY.gif)

Clicking the Star icon on a product card opens a modal window comparing the details of the current page to those of the product that was selected from the list. Also, clicking on a product card will navigate to the detail page for the product. 
![compare-functionality](http://g.recordit.co/Avhh4Hh9Om.gif)

### Your Outfit

_Developed by Dan Prevoznik_

The Your Outfit section contains a list of products which the user has selected to group together as an "outfit". The list items persist across page navigation.
![add-to-outfit-functionality](http://g.recordit.co/d55Bt6W8Ea.gif)

<br><br>

### Ratings and Reviews

_Developed by Mayanne Chess_

The Ratings and Reviews section allows users to see the overall rating for a product, as well as the number of reviews, percent of reviewers recommending the product, and the product's performance on a number of features such as quality and fit. Reviews may be sorted by relevance, helpfulness, or most recent. The module displays two reviews by default, with options to expand and collapse the reviews list, which will not take up a height greater than that of the viewport.

![reviews-list-functionality](http://g.recordit.co/sVNLBCKQu9.gif)

A modal form allows users to add a new review. They may select the number of stars to give the product and either recommend it or not. The review body must be at least 50 characters, which is live validated beneath the input textarea. Responsive error messages prevent the user from submitting the form when required fields are missing. In addition, the user may upload up to five photos, which are hosted via a third-party media API.

![add-a-review-functionality](http://g.recordit.co/jbcpDf6Khj.gif)

<br><br><br>

## Package.json Details

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000/product/1](http://localhost:3000/product/1) to view it in the browser.

In development mode the page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br />
Uses Puppeteer to simulate page interaction and test modules.

#### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

Once the app has been built it can deployed to a server by installing node, git, and npm:<br />
1.) pull down the repository<br />
2.) run `npm install` in the root directory<br />
3.) run `node server/server.js`<br />
4.) visit via [http://public.ip.address/product/1](http://public.ip.address/product/1) or if running on local host [http://localhost/product/1](http://localhost/product/1)<br />

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
