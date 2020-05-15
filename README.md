# Hasura Chatroom Demo

Login view

Imports:

```jsx
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
```

Queries:

```jsx
const ADD_USER = gql`
  mutation addUser($user: String) {
    insert_users(objects: { username: $user }) {
      affected_rows
    }
  }
`;
```

Hook:

```jsx
const [addUser, { error }] = useMutation(ADD_USER);

if (error) {
  return <div>Something went wrong...Please refresh the page.</div>;
}
```

Usage:

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

ChatroomList view

Imports:

```jsx
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
```

Queries:

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

Hook:

```jsx
const { loading, error, data } = useQuery(GET_CHATROOMS);
if (loading) return <div>Loading...</div>;
else if (error) return <div>Something went wrong</div>;
```

Chatroom view

Imports:

```jsx
import { useSubscription, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
```

Queries:

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

Hook:

```jsx
const { loading, error, data } = useSubscription(MESSAGE_SUBSCRIPTION, {
  variables: {
    chatroomId,
  },
});
const [sendMessage] = useMutation(SEND_MESSAGE);
```

Usage:

```jsx
sendMessage({
  variables: { chatroomId, text: currentMessage, user },
});
setCurrentMessage("");
```
