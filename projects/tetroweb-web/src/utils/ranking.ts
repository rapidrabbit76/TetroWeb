import { RankingEntry } from '../types/tetris';
import { createLeaderboardEntry, getLeaderboardEntries } from '@/lib/api/leaderboard';


const RANKING_STORAGE_KEY = 'tetris-rankings';

/**
 * 로컬 스토리지에서 랭킹 데이터를 가져옵니다.
 * @returns {RankingEntry[]} 랭킹 데이터 배열
 */
export const getRankings = (): RankingEntry[] => {
  if (typeof window === 'undefined') return [];
  const storedRankings = localStorage.getItem(RANKING_STORAGE_KEY);
  if (!storedRankings) return [];
  try {
    return JSON.parse(storedRankings) as RankingEntry[];
  } catch (error) {
    console.error('Error parsing stored rankings:', error);
    return [];
  }
};


/**
 * 새로운 점수를 랭킹에 등록합니다.
 * @param {Omit<RankingEntry, 'date'>} entry - id, name, score를 포함한 랭킹 정보
 */
export const submitScore = (entry: Omit<RankingEntry, 'date'>) => {
  // : 실제 서버퍼 랭킹 데이터를 전송하는 로직을 구현해야 합니다.
  console.log('Submitting score:', entry);

  // Get userId and userName from local storage
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');

  if (!userId || !userName) {
    console.error('UserId or userName not found');
    return;
  }

  // Add userId and userName to the entry
  entry.id = userId;
  entry.name = userName;


  if (typeof window === 'undefined') return;

  // Send the new entry to the server
  createLeaderboardEntry({
    userId: entry.id,
    game: 'tetris',
    name: entry.name,
    score: entry.score
  })
    .then(() => {
      console.log('Leaderboard entry created successfully');
    })
    .catch((error) => {
      console.error('Error creating leaderboard entry:', error);
    });

}; 