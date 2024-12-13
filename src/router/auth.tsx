import { Route } from "react-router-dom";

const authRoutes = (
  <>
    <Route
      path="/auth/login"
      element={<p className="text-black text-6xl">Login</p>}
    />
  </>
);

export default authRoutes;
