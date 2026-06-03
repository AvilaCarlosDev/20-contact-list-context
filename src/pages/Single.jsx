import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Single = () => {
  const { store } = useGlobalReducer()
  const { theId } = useParams()
  const singleTodo = store.todos.find(todo => todo.id === parseInt(theId));

  return (
    <div className="container text-center">
      {/* Display the title of the todo element dynamically retrieved from the store using theId. */}
      <h1 className="display-4">Todo: {singleTodo?.title}</h1>
      <hr className="my-4" />  {/* A horizontal rule for visual separation. */}

      {/* A Link component acts as an anchor tag but is used for client-side routing to prevent page reloads. */}
      <Link to="/">
        <span className="btn btn-primary btn-lg" role="button">
          Back home
        </span>
      </Link>
    </div>
  );
};
