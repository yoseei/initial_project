import "assets/global.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "constants/routes";
import SignInPage from "pages/SignInPage";
import GlobalContextProvider from "GlobalContextProvider";
import SignUpPage from "pages/SignUpPage";
import MyPage from "pages/MyPage";
import PrivateRoute from "components/Route/PrivateRoute";
import GeneralRoute from "components/Route/GeneralRoute";
import "antd/dist/antd.css";

function App() {
  return (
    <BrowserRouter>
      <GlobalContextProvider>
        <Routes>
          <Route index element={<h1>Hello</h1>} />
          <Route path={routes.signIn()} element={<GeneralRoute />}>
            <Route path={routes.signIn()} element={<SignInPage />} />
          </Route>
          <Route path={routes.signUp()} element={<GeneralRoute />}>
            <Route path={routes.signUp()} element={<SignUpPage />} />
          </Route>
          <Route path={routes.myPage()} element={<PrivateRoute />}>
            <Route path={routes.myPage()} element={<MyPage />} />
          </Route>
        </Routes>
      </GlobalContextProvider>
    </BrowserRouter>
  );
}

export default App;
