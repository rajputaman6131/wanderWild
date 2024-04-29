import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      return Boolean(token);
    },
  },
});

export const config = {
  matcher: [
    "/admin",
    "/gallery/new",
    "/packages/new",
    "/packages/:slug",
    "/payment",
    "/places/new",
    "/posts/:slug/edit",
    "/posts/write",
  ],
};
