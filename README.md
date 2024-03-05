# COMPSCI 732 / SOFTENG 750 Lab 02

## Exercise One - Introducing React Router

In this exercise, we'll add React Router to an existing simple React app.

Start by examining the [exercise-01](./exercise-01/) app, and running it on your machine (_remember to `npm install` first to install dependencies!_). You'll see that the app currently displays the `HomePage` and `AboutPage` components, one after the other. We would instead like to modify the app, such that the `HomePage` will be displayed when navigating to `/`, and the `AboutPage` will be displayed when navigating to `/about`. We will use React Router v6 to do this.

First, we need to add React Router as a dependency, to our `package.json`. To do this, run the following command in the `exercise-01` folder:

```sh
npm install react-router-dom
```

Next, we need our entire app to be able to access React Router's features. The best way to do this is to surround `<App />` in a `BrowserRouter` component, from within `main.jsx`. Do this now:

```jsx
<BrowserRouter>
  <App />
</BrowserRouter>
```

**Hint:** Remember you'll need to `import` the component (similarly to many other steps in this and other labs). Check out the lecture and example material if you're not sure how to do this.

Next, we'll head to `App.jsx`. We'll want to completely change the definition of this component. We will want a `Routes` component do be defined. Within that, we will want two `Route` components:

- When we navigate to the path `/`, the `HomePage` should be rendered.
- When we navigate to the path `/about`, the `AboutPage` should be rendered.

If we navigate anywhere else, just a blank screen should be displayed at this stage.

**Hint:** Remember to continually test your app as you go. As we are using a toolchain with hot reload functionality, this is simple - every time we make a change and save, we can immediately see our changes (or error messages!) show up within the browser.

## Exercise Two - Adding a Header and Footer

Continuing on from Exercise One, we now want to add a header and footer to our app. The header and footer should always be displayed, no matter whether the homepage or about page are currently being displayed. There are a few ways we could do this, but for this exercise (and best practice!), **do not render any additional components within `App.jsx`, outside of the `<Routes>` hierarchy**. We will instead use React Router's `Outlet` component.

To begin, create a new component - let's call it `PageLayout`. Have that component render a single `div` with `className="container"` - similar to how `HomePage` and `AboutPage` have currently been setup. Within that `div`, render a React Router `Outlet`. Next, _remove_ the `div` from `HomePage` and `AboutPage`, because we're extracting that shared component out into the `PageLayout` component.

**Hint:** If you just remove the `div`, you might get an error stating "Unexpected token" or something similar. This is because the `return` statement of your component can only return _one_ top-level component (which may have any number of children). You can use the `<React.Fragment>` component - or just `<>` for short - to get around this. For example:

```jsx
// Doesn't work
function C1() {
    return (
        <p>First para</p>
        <p>Second para</p>
    )
}

// This works fine
function C2() {
    return (
        <React.Fragment>
            <p>First para</p>
            <p>Second para</p>
        </React.Fragment>
    )
}

// So does this.
function C2() {
    return (
        <>
            <p>First para</p>
            <p>Second para</p>
        </>
    )
}
```

This is a way of having your components essentially render multiple children, without having to have unnecessary `div`s in your component hierarchy.

Once you've made this change, you'll notice that your page changes - because we no longer are rendering that `<div className="container">` - so the styles that were applied to the `container` CSS class (see `index.css`) are no longer being applied. Our next step is to modify `App.jsx`, so that our `HomePage` and `AboutPage` components are rendered _inside_ our `PageLayout` component, at the location of the `Outlet` which we defined earlier.

To do this, we will _nest_ our `Route`s:

- Inside our `Routes` component, render a _single_, _top-level_ `Route` component, whose path is `/`. Have it render the `PageLayout` as its `element`.
- Inside that top-level Route, render two child routes. The `AboutPage` should be rendered when the path is `about`. The `HomePage` should be rendered as the `index` path (consult the lecture / example material, or the React Router docs, if you have no idea what this means!). Now, our page should look exactly as it did before.

Finally, let's add a header and footer to the `PageLayout` component. Stick the header _before_ the `div` that's already there, and stick the footer _after_ that. You can include any content you like in the header and footer - it's up to you.

Once complete, you should be able to see your app's header and footer displayed _always_, no matter whether the `HomePage` or `AboutPage` are being rendered.

## Exercise Three - Default page

Continuing on from Exercise Two, add a "404" page component to your app. This component should be rendered instead of `HomePage` or `AboutPage`, when the user navigates anywhere other than `/` or `/about`.

As a bonus, within the error page, display the path that the user has tried to navigate to, so they can more easily see where they went wrong. This can be done using the `useLocation()` hook.

## Exercise Four - Links

Continuing on, let's now modify our page header to include links to the Homepage and About page. To do this, we can use React Router's `Link` or `NavLink` components.

