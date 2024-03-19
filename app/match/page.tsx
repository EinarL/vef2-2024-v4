'use client';
import { Navbar } from "@/components/Navbar";
import { Match } from "../matches/page";
import { useParams, useSearchParams  } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
    const searchParams = useSearchParams();
 
    const matchInfoStringified = searchParams.get('matchInfo');
    let matchInfo = null;
    if(matchInfoStringified) matchInfo = JSON.parse(matchInfoStringified);
    console.log(matchInfo);


    return (
        <div>
        <header></header>
        <main>
            <Navbar/>
            {matchInfo ? (
                <h4>{matchInfo.id}</h4>
            ) : (
                <h2>Error getting match information :(</h2>
            )}
        </main>
        </div>
    );

  };