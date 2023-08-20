import React, { useContext } from "react";
import Userlogin from "./Pages/Login/Userlogin.js";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Signup from "./Pages/create_account/Signup.js";
import Traverse from "./Pages/Traverse/Traverse.js";
import Profile from "./Pages/profile/Profile.js";
import Editaccount from "./profile/Editaccount.js";
import Friendaccount from "./Pages/Follower/Friendaccount.js";
import Friendphotos from "./Pages/friendaccount/Friendphotos.js";
import Friendlayout from "./component/Layout/Friendlayout.js";
import useLogged from "./component/Hooks/useLogged.js";
import { Error } from "./component/Api/Api.js";
import Addpost from "./Pages/profile/Addpost.js";
import Savedpost from "./Pages/profile/Savedpost.js";
import Search from "./Pages/Search/Search.js";
import Photos from "./Pages/profile/Photos.js";
import Message from "./Pages/message/Message.js";
import Traverselayout from "./component/Layout/Traverselayout.js";
import SocketProvider from "./context/SocketProvider.js";
import PersonContext from "./context/app-context";

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
        element={<Traverselayout />}
        loader={async () => await useLogged()}
        errorElement={<Error />}
      >
        <Route
          path="/Traverse"
          loader={async () => await useLogged()}
          errorElement={<Error />}
        >
          <Route index element={<Traverse />} />
          <Route path="Search" element={<Search />} />
        </Route>
        <Route path="Message" element={<Message />} errorElement={<Error />} />
      </Route>
      <Route
        path="/Profile"
        loader={async () => await useLogged()}
        // errorElement={<Error />}
      >
        <Route index element={<Profile />} />
        <Route path="Add" element={<Addpost />} />
        <Route path="Edit" element={<Editaccount />} />
        <Route path="Save" element={<Savedpost />} />
        <Route path="Photos" element={<Photos />} />
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
  const { id } = useContext(PersonContext);
  return (
    // <SocketProvider id={id}>
    <RouterProvider router={router} />
    // </SocketProvider>
  );
}

export default App;
