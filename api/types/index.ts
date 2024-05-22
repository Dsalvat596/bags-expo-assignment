interface TwitterData {
  verified: boolean;
  followers_count: number;
  following_count: number;
  created_at: string;
  url: string;
}

interface Preorder {
  claimed: boolean;
  claimed_at: string;
  invited_by: string;
  users_invited: number;
  claimed_android: boolean;
  claimed_at_android: string;
  invited_by_android: string;
}

interface Membership {
  tier: string;
  premium_since: string;
  expires_at: string;
  payment_method: string;
  price: number;
  currency: string;
  referred_by: string;
  membership_id: number;
  count: number;
}

export interface User {
  _id: string;
  username: string;
  picture: string;
  twitter_userID: string;
  invites: number;
  twitter_data: TwitterData;
  type: string;
  ticker: string;
  preorder: Preorder;
  membership: Membership;
  referral_count: number;
  invited_memberships: number;
  points: number;
  rank?: number;
  membershipPurchaseWallet?: string;
  publicWallets?: string;
}
