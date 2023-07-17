# Validating Frontend Applications

A particular challenge of writing frontend code is the amount of throw away work associated with static artifacts. This is greatly reduced by the introduction of frontend libraries like Vue, React, Angular, and Svelte. However this introduces another common issue in software engineering. Being front-loaded by process, dependencies, and the condition of your development environment.

**A typical workflow might look like this:**

1. Start the app(s) locally
2. Update configuration to use either a local or remote web service
3. Make modifications to the necessary code
4. Save and potentially restart the app
5. Navigate through the app to test the code change
6. Repeat 3 – 5 until you're done
7. Write some unit tests _(hopefully)_

This workflow is problematic because it requires the developer to hold the structure of this process in spite of any problems which may exist going into the next step.

The application may not be functioning in your development environment. You may be waiting on API changes to provide you with the data your application needs. You may have to secure specific credentials for users with specific requirements.

Or simply enough, you may just have to navigate through the application to access your code.

## A better approach.

Luckily, with the popularity of libraries like React, there are a number of complimentary libraries that allow you to introduce utilities into your development process. Since a lot of these libraries use the same paradigms, it's easy to extend those to match a number of different scenarios, and supply the application with the data it needs, under circumstances the developer controls.

This process can be broken down into three parts:

1. Isolation Testing (Storybook)
2. Unit and Layout testing (Jest, Vitest, `@testing-library`)
3. XHR mocking (Mock Service Worker)

### Isolation Testing

For this example, we wil use Storybook. Isolation Testing allows the developer to take a component or fragment of code, import it as a module dependency, and then use it in a controlled template. The controlled template allows the developer to supply arguments which are either global, local to the component, or specific to an implementation.

#### TLDR; Why bother?

By isolating the components in your application, you do not have to worry about the state of the live application to focus on specific behavior. Instead you architect your application to where components are pure, have explicitly defined dependencies (Open Close Principle), and follow Single Responsibility.

```jsx
// Create a template
const Template = (args) => <Component {...args}>;
```

```js
// Create an example with specific arguments
export const Example = Template.bind({});
Example.args = {
    componentArgument: 'foo',
};
```

#### Controlled `context`

Isolation testing can be further enhanced to supply context specific dependencies by using decorators in Storybook to control the state and implementation of those dependencies.

```jsx
// Wrapper supplies context to the `Story`
const ContextDecorator = (Story, { parameters: { contextState } }) => (
    <ContextProvider state={contextState}>
        {/* Wraps the Story function with context */}
        <Story />
    </ContextProvider>
);
```

```jsx
// The component we render is aware of state
function ConsumerComponent() {
    const state = useContextState();

    return (
        <div>
            <p>{state.contextValue}</p>
        </div>
    );
}
```

```jsx
// Note: this component has no properties so args are omitted.
const Template = () => <ConsumerComponent />;

// The story can then be used to control context;
export const StateExample = Template.bind({});
StateExample.parameters = {
    contextState: {
        contextValue: 'foo',
    },
};
```

#### Inheritance

Arguments and parameters may be controlled globally, on the story level, or on a specific implementation level. This allow the developer to set default values at each level. These values are then overwritten whenever they're declared.

**Global Level**

```js
// .storybook/preview.js
const preview = {
    // ...
    parameters: {
        contextState: {
            contextValue: 'foo',
        },
    },
    // ...
};

export default preview;
```

**Story Level**

```js
// ConsumerComponent.stories.jsx
export default {
    // ...
    parameters: {
        contextState: {
            contextValue: 'bar',
        },
    },
    // ...
};
```

**Implementation Level**

```js
// ConsumerComponent.stories.jsx, still
export const StateExample = Template.bind({});
StateExample.parameters = {
    contextState: {
        contextValue: 'baz',
    },
};
```

### Unit Tests

In this example, we used `vitest` and `@testing-library/react` to build tests around components and implementations of those those components. The same approaches can be applied to `Mocha` or `Jest`. The point is the same as isolation testing described above. You test your components by supplying arguments to them and rendering them by using their actual dependencies.

Mocking dependencies to supply requirements can lead to false positives and creates maintainability issues in our code bases. In our process, we will use them sparingly. Instead we will use the actual module dependencies defined in code.

We will control our tests by controlling the properties of the component or the context used by the consumer.

#### Custom `render` method

`@testing-library/react` allows you to define a custom `render` method which allows you to extend the render options of the utility, and define a wrapper which supplies those options to the wrapper.

```jsx
export const customRender = (
    ui,
    {
        defaultState = {},
        // Example: Context state is an instance of a state machine
        contextState = new ContextState({
            defaultState,
        }),
        ...options
    } = {},
) => ({
    ...render(ui, {
        // Allows you to extend the configuration
        ...options,
        // Note: This is identical to how you would supply decorator to Storybook
        wrapper: ({ children }) => (
            <ContextProvider state={contextState}>
                {/* Allows you to take the `ui` arg and wrap it in context */}
                {children}
            </ContextProvider>
        ),
    }),
    // Context state can then be returned and asserted against.
    contextState,
});
```

