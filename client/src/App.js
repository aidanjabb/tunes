import "bootstrap/dist/css/bootstrap.min.css"
import Login from "./Login";
import Dashboard from "./Dashboard";

// get code from URL, if there is one
const code = new URLSearchParams(window.location.search).get("code");

function App() {
  console.log("App");
  /*
  if URL contains a code, render the dashboard component; otherwise, render the login component
  */
  return code ? <Dashboard code={code} /> : <Login />
}

export default App;
