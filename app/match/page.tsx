'use client';
import { Navbar } from "@/components/Navbar";
import { useSearchParams  } from 'next/navigation';
import styles from "../../public/styles/match.module.css";
import { Suspense } from "react";


export interface MatchInfo {
    id: number;
    date: string;
    home: number;
    away: number;
    home_score: number;
    away_score: number;
    homeTeam: string;
    awayTeam: string;
  }


export default function Home() {
    return (
        <Suspense>
            <MatchPage/>
        </Suspense>
    );
  };

function MatchPage(){
    const searchParams = useSearchParams();
 
    const matchInfoStringified = searchParams.get('matchInfo');
    let matchInfo = null;
    if(matchInfoStringified) matchInfo = JSON.parse(matchInfoStringified);
    console.log(matchInfo);
    let winner = matchInfo.home_score > matchInfo.away_score ? matchInfo.homeTeam : matchInfo.awayTeam;
    if(matchInfo.home_score === matchInfo.away_score) winner = null;

    return (
        <div>
            <header></header>
            <main>
                <Navbar/>
                {matchInfo ? (
                    <table className={styles.match}>
                        <thead>
                            <tr>
                                <th colSpan={3}>{formatDate(matchInfo.date)}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{matchInfo.homeTeam}</td>
                                <td>VS</td>
                                <td>{matchInfo.awayTeam}</td>
                            </tr>
                            <tr>
                                <td>{matchInfo.home_score}</td>
                                <td>Staða</td>
                                <td>{matchInfo.away_score}</td>
                            </tr>
                        </tbody>
                    </table>

                ) : (
                    <h2>Error getting match information :(</h2>
                )}
            </main>
        </div>
    );
}

  /**
 * @param {string} dateString       24. des 2024 kl. 15:20
 * @returns {string} returns the date as a string in the form of: dd. month yyyy kl. hh:mm
 */
function formatDate(dateString: string){
    const months: { [key: number]: string } = {
        1: 'jan',
        2: 'feb',
        3: 'mars',
        4: 'apríl',
        5: 'maí',
        6: 'júní',
        7: 'júlí',
        8: 'ágúst',
        9: 'sept',
        10: 'okt',
        11: 'nóv',
        12: 'des',
    }
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based
    const day = String(date.getDate());
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}. ${months[month]} ${year} kl. ${hours}:${minutes}`
  }