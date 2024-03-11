
import styles from "../public/styles/page.module.css";
import { TeamRow } from "@/components/TeamRow";
import React from 'react';

interface Team {
    id: number;
    name: string;
    slug: string;
    description: string;
}

export async function Teams(){
  try {
  const response = await fetch('https://vfor2-verkefni3.onrender.com/teams', {cache: 'no-store'});
  if(!response.ok){
    throw new Error('Failed to fetch teams');
  }


  const teams: Team[] = await response.json();
  console.log(teams);
  return (
    <table className={styles.teams}>
      <thead>
        <tr>
          <th>Lið</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {teams.map((team) => (
          <React.Fragment key={team.id}>
            <TeamRow teamID={team.id} teamName={team.name} teamDescription={team.description} teamSlug={team.slug}/>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
  } catch(error){
    console.error('Error fetching teams:', error);
    return <div>Error fetching teams</div>;
  }
}


