import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import Preview from "./pages/Preview";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* http://localhost:3000/ or / React renders the Home component. */}
        <Route path="app" element={<Layout />}>
          {/* This is a parent route example http://localhost:3000/app */}
          {/* <Layout /> is usually:Navigation bar, Sidebar, Footer, Common layout wrapper */}
          <Route index element={<Dashboard />} />
          {/* this is index route  */}
          {/* When user visits /app (without anything after it),→ show Dashboard */}
          <Route path="resume-builder/:resumeId/edit" element={<ResumeBuilder />} />
          {/* This is a childe route of /app example http://localhost:3000/app/resume-builder/123 */}
          {/* This captures values from URL. */}
          {/* /app/resume-builder/10, /app/resume-builder/abc123 */}
        </Route>
        <Route path="view/:resumeId" element={<Preview />} />
        {/* This is outside /app route */}
        {/* This is a public preview page */}
        {/* /view/abc123 */}
        <Route path="login" element={<Login />} />
        {/* This is outside /app route */}
        {/* /login → shows login page */}
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