You may then use the `customRender` method to render a component consuming the context.

```jsx
it('Should render state', () => {
    // Supply the default value for state
    customRender(<ConsumerComponent />, {
        defaultState: {
            contextValue: 'baz',
        },
    });

    // Assert that it displays
    expect(screen.getByText(/baz/)).toBeInTheDocument();
});
```

Naturally, we can still control argument supplied to the component directly in the test by using mock function or other utilities exposed by testing framework. Since the utility uses sane defaults, if they're not defined, it will still function properly.

```jsx
it('Should handle click state', () => {
    const mockHandler = vi.fn();
    customRender(<CustomButton onClick={mockHandler}>Click Me</CustomButton>);

    fireEvent.click(screen.getByText(/Click Me/));

    expect(mockHandler).toHaveBeenCalled();
});
```

### Mock XHR

The only mock you'll need... maybe. In most cases, testing api requests and their statuses can introduce a lot of complexity, anti-patterns, and maintainability issues for a controlled codebase. Any application which becomes sufficiently advanced enough to support product features will have complex backend dependencies.

These dependencies must resolve and supply feedback to the end user. There are a lot of paradigms that wrap requisition state, and even more libraries which support those paradigms. It's up to the team to select their preferred strategy. No matter what, you should have a separate strategy that ensures you have adequate control over what the request is doing.

Since both our isolation tests and unit tests render the same components, we need something which is applicable to all environments we render those components in (Browser and Node).

#### [Mock Service Worker](https://mswjs.io/)

`MSW` is a type of XHR mock that utilizes a service worker to intercept matching client requests made through XHR, captures them using a simple handler function, then sends a controlled response back. Since this uses the underlying XHR request, this applies itself scenario where you request server data from the browser.

The [documentation](https://mswjs.io/docs/) for MSW is also very thorough so for the purposes of this repo, we won't expand on it too much. Instead, we'll focus on how the handlers are used in each environment.

### Storybook

Storybook has a number of add-on libraries which allow you to extend how storybook behaves by introducing pre-built decorators, loaders, and other features. The library [`msw-storybook-addon`](https://storybook.js.org/addons/msw-storybook-addon) allows you to control the service worker that MSW creates when you [initialize it for the browser](https://mswjs.io/docs/getting-started/integrate/browser). We then use the [handlers we created for our application](https://mswjs.io/docs/getting-started/mocks/rest-api) to control the api.

These handlers can be defined like any control `parameters` in Storybook.

```js
// .storybook/preview.js
const preview = {
    // ...
    parameters: {
        msw: {
            handlers: globalHandlers,
        },
    },
    // ...
};

export default preview;
```

```js
// Component.stories.js
export default {
    // ...
    parameters: {
        msw: {
            handlers: [
                rest.get(uri.componentUri, (_req, res, ctx) => {
                    return res(ctx.json({ apiState: 'foo' }));
                }),
            ],
        },
    },
};
```

```js
// Component.stories.js, still
export const ErrorState = Template.bind({});
ErrorState.parameters = {
    msw: {
        handlers: [
            rest.get(uri.componentUri, (_req, res) => {
                return res.networkError();
            }),
        ],
    },
};
```

#### Unit Tests

We can also control api requests in the [Node](https://mswjs.io/docs/getting-started/integrate/node) environment our tests run in. Again, MSW covers this in their documentation. So we'll use the same example to control the api data and assert based off the response.

```jsx
// Since the API state is asynchronous, we'll make these tests async / await
it('Should display api data', async () => {
    // We control the response of the api endpoint.
    server.use(
        rest.get(uri.componentUri, (_req, res, ctx) => {
            return res(ctx.json({ apiState: 'foo' }));
        }),
    );

    customRender(<Component />);

    expect(screen.getByText(/Loading/)).toBeInTheDocument();

    await expect(screen.findByText(/foo/i)).resolves.toBeInTheDocument();
});

it('Should display a specific error error', async () => {
    // You may also define the status of the API and return a specific error
    // https://mswjs.io/docs/recipes/mocking-error-responses#:~:text=When%20it%20comes%20to%20mocking,between%20internal%20and%20intended%20exceptions.
    server.use(
        rest.get(uri.componentUri, (_req, res, ctx) => {
            return res(
                ctx.status(400),
                ctx.json({ message: 'TOO_MANY_PUPPIES' }),
            );
        }),
    );

    customRender(<Component />);

    await expect(
        screen.findByText(/Too many puppies./),
    ).resolves.toBeInTheDocument();
});
```

## Closing

Using these three approaches will greatly improve the developer experience on your project, supply you with more visibility as to what your application is doing on a component level, influence better overall architecture, and standard approach that will not change because it is front-loaded with dependencies.

You can begin each feature of your application the same way and begin writing code right away.
