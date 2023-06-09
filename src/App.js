import styles from "./app.module.scss";
import AuthProvider from "./components/AuthProvider/AuthProvider";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

function App() {
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <AuthProvider>
        <Header />
        <>
          <Suspense>
            <Outlet />
          </Suspense>
        </>
        <Footer />
      </AuthProvider>
      <ScrollRestoration />
    </div>
  );
}

export default App;
