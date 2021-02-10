import GoogleOauth from "app/types/googleOauth";
import { passportAuth, VerifyCallbackResult } from "blitz";
import db from "db";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const isProduction = process.env.NODE_ENV === "production";
const callbackURL = isProduction
  ? "https://feedback-alpha.vercel.app/api/auth/google/callback"
  : "http://localhost:3000/api/auth/google/callback";

export default passportAuth({
  successRedirectUrl: "/teams",
  errorRedirectUrl: "/auth",
  strategies: [
    {
      strategy: new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          callbackURL,
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

          const user = await db.user.upsert({
            where: { email: _json.email },
            create: {
              email: _json.email,
              name: displayName,
              avatar: _json.picture,
            },
            update: { email: _json.email },
          });

          const publicData = {
            userId: user.id,
            roles: [user.role],
            source: provider,
          };

          done(null, { publicData });
        }
      ),
    },
  ],
});
