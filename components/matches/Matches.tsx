'use client';
import styles from "../../public/styles/matches.module.css";
import { MatchRow } from "@/components/matches/MatchRow";
import React, { useState } from 'react';
import { Match } from '../../app/matches/page';
import { Team } from '../../app/page';
import { BrowserRouter } from "react-router-dom";

interface MatchesProps {
  matches: Match[];
  teams: Team[]
}


export function Matches({matches, teams}: MatchesProps){
  const teamIdToName: {[key: number]: string} = {};

  teams.forEach(team => {
    teamIdToName[team.id] = team.name;
  });



  return (
    <React.Fragment>
        <table className={styles.matches}>
            <thead>
                <tr>
                    <th>Dagsetning</th>
                    <th>Heimalið</th>
                    <th></th>
                    <th></th>
                    <th>Útilið</th>
                </tr>
            </thead>
            <tbody>
                {matches.map((match) => (
                <React.Fragment key={match.id}>
                    <MatchRow match={match} homeTeam={teamIdToName[match.home]} awayTeam={teamIdToName[match.away]}/>
                </React.Fragment>
                ))}
            </tbody>
        </table>
    </React.Fragment>
  );
}