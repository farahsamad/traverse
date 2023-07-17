import React from "react";
import Userlogin from "./Userlogin.js";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Signup from "./create_account/Signup.js";
import Traverse from "./Traverse.js";
import Profile from "./profile/Profile.js";
import Editaccount from "./profile/Editaccount.js";
import Friendaccount from "./Friendaccount.js";
import Friendphotos from "./friendaccount/Friendphotos.js";
import Friendlayout from "./component/Friendlayout.js";
import useLogged from "./component/useLogged.js";
import { Error } from "./Api.js";
import Addpost from "./profile/Addpost.js";
import Savedpost from "./profile/Savedpost.js";

function logloader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route exact path="/" element={<Userlogin />} loader={logloader} />
      <Route path="/Signup" element={<Signup />} errorElement={<Error />} />
      {/* <Route path="/Traverse" element={<Traverse />} /> */}
      <Route
        path="/Traverse"
        element={<Traverse />}
        loader={async () => await useLogged()}
        errorElement={<Error />}
      />
      <Route
        path="/Profile"
        loader={async () => await useLogged()}
        errorElement={<Error />}
      >
        <Route index element={<Profile />} />
        <Route path="Add" element={<Addpost />} />
        <Route path="Edit" element={<Editaccount />} />
        <Route path="Save" element={<Savedpost />} />
      </Route>
      <Route
        path="/Friend/:name"
        element={<Friendlayout />}
        loader={async () => await useLogged()}
        errorElement={<Error />}
      >
        <Route index element={<Friendaccount />} />
        <Route path="Photos" element={<Friendphotos />} />
      </Route>
      <Route path="*" element={<h1>Page not found!</h1>} />
    </Route>
  )
);

// <>
//   <BrowserRouter>
//     <UserContext>
//       <Routes>
//         <Route exact path="/" element={<Userlogin />} />
//         <Route path="/Signup" element={<Signup />} />
//         <Route path="/Traverse" element={<Traverse />} />
//         <Route path="/Profile" element={<Profile />} />
//         <Route path="/Edit" element={<Editaccount />} />
//         <Route path="/Friend" element={<Friendaccount />} />
//         <Route path="/Friend/Photos" element={<Friendphotos />} />
//       </Routes>
//     </UserContext>
//   </BrowserRouter>
// </>

function App() {
  return <RouterProvider router={router} />;
}

export default App;
