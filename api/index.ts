import axios from 'axios';

const BASE_URL = 'https://api.bags.fm/api/v1/user';

export const fetchLeaderboard = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/get_user_leaderboard`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUser = async (param: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${param}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