**Hint:** Remember that, when specifying the navigation path in a Link's `to` prop, the path can either be _absolute_ (starting with `/`) or _relative_. If relative paths are used, these are relative to where the component sits within the React Router `Route` hierarchy. Since the `PageLayout` component where we're rendering these `Link`s is rendered in the _top-level_ `Route`, any relative links within will be relative to that top level. Therefore our links to the homepage and about pages can be:

- For the homepage, "" or "."
- For teh about page, "about".

As a bonus, remember that `NavLink` can change its style depending on whether the link is currently active. Experiment with this, and some custom styles, to make it obvious to the user which link is currently active.

## Exercise Five - Params and programmatic navigation

For this exercise, we'll leave behind the app we were working on for Exercises one - four, and move onto a different app. In the [exercise-05](./exercise-05/) folder, you'll find the beginnings of a Pokédex app.

Take a look at the existing source code and run the app, making sure you understand how everything works and fits together (focusing on the React code - the CSS styles aren't so important). When you run the app, you'll notice that a list of pokémon is displayed on the left, with a blank panel on the right. This is the `PokedexLayout` component. And, as you can see within `App.jsx`, if we navigate to `/1`, then a `PokedexPage` component with its `id` prop set to `1` is rendered within the `Outlet` contained in the `PokedexLayout` - causing it to be displayed in the righthad panel.

We will modify the app so that:

1. When we navigate to the root (i.e. `/`), we will be automatically redirected to `/1`, causing the first pokémon page to be displayed
2. Navigating to any valid number (e.g. `/1`, `/42`, etc - anything between 1 and 150 inclusive) will display the page for the corresponding pokémon
3. Clicking on a pokémon on the lefthand menu will navigate to that pokémon's page
4. The pokémon which is currently displayed, will have its name highlighted on the left-hand menu.

To begin, add a new sub-`Route` to the `/` `Route`. This route should be the `index` route. As its `element`, have it render a React Router `Navigate` component, pointing `to` `1`, with its `replace` prop set. This will cause the app to automatically redirect users to `/1`, when they navigate to `/`.

Next, modify the `Route` which renders the `PokedexPage` as its `element`, such that it no longer supplies the `id` as a prop. And, change it so that is uses a _path parameter_ instead of the hardcoded value of "1". Next, modify `PokedexPage` such that it obtains the id value from the path param, using React Router's `useParams()` hook. **Hint:** The value of the path param will always be a string. You may need to convert it to an integer using `parseInt()`. Once this is done, you should be able to browse to any number between 1 and 150, and an appropriate pokémon should be displayed.

Next, we will modify the app such that clicking on any pokémon in the lefthand menu will display that pokémon on the right. The easiest way to do this will be to modify the `ListItem` component, which can be found in `PokedexLayout.jsx`. In that component, we render a `div`. Change this to a React Router `Link`, whose `to` prop points to the correct pokémon `id`. **Hint: ** `pokemon.id` is an integer, which doesn't work correctly if used as the value of a `Link`'s `to` prop. Convert it to a string first.

Once this is complete, clicking items on the lefthand menu will function as intended. You may wish to modify the CSS in `PokedexLayout.module.css` to remove the default hyperlink text styling which has now appeared. This can be done by setting the `text-decoration` and `color` CSS properties on the `.listItem` CSS selector to appropriate values.

The final step is to add a visual difference to the currently "active" pokémon in the list. We can do this by using a `NavLink` instead of a normal `Link`, and applying an additional CSS class, or style rule. `NavLink`'s `style` and `className` props both accept a _function_, with a single argument, which contains an `isActive` boolean we can use to conditionally apply different styles / CSS classes. Consult the provided lecture material and example code for ideas on how this can be achieved.

## Exercise Six - Centralized state management

In this exercise, we move to a different app, located in the [exercise-06](./exercise-06) folder. This app contains the beginnings of a shopping cart app, which we will be slightly extending.

To begin, examine the existing app. You'll see that we have our main `App`, which will render a `ShopPage` when navigating to `/shop` (it will also automatically redirect the user to `/shop` if they navigate to `/`).

The `ShopPage` itself renders a list of `Product`s on the left, which we can add to our cart. The cart is displayed as a `ShoppingCart` component on the righthand side of the page, and the data for the cart comes from the `cart` stateful array, created using the `useState()` hook. When we click any of the "add to cart" buttons, the corresponding item will be added to the shopping cart.

Currently, when we click an "add to cart" button, that request is propagated from the corresponding `Product` component back up to the `ShopPage`. That's not too bad for this simple app, but in this exercise, we'll practice _centralizing_ our state. Doing this has several benefits:

- With our state centralized, we can more easily modify _where_ that state comes from (e.g. from an API? From local browser storage? etc?) without modifying multiple files

- We can access state everywhere within our app if we need to - which will be really useful if we want to make a new page which displays the same data (for example, a "payment" page).

- We reduce the need to propagate events up and down the component hierarchy. In our case, if each `Product` component could handle adding items to the cart by itself, then we wouldn't need to propagate that event back up to the `ShopPage` component.

- We can expose only the functionality we need. For example, `ShopPage` currently has access to the `setCart` function, which could be used to modify the shopping cart in any way. However, it only really needs to be able to add items, it doesn't need to do anything else.

### Context

There are several libraries built for the purposes of state management - one of the most common being [Redux](https://redux.js.org/). In previous versions of React, centralized state management required either the use of one of these third-party libraries, or extensive use of event propagation. Now, using React's `useContext()` hook, we can centralize our state and separate from our component hierarchy using React's Context API.

To begin, create a new React component, where we'll hold our state. Call it, for example, `AppContextProvider`. In the same file, create our Context object itself, using the `React.createContext()` function. Both our component and our context object need to be exported, so we can import them when we need them.

E.g. in AppContextProvider.jsx:

```jsx
export const AppContext = React.createContext({});

export function AppContextProvider() {}
```

Now, make our `AppContextProvider` component accept a single prop, called `children`. This is a special prop which represents all child components. If we render the `children` prop using `{children}` within our JSX, all child components will be rendered at that point.

Have `AppContextProvider` render the "Provider" component of our context. For example, if we called our context object `AppContext`, then the provider component will be called `AppContext.Provider`. Within that provider component, have it render all our `children`:

```jsx
export const AppContext = React.createContext({});

export function AppContextProvider({ children }) {
  return <AppContext.Provider>{children}</AppContext.Provider>;
}
```

Once that's done, in `main.jsx`, surround the `BrowserRouter` that's already there with one of our newly-created `AppContextProvider` components. This will allow our entire application to have access to any context values.

Next, let's move our shopping cart and product list state from `ShopPage` into `AppContextProvider`. Move the following:

- The `products` array
- The `cart` stateful value
- The function which adds the given item to the cart

Now, we will make those values accessible to the rest of our application, using the `value` prop of `AppContext.Provider`. For example:

```jsx
export const AppContext = React.createContext({});

export function AppContextProvider({ children }) {

    const products = ...;
    const [cart, setCart] = ...;
    function addItemToCart(item) { ... }

    const context = {
        products, cart, addItemToCart
    }

    return (
        <AppContext.Provider value={cart}>
            {children}
        </AppContext.Provider>
    )
}
```

Once we've done that, then, from anywhere else within our application, we can access any of those `context` values using the `useContext()` hook. As an example, the following code obtains the shopping cart from context;

```jsx
import { AppContext } from "./AppContextProvider";

function MyComponent() {
  const { cart } = useContext(AppContext);
}
```

Complete this exercise by modifying the rest of the application to only use the values from Context, rather than any local state. Try to remove as many instances of passing state and events through props as possible. For example:

- The `ShoppingCart` component can now access the cart itself, without having it supplied as a prop
- The `Product` components no longer need to propagate their "add to cart" event - they can call the function directly after obtaining it from context.

## Exercise Seven - Taking advantage of centralized state

Now that our state is centralized, we can easily access the same stateful values elsewhere in our app, without unnecessary prop / event passing. Let's take advantage of that by adding a new page to our app.

Create a new component, called `CheckoutPage`. When the user navigates to `/checkout`, this page should be rendered. For the purposes of this exercise, exactly what you display on this page is up to you, but it must meet these two functional requirements:

1. A list of products in the user's shopping cart should be displayed. The data should come from your existing centralized state which you achieved in Exercise five.

2. There should be a "Purchase" button which, when clicked, will clear the user's shopping cart and display a message stating something like "Thank you for your purchase!". This can either be some kind of dialog box, or a new page (or subpage, taking further advantage of React Router's ability to have nested `Route`s).

In addition, add a `Link` to your new page from somewhere on the main shopping page - within the `ShoppingCart` might be a good idea.

**Hints:**

1. There's a function already written in `ShoppingCart.jsx` which groups shopping cart items by name. If you intend to reuse this functionality, consider how you can _refactor_ your application to avoid code duplication.

2. The functionality to clear the shopping cart could be a function you want to add to your centralized state, just as `addToCart()` currently is.

## Exercise Eight - Using local browser storage

Our codebase is looking a lot nicer now, and we've seen how our new way of managing state has made it easier to access that state when required. However, our shopping cart, which is created using `useState()`, is temporary - If we close the browser tab then re-open it, or even if we simply refresh the page, we will lose all items in our cart. That's not very useful!

To improve upon this behaviour, we will instead store the items in our shopping cart in [_local browser storage_](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). Use the browser's `localStorage` API natively - perhaps wrapping it in a custom hook like the `useLocalStorage()` hook covered in the lecture material.

Use local storage to persist the user's cart, so any changes to the cart remain when the page is refreshed / closed.

**Hint:** Because of the refactoring and centralizing of our state which we've already done, the only changes you should have to make will be in your `AppContextProvider`.
