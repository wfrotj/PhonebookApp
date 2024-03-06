import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingContext from "../features/LoadingContext";
import userService from "../services/userService";
import LoadingSpinner from "./LoadingSpinner";

function RegisterForm({ user }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.token) navigate("/");
  }, [user, navigate]);

  const handleRegistration = (e) => {
    e.preventDefault();
    setLoading(true);

    userService
      .register({ name, username, password })
      .then((res) => {
        console.log(res);
        navigate("/login");
        setName("");
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
    <div className="flex flex-col h-screen justify-center min-h-screen bg-gradient-to-r from-indigo-500 from-15% via-sky-500 via-1%">
      <h1 className="text-4xl mb-4 text-center font-bold">
        Register an account
      </h1>
      <div>
        <form
          onSubmit={handleRegistration}
          className="m-4 p-4 flex flex-col gap-2 border-solid border-2 border-black md:max-w-lg md:mx-auto"
        >
          <div className="flex flex-col">
            Name
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-solid border-2 border-slate-500 p-2"
            />
          </div>
          <div className="flex flex-col">
            Username
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-solid border-2 border-slate-500 p-2"
            />
          </div>
          <div className="flex flex-col">
            Password
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
            className="bg-black rounded-xl p-2 mt-2 text-white font-bold"
          >
            Register
          </button>
        </form>
      </div>
      <p className="text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-black font-extrabold underline">
          Login here.
        </Link>
      </p>
    </div>
  );
}

export default RegisterForm;
