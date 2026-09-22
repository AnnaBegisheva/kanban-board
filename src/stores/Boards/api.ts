import { apiRequest } from '@utils/requests';
import type { Board } from './types';

export const getBoards = async (): Promise<Board[]> => {
  try {
    const response = await apiRequest<Board[]>({
      endpoint: `/members/me/boards`,
      method: 'GET',
    });
    return response;
  } catch (error) {
    console.error('Error fetching boards:', error);
    return [];
  }
};

export const getBoardById = async (boardId: string): Promise<Board | null> => {
  try {
    const response = await apiRequest<Board>({
      endpoint: `/boards/${boardId}`,
      method: 'GET',
    });
    return response;
  } catch (error) {
    console.error('Error fetching board:', error);
    return null;
  }
};

export const createBoard = async (name: string): Promise<Board> => {
  try {
    const response = await apiRequest<Board>({
      endpoint: `/boards`,
      method: 'POST',
      body: { name },
    });
    return response;
  } catch (error) {
    console.error('Error creating board:', error);
    throw error;
  }
};

export const deleteBoardById = async (boardId: string): Promise<boolean> => {
  try {
    const response = await apiRequest<boolean>({
      endpoint: `/boards/${boardId}`,
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
    const response = await apiRequest<any[]>({
      endpoint: `/boards/${boardId}/lists`,
      method: 'GET',
    });
    return response;
  } catch (error) {
    console.error('Error fetching lists:', error);
    return [];
  }
};

export const getCardsByBoardId = async (boardId: string): Promise<any[]> => {
  try {
    const response = await apiRequest<any[]>({
      endpoint: `/boards/${boardId}/cards`,
      method: 'GET',
    });
    return response;
  } catch (error) {
    console.error('Error fetching cards:', error);
    return [];
  }
};
