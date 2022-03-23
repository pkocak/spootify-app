import { Link } from "react-router-dom";
import "./style.scss"

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h2>Can't found the page that you are looking for.</h2>
      <Link to="/discover">Return to discover page</Link>
    </div>
  )
}

export default ErrorPage;