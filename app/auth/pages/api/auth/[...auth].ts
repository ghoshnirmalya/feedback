import GoogleOauth from "app/types/googleOauth";
import { passportAuth, VerifyCallbackResult } from "blitz";
import db from "db";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Role } from "types";
import isProduction from "utils/isProduction";

const domainURL = isProduction
  ? "https://feedback-alpha.vercel.app"
  : "http://localhost:3000";

export default passportAuth({
  successRedirectUrl: "/teams",
  errorRedirectUrl: "/auth",
  strategies: [
    {
      strategy: new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          callbackURL: `${domainURL}/api/auth/google/callback`,
          scope: ["profile", "email"],
        },
        async function (
          _token: string,
          _tokenSecret: string,
          profile: GoogleOauth,
          done: (x?: any, y?: VerifyCallbackResult) => void
        ) {
          const { _json, provider, displayName } = profile;

          if (!_json.email) {
            return done(new Error("Google OAuth response doesn't have email."));
          }

          const isSignUp = !(await db.user.findFirst({
            where: { email: _json.email },
          }));

          const user = await db.user.upsert({
            where: { email: _json.email },
            create: {
              email: _json.email,
              name: displayName,
              avatar: _json.picture,
            },
            update: { email: _json.email },
          });

          if (isSignUp) {
            // Send a welcome email on signing up
            await fetch(`${domainURL}/api/inviteEmail`, {
              method: "POST",
              body: JSON.stringify({
                email: _json.email,
                name: displayName,
              }),
            });
          }

          const publicData = {
            userId: user.id,
            roles: [user.role as Role],
            source: provider,
          };

          done(null, { publicData });
        }
      ),
    },
  ],
});
