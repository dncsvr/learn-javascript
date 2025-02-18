# Storybook

This is a basic storybook research project. This research is canceled due to
lack of support for vue in storybook and heavy library dependencies that we
won't be using for our component library.

## Installation

After creating a nuxt project running `npx storybook@latest init` command sets
up pretty much everything.

It creates a lot of extra files, remove them to have a clear start.

> [!NOTE]
>
> We use `.js` instead of `.ts`. Convert all typescript files into js and remove
> all type definitions to have less boilerplate.

`npm run storybook` runs the storybook ui separately.

## Adding a component

Under `/components` folder add a  `.stories.js` file per component to have it on
the storybook ui. See `Sample.vue` and `Sample.stories.js` for a sample
component.

```javascript
export default {
  title: 'Sample',
  component: Sample,
  tags: ['autodocs']
};
```

> [!NOTE]
>
> `tags: ['autodocs']` creates an extra `Docs` page with all the stories in it.

## Adding a Story

Exporting a constant in `.stories.js` file is enough for adding a new story.
Each story means a new instance of a component to test its different variants.

```javascript
export const Red = {
  args: {
    color: 'red'
  },
};
```

This sample simply creates a story where it has `color` property is set up to
`'red'` value.

## Key Takeaways

- Visual testing is where you get a screenshot of a successful run, to compare
  it in further test runs which allows regression testing
- e2e (End-to-end) testing is done by rendering a page by recording and
  replaying user interactions through browser apis, and then asserting dom
  states to check the outcome
- UI component testing, relies heavily on different variants of a component in a
  single page, which is not a hard task to do manually.
- Visual testing and unit testing is done using other frameworks and libraries
  which we can use directly
- Nuxt has its own test setup where visual testing is possible as well as unit
  testing and e2e testing
