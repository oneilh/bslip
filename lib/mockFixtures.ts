export interface MockFixture {
  id: string;
  competition: "EPL" | "LaLiga" | "SerieA";
  homeTeam: string;
  awayTeam: string;
  date: string; // e.g. "2026-05-24T15:00:00Z"
  stats: {
    btts: boolean;
    totalGoals: number;
  };
  form: {
    home: number[]; // Home team's historical goals. Positive = home match, Negative = away match
    away: number[]; // Away team's historical goals. Positive = home match, Negative = away match
  };
  h2h: Array<{ homeGoals: number; awayGoals: number }>;
  // Historical head-to-head results. Most recent last. Used for H2H filter evaluation.
}

export const MOCK_FIXTURES: MockFixture[] = [
  // ==========================================
  // PREMIER LEAGUE (EPL)
  // ==========================================
  {
    id: "epl-1",
    competition: "EPL",
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    date: "2026-05-24T16:30:00Z",
    stats: { btts: true, totalGoals: 3 },
    form: {
      home: [3, -2, 4, -1, 3, -2],
      away: [-2, 3, -3, 1, -2, 3],
    },
    h2h: [
      { homeGoals: 2, awayGoals: 2 },
      { homeGoals: 1, awayGoals: 0 },
      { homeGoals: 3, awayGoals: 1 },
      { homeGoals: 0, awayGoals: 0 },
      { homeGoals: 2, awayGoals: 1 },
    ],
  },
  {
    id: "epl-2",
    competition: "EPL",
    homeTeam: "Manchester City",
    awayTeam: "Manchester United",
    date: "2026-05-24T19:00:00Z",
    stats: { btts: true, totalGoals: 4 },
    form: {
      home: [4, -1, 3, -3, 5, -2],
      away: [-1, 2, -2, 2, -4, 1],
    },
    h2h: [
      { homeGoals: 1, awayGoals: 2 },
      { homeGoals: 3, awayGoals: 1 },
      { homeGoals: 2, awayGoals: 0 },
      { homeGoals: 4, awayGoals: 1 },
      { homeGoals: 1, awayGoals: 1 },
    ],
  },
  {
    id: "epl-3",
    competition: "EPL",
    homeTeam: "Liverpool",
    awayTeam: "Everton",
    date: "2026-05-25T20:00:00Z",
    stats: { btts: false, totalGoals: 2 },
    form: {
      home: [2, -2, 3, -1, 4, -2],
      away: [-1, 0, -2, 1, -1, 2],
    },
    h2h: [
      { homeGoals: 0, awayGoals: 0 },
      { homeGoals: 2, awayGoals: 0 },
      { homeGoals: 1, awayGoals: 1 },
      { homeGoals: 3, awayGoals: 0 },
      { homeGoals: 0, awayGoals: 0 },
    ],
  },
  {
    id: "epl-4",
    competition: "EPL",
    homeTeam: "Tottenham",
    awayTeam: "West Ham",
    date: "2026-05-26T19:45:00Z",
    stats: { btts: true, totalGoals: 3 },
    form: {
      home: [3, -3, 2, -4, 1, -3],
      away: [-2, 1, -3, 2, -1, 2],
    },
    h2h: [
      { homeGoals: 2, awayGoals: 1 },
      { homeGoals: 1, awayGoals: 2 },
      { homeGoals: 3, awayGoals: 3 },
      { homeGoals: 0, awayGoals: 1 },
      { homeGoals: 2, awayGoals: 0 },
    ],
  },
  {
    id: "epl-5",
    competition: "EPL",
    homeTeam: "Aston Villa",
    awayTeam: "Newcastle",
    date: "2026-05-27T18:00:00Z",
    stats: { btts: true, totalGoals: 5 },
    form: {
      home: [2, -2, 3, -3, 4, -1],
      away: [-3, 2, -1, 4, -2, 3],
    },
    h2h: [
      { homeGoals: 1, awayGoals: 1 },
      { homeGoals: 2, awayGoals: 0 },
      { homeGoals: 0, awayGoals: 2 },
      { homeGoals: 3, awayGoals: 2 },
      { homeGoals: 1, awayGoals: 1 },
    ],
  },

  // ==========================================
  // LA LIGA (LaLiga)
  // ==========================================
  {
    id: "laliga-1",
    competition: "LaLiga",
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona",
    date: "2026-05-24T20:00:00Z",
    stats: { btts: true, totalGoals: 4 },
    form: {
      home: [3, -2, 5, -2, 4, -3],
      away: [-2, 4, -3, 3, -2, 4],
    },
    h2h: [
      { homeGoals: 2, awayGoals: 1 },
      { homeGoals: 3, awayGoals: 2 },
      { homeGoals: 0, awayGoals: 4 },
      { homeGoals: 2, awayGoals: 2 },
      { homeGoals: 3, awayGoals: 1 },
    ],
  },
  {
    id: "laliga-2",
    competition: "LaLiga",
    homeTeam: "Atletico Madrid",
    awayTeam: "Sevilla",
    date: "2026-05-25T19:00:00Z",
    stats: { btts: false, totalGoals: 1 },
    form: {
      home: [1, -2, 1, -1, 2, -1],
      away: [-2, 0, -1, 1, -3, 0],
    },
    h2h: [
      { homeGoals: 1, awayGoals: 0 },
      { homeGoals: 0, awayGoals: 0 },
      { homeGoals: 2, awayGoals: 1 },
      { homeGoals: 1, awayGoals: 1 },
      { homeGoals: 0, awayGoals: 2 },
    ],
  },
  {
    id: "laliga-3",
    competition: "LaLiga",
    homeTeam: "Real Sociedad",
    awayTeam: "Athletic Bilbao",
    date: "2026-05-26T21:00:00Z",
    stats: { btts: true, totalGoals: 2 },
    form: {
      home: [2, -1, 1, -2, 2, -1],
      away: [-1, 2, -2, 1, -2, 2],
    },
    h2h: [
      { homeGoals: 1, awayGoals: 1 },
      { homeGoals: 2, awayGoals: 0 },
      { homeGoals: 0, awayGoals: 0 },
      { homeGoals: 1, awayGoals: 2 },
      { homeGoals: 2, awayGoals: 2 },
    ],
  },
  {
    id: "laliga-4",
    competition: "LaLiga",
    homeTeam: "Villarreal",
    awayTeam: "Valencia",
    date: "2026-05-27T20:00:00Z",
    stats: { btts: true, totalGoals: 3 },
    form: {
      home: [3, -2, 4, -2, 3, -1],
      away: [-2, 2, -1, 3, -2, 2],
    },
    h2h: [
      { homeGoals: 2, awayGoals: 2 },
      { homeGoals: 3, awayGoals: 1 },
      { homeGoals: 1, awayGoals: 0 },
      { homeGoals: 0, awayGoals: 3 },
      { homeGoals: 2, awayGoals: 1 },
    ],
  },

  // ==========================================
  // SERIE A (SerieA)
  // ==========================================
  {
    id: "seriea-1",
    competition: "SerieA",
    homeTeam: "Juventus",
    awayTeam: "Inter Milan",
    date: "2026-05-24T19:45:00Z",
    stats: { btts: false, totalGoals: 2 },
    form: {
      home: [2, -1, 1, -2, 1, -1],
      away: [-2, 3, -1, 2, -2, 1],
    },
    h2h: [
      { homeGoals: 0, awayGoals: 1 },
      { homeGoals: 1, awayGoals: 1 },
      { homeGoals: 2, awayGoals: 0 },
      { homeGoals: 0, awayGoals: 2 },
      { homeGoals: 1, awayGoals: 0 },
    ],
  },
  {
    id: "seriea-2",
    competition: "SerieA",
    homeTeam: "AC Milan",
    awayTeam: "Napoli",
    date: "2026-05-25T18:45:00Z",
    stats: { btts: true, totalGoals: 3 },
    form: {
      home: [2, -2, 3, -2, 3, -2],
      away: [-2, 1, -3, 2, -3, 1],
    },
    h2h: [
      { homeGoals: 2, awayGoals: 2 },
      { homeGoals: 1, awayGoals: 0 },
      { homeGoals: 3, awayGoals: 1 },
      { homeGoals: 0, awayGoals: 1 },
      { homeGoals: 2, awayGoals: 2 },
    ],
  },
  {
    id: "seriea-3",
    competition: "SerieA",
    homeTeam: "Roma",
    awayTeam: "Lazio",
    date: "2026-05-26T18:00:00Z",
    stats: { btts: true, totalGoals: 2 },
    form: {
      home: [1, -2, 2, -1, 3, -2],
      away: [-2, 1, -2, 2, -1, 3],
    },
    h2h: [
      { homeGoals: 1, awayGoals: 1 },
      { homeGoals: 2, awayGoals: 0 },
      { homeGoals: 0, awayGoals: 0 },
      { homeGoals: 3, awayGoals: 2 },
      { homeGoals: 1, awayGoals: 2 },
    ],
  },
  {
    id: "seriea-4",
    competition: "SerieA",
    homeTeam: "Atalanta",
    awayTeam: "Fiorentina",
    date: "2026-05-27T19:00:00Z",
    stats: { btts: true, totalGoals: 4 },
    form: {
      home: [3, -2, 4, -3, 5, -2],
      away: [-2, 3, -2, 1, -4, 2],
    },
    h2h: [
      { homeGoals: 2, awayGoals: 1 },
      { homeGoals: 3, awayGoals: 3 },
      { homeGoals: 1, awayGoals: 0 },
      { homeGoals: 0, awayGoals: 0 },
      { homeGoals: 2, awayGoals: 1 },
    ],
  },
];
