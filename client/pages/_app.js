import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Header from "./../components/Header";

const root = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
};

root.getInitialProps = async (context) => {
  const client = buildClient(context.ctx);
  const { data } = await client.get("/api/users/currentuser");
  const pageProps =
    (await context?.Component?.getInitialProps?.(
      context.ctx,
      client,
      data.currentUser
    )) || {};
  return {
    pageProps,
    ...data,
  };
};

export default root;
