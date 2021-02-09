import getCurrentUser from "app/users/queries/getCurrentUser";
import { invokeWithMiddleware, ParsedUrlQuery, Router } from "blitz";
import { GetServerSidePropsContext } from "next";

const withAuthentication = (WrappedComponent: any) => (props: any) => {
  const getLayout = WrappedComponent.getLayout || ((page: JSX.Element) => page);

  WrappedComponent.displayName = "AuthenticationHOC";

  return getLayout(<WrappedComponent {...props} />);
};

withAuthentication.isAuth = async (
  ctx: GetServerSidePropsContext<ParsedUrlQuery>
) => {
  const { req, res } = ctx;

  const currentUser = await invokeWithMiddleware(getCurrentUser, null, {
    req,
    res,
  });

  // If user is already logged in redirect them to the "/projects" page.
  if (currentUser) {
    if (res) {
      res.writeHead(302, {
        Location: "/projects",
      });

      res.end();
    } else {
      Router.push("/projects");
    }
  }
};

export default withAuthentication;
