
interface LeaderboardEntry {
    id?: number;
    userId: string;
    game: string;
    name: string;
    score: number;
    email?: string;
    createdAt?: string | number;
    updatedAt?: string;
}

export async function getLeaderboardEntries(game: string): Promise<LeaderboardEntry[]> {
    try {
        const response = await fetch(`/api/v1/leaderboard?game=${game}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch leaderboard entries: ${response.statusText}`);
        }

        const res = await response.json();
        return res.data
    } catch (error) {
        console.error('Error fetching leaderboard entries:', error);
        throw error;
    }

}

export async function createLeaderboardEntry(entry: LeaderboardEntry): Promise<void> {
    try {
        const response = await fetch('/api/v1/leaderboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entry),
            credentials: 'include',
            cache: 'no-cache',
            redirect: 'follow',
        });

        if (!response.ok) {
            throw new Error(`Failed to create leaderboard entry: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error creating leaderboard entry:', error);
        throw error;
    }
}
