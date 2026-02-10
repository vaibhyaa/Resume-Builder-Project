import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import Layout from "./pages/MainDashboardPage/Sections/Layout";
import Dashboard from "./pages/MainDashboardPage/Dashboard";
import ResumeBuilder from "./pages/MainDashboardPage/Sections/ResumeBuilder";
import Preview from "./pages/MainDashboardPage/Preview/Preview";
import Login from "./pages/LoginPage/Login";
import { useDispatch } from "react-redux";
import { login, setLoading } from "./app/features/authSlice";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();

  // const getUserData = async () => {
  //   const token = localStorage.getItem("token");
  //   // console.log("TOKEN FROM LS:", token);
  //   try {
  //     if (!token) {
  //       dispatch(setLoading(false));
  //       return;
  //     }
  //     const res = await fetch("/api/users/data", {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const data = await res.json();
  //     if (data.user) {
  //       dispatch(login({ token, user: data.user }));
  //     }
  //   } catch (error) {
  //     console.error(error.message);
  //   } finally {
  //     dispatch(setLoading(false));
  //   }
  // };

  // const getUserData = async () => {
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     dispatch(setLoading(false));
  //     return;
  //   }

  //   try {
  //     //http://localhost:3000/api/users/me
  //     if (token) {
  //       console.log(token);
  //       const { data } = await api.get("/api/user/data", {
  //         headers: { Authorization: token },
  //       });
  //       if (data.user) {
  //         dispatch(login({ token, user: data.user }));
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error.message);
  //   } finally {
  //     dispatch(setLoading(false));
  //   }
  // };


  const getUserData = async () => {
  const token = localStorage.getItem("token");

  try {
    if (!token) {
      dispatch(setLoading(false));
      return;
    }

    const res = await fetch("/api/users/data", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errData = await res.json();
      // console.log("Server Error:", errData);
      throw new Error(errData.message || "Server Error");
    }

    const data = await res.json();

    if (data.user) {
      dispatch(login({ token, user: data.user }));
    }

  } catch (error) {
    console.error("Auth Error:", error.message);
  } finally {
    dispatch(setLoading(false));
  }
};

  useEffect(() => {
    // console.log("APP STARTED - checking auth");
    getUserData();
  }, []);

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* http://localhost:3000/ or / React renders the Home component. */}

        <Route path="login" element={<Login />} />
        {/* This is outside /app route */}
        {/* /login → shows login page */}

        <Route path="app" element={<Layout />}>
          {/* This is a parent route example http://localhost:3000/app */}
          {/* <Layout /> is usually:Navigation bar, Sidebar, Footer, Common layout wrapper */}
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          {/* this is index route  */}
          {/* When user visits /app (without anything after it),→ show Dashboard */}
          <Route
            path="resume-builder/new/:resumeId"
            element={<ResumeBuilder />}
          />
          <Route
            path="resume-builder/:resumeId/edit"
            element={<ResumeBuilder />}
          />
          {/* <Route
            path="resume-builder/:resumeId/edit"
            element={<ResumeBuilder />}
          /> */}
          {/* This is a childe route of /app example http://localhost:3000/app/resume-builder/123 */}
          {/* This captures values from URL. */}
          {/* /app/resume-builder/10, /app/resume-builder/abc123 */}
        </Route>

        {/* public preview */}
        <Route path="view/:resumeId" element={<Preview />} />
        {/* This is outside /app route */}
        {/* This is a public preview page */}
        {/* /view/abc123 */}
      </Routes>
    </>
  );
}

export default App;



//  └── Home
// /app
//  ├── Layout (Navbar / Sidebar wrapper)
//  │     ├── index → Dashboard
//  │     └── resume-builder/:resumeId → ResumeBuilder

// /view/:resumeId → Preview (public view)
// /login          → Login Page

// | URL                           | What Loads                                       |
// | ----------------------------- | ------------------------------------------------ |
// | `/app`                        | Layout → Dashboard                               |
// | **`/app/resume-builder/123`** | **Layout → ResumeBuilder (with resumeId = 123)** |

// Example 1: Visiting /app
// React loads:
// <Layout />
// Inside it → <Dashboard /> (because it's the index route)

// Example 2: Visiting /app/resume-builder/123
// React loads:
// <Layout />
// Inside it → <ResumeBuilder resumeId="123" />
