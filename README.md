# About
TD Notes App w/ DynamoDB and ReactJS-Typescript

# How to bootstrap
`npx create-react-app td-notes-app --template typescript`

# How to setup ESLINT for Typescript
https://flamingotiger.github.io/javascript/eslint-setup/


# TypeScript
| Item | Description |
| --- | --- |
| Pros | Far, far easier to avoid extremely common typos, like incorrect action types. |
| | Gives dev's a far better understanding of the type of data flowing around  |
| | Much easier to refactor just about anything |
| Cons | Not the best type definition files (especially around Redux)
| | Tons of generics flying around |
| | Tons of imports, as just about everything (action creator, action, reducer, store, component) need to be aware of different types |
| | Redux, inherently functional in nature, tough interaction with TS classes |

**Official Recommendations:** https://redux.js.org/usage/usage-with-typescript

