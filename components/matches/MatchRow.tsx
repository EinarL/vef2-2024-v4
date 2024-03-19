'use client';
import { format } from 'date-fns';
import React from 'react';
import { Match } from '../../app/matches/page';
import styles from "../../public/styles/page.module.css";
import matchStyles from "../../public/styles/matches.module.css";
import { useRouter } from 'next/navigation';

interface MatchRowProps {
    match: Match;
    homeTeam: string;
    awayTeam: string;
}

export function MatchRow({match, homeTeam, awayTeam}: MatchRowProps){
    const router = useRouter();
    const matchDate = formatDate(match.date);

    if(!homeTeam) homeTeam = "team no longer exists";
    if(!awayTeam) awayTeam = "team no longer exists";

    const handleClick = () => {
        const queryParams = new URLSearchParams();
        queryParams.append('matchInfo', JSON.stringify({ ...match, homeTeam, awayTeam }));
        router.push(`/match?${queryParams.toString()}`);
      };

    return (
        <React.Fragment key={match.id}>
            <tr onClick={handleClick}>
                <td className={styles.date_font}>{matchDate}</td>
                <td>{homeTeam}</td>
                <td>{match.home_score}</td>
                <td>{match.away_score}</td>
                <td>{awayTeam}</td>
            </tr>
        </React.Fragment>
    );
}


/**
 * @param {string} dateString
 * @returns {string} returns the date as a string in the form of: yyyy-mm-dd hh:mm:ss
 */
function formatDate(dateString: string){
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }