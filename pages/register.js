import React, { useEffect, useContext } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";

import { LoginContext } from "../contexts/Login";

const RegisterWidget = dynamic(
  () =>
    import("../components/widgets/RegisterWidget").then(
      mod => mod.RegisterWidget
    ),
  {
    ssr: false
  }
);

const Register = () => {
  const loginCtx = useContext(LoginContext);

  useEffect(() => {
    if (loginCtx.isLoggedIn) {
      Router.push("/");
    }
  }, [loginCtx.isLoggedIn]);

  return (
    <>
      <div className="container">
        {!loginCtx.isLoggedIn && (
          <>
            <div className="contents">
              <RegisterWidget />
            </div>
          </>
        )}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          font-family: Space Grotesk;
          flex-direction: column;
        }
        .contents {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .header {
          font-size: 32px;
          font-weight: bold;
          padding: 15px;
          padding-top: 30px;
          text-align: center;
        }
        @media only screen and (max-width: 768px) {
          .contents {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
};

export default Register;
