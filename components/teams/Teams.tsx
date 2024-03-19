'use client';
import styles from "../../public/styles/page.module.css";
import { TeamRow } from "@/components/teams/TeamRow";
import { AddTeamRow } from "./AddTeam";
import React, { useState } from 'react';
import { Team } from '../../app/page';

interface TeamsProps {
  teams: Team[];
}

export function Teams({teams}: TeamsProps){
  const [isAdding, setAdding] = useState(false); // sets the add team editor visible if isAdding is true
  const [teamList, setTeamList] = useState(teams);

  const addRow = (newTeam: Team) => {
    setTeamList(prevTeams => [newTeam, ...prevTeams])
  }


  return (
    <React.Fragment>
      <button onClick={() => {setAdding(true)}} className={styles.btn}>+ Bæta við liði</button>
      <table className={styles.teams}>
        <thead>
          <tr>
            <th>Lið</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          { isAdding && (
            <AddTeamRow closeAddEditor={() => {setAdding(false)}} addRow={addRow}/>
          )}
          {teamList.map((team) => (
            <React.Fragment key={team.id}>
              <TeamRow teamID={team.id} teamName={team.name} teamDescription={team.description} teamSlug={team.slug}/>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}