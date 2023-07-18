import * as React from "react";
import { useSession } from "next-auth/react";
import { Client } from "@microsoft/microsoft-graph-client";

export default function Home() {
  const { data: session } = useSession();
  const [teams, setTeams] = React.useState(null);
  const [presence, setPresence] = React.useState(null);

  const client = Client.init({
    authProvider: (done) => {
      done(null, session?.access_token);
    },
  });

  React.useEffect(() => {
    if (session) {
      // Get the user's joined teams
      client
        .api("/me/joinedTeams")
        .get()
        .then((res) => {
          setTeams(res.value);
        })
        .catch((err) => {
          console.error(err);
        });

      // Get the user's presence status
      client
        .api("/me/presence")
        .get()
        .then((res) => {
          setPresence(res.availability);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [session, client]);

  return (
    <div>
      <div>Hello {JSON.stringify(session)}</div>
      <div>Your teams: {JSON.stringify(teams)}</div>
      <div>Your presence: {presence}</div>
    </div>
  );
}
