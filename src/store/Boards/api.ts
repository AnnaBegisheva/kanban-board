import type { Board } from './types';

const API_KEY = import.meta.env.VITE_API_KEY;
const TOKEN = import.meta.env.VITE_TOKEN;

const fetchData = async (url: string): Promise<any> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};

const postData = async (url: string, body: any): Promise<any> => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Failed to post data to ${url}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error posting data to ${url}:`, error);
    throw error;
  }
};

export const getBoards = async (): Promise<Board[]> => {
  try {
    const response = await fetchData(`https://api.trello.com/1/members/me/boards?key=${API_KEY}&token=${TOKEN}`);
    console.log('Fetched boards:', response);
    return response;
  } catch (error) {
    console.error('Error fetching boards:', error);
    return [];
  }
};

export const getBoardById = async (boardId: string): Promise<Board | null> => {
  try {
    const response = await fetchData(`https://api.trello.com/1/boards/${boardId}?key=${API_KEY}&token=${TOKEN}`);
    return response;
  } catch (error) {
    console.error('Error fetching board:', error);
    return null;
  }
};

export const createBoard = async (name: string): Promise<Board | null> => {
  try {
    const response = await postData(
      `https://api.trello.com/1/boards/?name=${encodeURIComponent(name)}&key=${API_KEY}&token=${TOKEN}`,
      {
        method: 'POST',
      },
    );
    return response;
  } catch (error) {
    console.error('Error creating board:', error);
    return null;
  }
};

export const deleteBoardById = async (boardId: string): Promise<boolean> => {
  try {
    const response = await postData(`https://api.trello.com/1/boards/${boardId}?key=${API_KEY}&token=${TOKEN}`, {
      method: 'DELETE',
    });
    return response;
  } catch (error) {
    console.error('Error deleting board:', error);
    return false;
  }
};

export const getListsByBoardId = async (boardId: string): Promise<any[]> => {
  try {
    const response = await fetchData(`https://api.trello.com/1/boards/${boardId}/lists?key=${API_KEY}&token=${TOKEN}`);
    return response;
  } catch (error) {
    console.error('Error fetching columns:', error);
    return [];
  }
};

export const getCardsByBoardId = async (boardId: string): Promise<any[]> => {
  try {
    const response = await fetchData(`https://api.trello.com/1/boards/${boardId}/cards?key=${API_KEY}&token=${TOKEN}`);
    console.log('Fetched cards:', response);
    return response;
  } catch (error) {
    console.error('Error fetching cards:', error);
    return [];
  }
};
