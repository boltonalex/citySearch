# Traveller - Smart front end take-home technical test

## Goals

1.  Allow the user to search for cities using the provided input.
2.  Display the cities found on the home page.
3.  Allow the user to set the visited/wishlist state of a city to `true`/`false` via API requests.
4.  Cities that have visited/wishlist set to `true` should then appear on their respective pages.

## Install and run

```
npx lerna bootstrap
yarn start:all
```

## Info

### API

We have provided both a REST and a GraphQL API, you are free to use whichever you are most comfortable with in your solution. You can find documention for these at the following URLS:

- REST - [http://localhost:4000/rest](http://localhost:4000/rest)
- GraphQL - [http://localhost:4000/graphql](http://localhost:4000/graphql)

### Client

After running the client you will find a home page with an input field that is currently non-functional as well an empty wish list and visited pages.

We have provided a few packages that will help you in your solution:

- If you choose to use GraphQL we have added [Apollo Client](https://www.apollographql.com/docs/react).
- For testing, we have provided [Jest](https://jestjs.io)/[React Testing Libary](https://testing-library.com/docs/react-testing-library/intro).
- For styling, you will find the component library [Chakra UI](https://chakra-ui.com).

## What we're looking for

- Use of abstractions where they make sense (DRY).
- Sensible choices regarding performance.
- Functionality tested.
- An accessible solution.
- We use TypeScript and would be happy to see a well typed solution, however if you're not comfortable with this feel free to use JavaScript.


## My Solution




My first focus was UX; I worked to make this smooth, logical and performant. Next, I refactored the code for readability, removing repetition where sensible. The aim was to make the code as programmatically pure and declarative as possible.
Last but not least, is to validate my components with tests.

I chose not to use centralised state management and instead opted to pass props because I wanted to keep the application simple. Bringing in a solution with more overhead for a few instances of data traversal didn't seem logical.

I would use a solution like redux toolkit if more functionality would be required as the current solution would not scale nicely.

I'm more familiar with restful APIs so I chose to stick with that, I think the functionality provided by graphQL to specify a subset of the required data would have significant performance improvements for my solution.

I added some functionality to smooth the page navigation UX, using local storage to rehydrate the search input. I also put in a debounce on search input to smooth the UX and reduce the number of data calls. (This library is heavy for this usage, writing a custom helper function for this would cut out this dependency and 'black-box' code being used in the repo.)

The testing structure I've put in place mostly focuses on the presentation of data, with the smaller components essentially being "proof of render" rather than testing the end to end UX.  I decided on this approach due to time constraints.

For a production solution, I would implement a test set to check the code on pre-commit, validating my code changes for linting, and any new tests being committed. 

I would also implement a full run of the repo unit tests on pre-push so that I can be confident that any new changes are backwards compatible. 

It would also be important to implement either a cypress or selenium test automation platform, running a smoke test as part of a merge to master and a regression test set to run a deployment pipeline or a nightly cron job (depending on the duration of the test run).

Areas of future work: 

- smooth the UX on removing items from the Visited and Wishlist pages.
	- Perhaps allowing the toggle to switch animation, then fade out,
then remove the item from DOM, I don't like how abrupt the option is cleared from the list at present.
- sort options on the home page, perhaps by alphabetical order and also by visited/wishlist
- adding other forms of testing, testing the endpoints, the changes to logic state and some visual testing would increase confidence 

