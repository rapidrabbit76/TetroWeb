'use client';

import { useState, useEffect } from 'react';
import { getLeaderboardEntries } from "@/lib/api/leaderboard";
import { RankingEntry } from '../../types/tetris';
import { formatToUserTimezone } from '../../utils/dateUtils';
import styles from './Dashboard.module.css';
import Link from 'next/link';

export default function Dashboard() {
  const [rankings, setRankings] = useState<RankingEntry[]>([]);

  useEffect(() => {
    getLeaderboardEntries('tetris').then((data) => {
      const rankings: RankingEntry[] = data.map((entry) => ({
        id: entry.userId,
        name: entry.name,
        score: entry.score,
        date: entry.createdAt || '',
      }));
      setRankings(rankings);
    }).catch((error) => {
      console.error('Error fetching leaderboard entries:', error);
    });
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>랭킹 대시보드</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>순위</th>
            <th>닉네임</th>
            <th>ID</th>
            <th>점수</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((entry, index) => (
            <tr key={entry.id}>
              <td>{index + 1}</td>
              <td>{entry.name}</td>
              <td className={styles.idCell}>{entry.id}</td>
              <td>{entry.score}</td>
              <td>{formatToUserTimezone(entry.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href="/" className={styles.homeLink}>
        게임으로 돌아가기
      </Link>
    </div>
  );
} 