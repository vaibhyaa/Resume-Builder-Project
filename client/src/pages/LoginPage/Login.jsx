import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../app/features/authSlice.js";
// import api from "../../configs/api.js";
import toast from "react-hot-toast";
const Login = () => {
  // const [searchParams] = useSearchParams();
  // const mode = searchParams.get("state") || "login";
  const { user } = useSelector((state) => state.auth);
  const query = new URLSearchParams(window.location.search);
  const urlState = query.get("state") || "login";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState(urlState);
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setState(urlState);
  }, [urlState]);

  useEffect(() => {
    if (user) {
      navigate("/app", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const res = await fetch(`/api/users/${state}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json", // important for your login API
              },
              body: JSON.stringify(formData), // { email, password }
            });
            if (!res.ok) {
              // handle HTTP errors
              const errorData = await res.json();
              throw new Error(errorData.message || `Error ${res.status}`);
            }
            const data = await res.json();
            // Redux update
            dispatch(login(data));
            // Save token
            localStorage.setItem("token", data.token);
            // Success toast
            toast.success(data.message);
            // Navigate
            navigate("/app/dashboard", { replace: true });
          } catch (error) {
            // Error toast
            toast.error(error.message);
          }
        }}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-indigo-500">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>
        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) =>
                setformData({ ...formData, name: e.target.value })
              }
              // onChange={(e) => setName(e.target.value)}
              value={formData.name}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
              type="text"
              required
            />
          </div>
        )}
        <div className="w-full ">
          <p>Email</p>
          <input
            onChange={(e) =>
              setformData({ ...formData, email: e.target.value })
            }
            // onChange={(e) => setEmail(e.target.value)}
            value={formData.email}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            type="email"
            required
          />
        </div>
        <div className="w-full ">
          <p>Password</p>
          <input
            onChange={(e) =>
              setformData({ ...formData, password: e.target.value })
            }
            // onChange={(e) => setPassword(e.target.value)}
            value={formData.password}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            type="password"
            required
          />
        </div>
        {state === "register" ? (
          <p>
            Already have account?{" "}
            <span
              onClick={() => {
                setState("login");
                navigate("/login?state=login");
              }}
              className="text-indigo-500 cursor-pointer"
            >
              click here
            </span>
          </p>
        ) : (
          <p>
            Create an account?{" "}
            <span
              onClick={() => {
                setState("register");
                navigate("/login?state=register");
              }}
              className="text-indigo-500 cursor-pointer"
            >
              click here
            </span>
          </p>
        )}
        <button className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;




// The path → /Login
// This tells React Router to load the Login component/page.
// Example React Router setup:
// <Route path="/Login" element={<Login />} />
// So when you open:
// /Login
// 👉 React loads the <Login /> page.

// The Query Parameter → ?state=register
// Everything after ? is a query string.
// Here it is:
// state=register
// This means:
// state = the variable name
// register = its value
// So the URL is basically saying:
// Load the /Login page but also pass extra information → show the register state.

// this is  the step 1 :-
// http://localhost:5173/Login?state=register (this si the url you hit )
// window.location.search =?state=register
// URLSearchParams converts this into an object you can read like:
// | Key   | Value    |
// | ----- | -------- |
// | state | register |
// step 2:-
// So now query is an object that lets you do:
// query.get("state")   // returns "register"
// Getting the state value
// const urlState = query.get("state") || "login";
// This line means:
// Try to read the query parameter state
// If nothing is found → default to "login".
// | URL                     | urlState                              |
// | ----------------------- | ------------------------------------- |
// | `/Login?state=register` | "register"                            |
// | `/Login?state=login`    | "login"                               |
// | `/Login`                | "login" (because no state is present) |

// navigate("?state=register");
// This changes the URL but does not reload the page.
// This changes the URL but does not reload the page.
