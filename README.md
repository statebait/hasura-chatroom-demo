# Hasura Chatroom Demo

A Chatroom Web App built with React and Hasura.

## Tutorial

> The `master` branch contains the working code of the demo

### Configuring Hasura & the Database

- To follow the tutorial you will need the tutorial branch of the repository; clone the repository like this:

  ```bash
  git clone --single-branch --branch tutorial https://github.com/statebait/hasura-chatroom-demo.git
  ```

- Next, you need to start the docker containers for the PostgreSQL database and Hasura GraphQL Engine. Run the following for that inside the repo:

  ```bash
  docker-compose up -d
  ```

- This will spin up both the containers and now the Hasura console should be available at:

  ```
  http://localhost:8080/console
  ```

  If for some reason nothing appears, try running the docker command again.

- Get familiar with the console 😃. Navigate to the "DATA" tab and here we will create all the tables we need for the Chatroom Web App.

- Go ahead and click on 'Create Table' next to the Schema heading.

- The first table we will be creating is the 'users' table. Name the table 'users', add a column called username with column_type as Text. Add this column as the primary key. Finally, click "Add Table" below.

  ```
  table_name: users
  Columns:
  column_name: username (Primary Key)
  column_type: Text
  ```

- Next, we need a table for chatrooms. Create this:

  ```
  table_name: chatrooms
  Columns:
  #1
  column_name: id (Primary Key)
  column_type: Integer Auto-Increment
  #2
  column_name: name (Unique)
  column_type: Text
  ```

- Finally, we need to create a table for the messages, here we'll need to add 2 Foreign Keys for the chatroom and user.

  Create this:

  ```
  table_name: messages
  Columns:
  #1
  column_name: id (Primary Key)
  column_type: Integer Auto-Increment
  #2
  column_name: text
  column_type: Text
  #3
  column_name: chatroom_id (Foreign Key)
  column_type: Integer
  #4
  column_name: user (Foreign Key)
  column_type: Text
  ```

  Now navigate below to the Foreign Key section and add the first foreign key from the table chatrooms:

  ```
  messages.chatroom_id -> chatrooms.id
  ```

  And not the second foreign key from the table users:

  ```
  messages.user -> users.username
  ```

  Great! Now you are done with adding the tables!

- Go ahead and click on the chatrooms table and go to the 'Insert Rows' tab. Here add one chatroom with any name you like. (You can add multiple too 😇).

- Now go to the "GRAPHIQL" tab. This is a GraphQL playground where you can play and test different queries before adding them to your Apps. In this demo, we will deal with all the 3 types of queries available in GraphQL - Query, Mutation, Subscription.

- In the 'Explorer' (If you can't see there should be a button to named 'Explorer' to open it up) you will see a bunch of queries already there which you can just click on and add. In the bottom part of the Explorer, you can add (switch) to Mutations/Subscriptions.

### Building the Web App

The React app consist of three views:

- Login
- Chatroom List
- Chatroom

The tutorial branch has all the code for the working demo except all the GraphQL related logic, which is the main focus of this tutorial.

So let's begin!

Install dependencies by running the following:

```bash
yarn
```

#### Login View

The Login View has a simple input box where one can enter their name; on entering the name a mutation to create a user is made in the database, the 'USER' key is added to local storage for future use and finally, the user is navigated to the chatrooms view.

In `src/components/Login.js`

Add the following imports:

```jsx
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
```

Next, we need a mutation to add the user to the database:

```jsx
const ADD_USER = gql`
  mutation addUser($user: String) {
    insert_users(objects: { username: $user }) {
      affected_rows
    }
  }
`;
```

Then add this hook to the Login component that uses the mutation:

```jsx
const [addUser, { error }] = useMutation(ADD_USER);
```

The `addUser` in the above code is a promise given to you. We need to execute it on submit so add this to the onSubmit function inside the `if` block:

```jsx
addUser({
  variables: {
    user: value,
  },
})
  .then((data) => {
    window.localStorage.setItem("USER", value);
    handleLogin();
  })
  .catch((err) => console.log(err));
```

#### Chatroom List View

The Chatroom List View is a simple list of clickable chatrooms available. It requires a simple query to fetch the chatrooms.

In `src/components/ChatroomList.js`

Add the following imports:

```jsx
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
```

Next, we need a query to fetch the chatrooms from the database:

```jsx
const GET_CHATROOMS = gql`
  {
    chatrooms {
      name
      id
    }
  }
`;
```

Then add this hook to the ChatroomList component that uses the query:

```jsx
const { loading, error, data } = useQuery(GET_CHATROOMS);
```

#### Chatroom view

The Chatroom View is the crux of the Web App, it displays the list of messages sent in the chatroom and an input field to send more messages.

In `src/components/Chatroom.js`

Add the following imports:

```jsx
import { useSubscription, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
```

We need a subscription for the messages and a mutation to add a message to the database;

```jsx
const MESSAGE_SUBSCRIPTION = gql`
  subscription messageSubscription($chatroomId: Int!) {
    messages(where: { chatroom_id: { _eq: $chatroomId } }) {
      id
      text
      user
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation sendMessage($chatroomId: Int, $text: String, $user: String) {
    insert_messages(
      objects: { chatroom_id: $chatroomId, text: $text, user: $user }
    ) {
      affected_rows
    }
  }
`;
```

Add the following hooks to use the above subscription and mutation:

```jsx
const { loading, error, data } = useSubscription(MESSAGE_SUBSCRIPTION, {
  variables: {
    chatroomId,
  },
});
const [sendMessage] = useMutation(SEND_MESSAGE);
```

Vola! You should have a work application!
