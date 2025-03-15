import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import AllBooks from "./pages/AllBooks";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import { useEffect } from "react";
import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Settings from "./components/Profile/Settings";
import AllOrders from "./pages/AllOrders";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";

function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role); // Corrected role extraction

  useEffect(() => {
    // On mount, check local storage and set login state
    const storedRole = localStorage.getItem("role");
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      storedRole
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(storedRole));
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="all-books/view-book-details/:id" element={<ViewBookDetails />} />

        <Route path="/cart" element={<Cart />} />

        {/* Conditionally rendering components based on user roles */}
        <Route path="/profile" element={<Profile />}>
          {role === "user" && (
            <>
              <Route index element={<Favourites />} />
              <Route path="orderHistory" element={<UserOrderHistory />} />
              <Route path="settings" element={<Settings />} />
            </>
          )}
          {role === "admin" && (
            <>
              <Route index element={<AllOrders />} />
              <Route path="add-book" element={<AddBook />} />
            </>
          )}
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/update-book/:id" element={<UpdateBook />} />
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
