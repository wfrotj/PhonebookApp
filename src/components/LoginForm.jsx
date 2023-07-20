import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingContext from "../features/LoadingContext";
import loginService from "../services/loginService";
import personService from "../services/personService";
import LoadingSpinner from "./LoadingSpinner";

function LoginForm({ user, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.token) navigate("/");
  }, [user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    loginService
      .login({ username, password })
      .then((res) => {
        window.localStorage.setItem("loggedPhonebookUser", JSON.stringify(res));
        personService.setToken(res.token);

        setUser(res);
        setUsername("");
        setPassword("");
      })
      .catch((error) => alert(error.response.data.error))
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 from-15% via-sky-500 via-1% ">
      <div className="flex flex-col h-screen justify-center mobile:px-2 tablet:px-20 laptop:px-40 ">
        <h1 className="text-4xl mb-4 text-center font-bold">
          Login your account
        </h1>
        <div>
          <form
            onSubmit={handleLogin}
            className="border-solid border-2 border-black p-4 m-4 flex flex-col gap-2 md:max-w-lg md:mx-auto"
          >
            <div className="flex flex-col">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-solid border-2 border-slate-500 p-2"
              />
            </div>
            <div className="flex flex-col">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-solid border-2 border-slate-500 p-2"
              />
            </div>
            <button
              type="submit"
              className="bg-black rounded-xl p-2 text-white font-bold"
            >
              Login
            </button>
          </form>
        </div>
        <p className="text-center">
          Don't have an account? <br></br>
          <Link to="/register" className="text-black font-extrabold underline">
            Register here.
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
