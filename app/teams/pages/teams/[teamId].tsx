import { Suspense } from "react";
import ProtectedLayout from "app/layouts/ProtectedLayout";
import {
  Link,
  useRouter,
  useQuery,
  useParam,
  BlitzPage,
  useMutation,
} from "blitz";
import getTeam from "app/teams/queries/getTeam";
import deleteTeam from "app/teams/mutations/deleteTeam";

export const Team = () => {
  const router = useRouter();
  const teamId = useParam("teamId", "number");
  const [team] = useQuery(getTeam, { where: { id: teamId } });
  const [deleteTeamMutation] = useMutation(deleteTeam);

  return (
    <div>
      <h1>Team {team.id}</h1>
      <pre>{JSON.stringify(team, null, 2)}</pre>

      <Link href={`/teams/${team.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteTeamMutation({ where: { id: team.id } });
            router.push("/teams");
          }
        }}
      >
        Delete
      </button>
    </div>
  );
};

const ShowTeamPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/teams">
          <a>Teams</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Team />
      </Suspense>
    </div>
  );
};

ShowTeamPage.getLayout = (page) => (
  <ProtectedLayout title={"Team"}>{page}</ProtectedLayout>
);

export default ShowTeamPage;
