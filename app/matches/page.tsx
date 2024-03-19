import { Matches } from "@/components/matches/Matches";
import { Team } from "../page";
import { Navbar } from "@/components/Navbar";

export interface Match {
  id: number;
  date: string;
  home: number;
  away: number;
  home_score: number;
  away_score: number;
}

export default async function Home() {
  try{
    const matchesResponse = await fetch('https://vfor2-verkefni3.onrender.com/matches', {cache: 'no-store'});
    // need to fetch teams to map teamID to team name
    const teamsResponse = await fetch('https://vfor2-verkefni3.onrender.com/teams', {cache: 'no-store'});
    if(!matchesResponse.ok){
      throw new Error('Failed to fetch matches');
    }
    if(!teamsResponse.ok){
      throw new Error('Failed to fetch teams');
    }
    const matches: Match[] = await matchesResponse.json();
    const teams: Team[] = await teamsResponse.json();
    return (
      <div>
        <header></header>
        <main>
          <Navbar/>
          <h1>Leikir</h1>
          <Matches matches={matches} teams={teams}/>
        </main>
      </div>
    );
  } catch(error){
    console.error('Error fetching teams:', error);
    return <div>Error fetching teams</div>;
  }

};