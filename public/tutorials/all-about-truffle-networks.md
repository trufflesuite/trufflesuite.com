# All About Truffle Networks and Cats and Dogs and Rabbits and Deer

A fork is a copy of a repository. Forking a repository allows you to freely experiment with changes without affecting the original project.

Most commonly, forks are used to either propose changes to someone else's project or to use someone else's project as a starting point for your own idea.

```javascript
var TaskError = require("./errors/taskerror");
var yargs = require("yargs");
var _ = require("lodash");

function Command(tasks) {
  this.tasks = tasks;
};

Command.prototype.getTask = function(command) {
  var argv = yargs.parse(command);

  if (argv._.length == 0) {
    return null;
  }

  var task_name = argv._[0];
  var task = this.tasks[task_name];

  return task;
};
```

![The Sudden Laugh](images/sudden_laugh.gif)


- Cats
- Dogs
- Rabbits
- Deer

-----

Is your first thought to pass Taco some props? It’s my first instinct. Isn’t that what you do to child components in React?

The issue is that you’re passing a component class instead of a child element to <Route>. The <Route> instantiates Taco, not you. This means that the Taco component knows nothing about the outside world besides what React Router tells it (params, query strings, etc). The Taco component class is between a rock and a hard place: it needs to pass props to its children, but it gets no help from its parent component.

Why don’t route components participate in the normal top-to-bottom-flow of props to children? It turns out that the authors of React Router view this restriction as an architectural decision.

Maintainer Ryan Florence says that “you should think of your route components as entry points into the app that don’t know or care about the parent, and the parent shouldn’t know/care about the children.”

Maintainer Jimmy Jia (taion) agrees: “the actual anti-pattern is passing props through route boundaries – in general you just shouldn’t be doing this.”

Maintainer Tim Dorr believes that this boundary enforces the Single Responsibility Principle: “I’d try to keep route components aware of only router-provided props and try to maintain SRP.”

These architectural decisions might make sense when you distinguish “smart” or “container” components from “dumb” ones. Smart components are “entry points” that can independently bootstrap their children’s props. “Dumb” components are presentational; they take props and return UI.

Everything changes when you use a state container like Redux. If you treat your Redux application as a pure function that accepts state and returns a UI, every component is a dumb component. Like heat, your state rises to the top, and your state container absorbs it and manages its logic. What’s the point of a container component if Redux controls all of your state?

In fact, a container component violates the Single Responsibility Principle when it assumes responsibilities of the state container. It couples your view layer to your state layer.

In a world of dumb components, the React Router architecture stops making sense.

Besides issues of route boundaries and container components, the top-level <Router> component hogs all of the routing state: URL, parameters, query strings, etc. Your state container can’t talk to this second source of truth (!) without interacting with the view layer. This has real consequences for the viability of pure-functional patterns in Redux.

| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |
