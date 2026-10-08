export const AD_CONFIG = {
  ezoicPubId: process.env.NEXT_PUBLIC_EZOIC_PUBID || '',
  slots: {
    leaderboard: { id: '101', width: 728, height: 90 },
    rectangle: { id: '102', width: 300, height: 250 },
    footer: { id: '103', width: 728, height: 90 },
  }
} as const
