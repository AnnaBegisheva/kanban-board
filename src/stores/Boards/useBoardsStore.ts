import { create } from 'zustand';

import { getBoardById, getBoards, getCardsByBoardId, getListsByBoardId } from './api';
import type { Board, Task } from './types';

type BoardsStore = {
  boards: Board[];
  isLoading: boolean;
  error: string | null;
  actions: {
    loadBoards: () => Promise<void>;
    loadBoardById: (boardId: string) => Promise<void>;
    addBoard: (board: Board) => void;
    deleteBoard: (boardId: string) => void;
    updateBoard: (updatedBoard: Board) => void;
    loadBoardData: (boardId: string) => Promise<void>;
    addTask: (boardId: string, task: Task) => void;
  };
};

const useBoardsStore = create<BoardsStore>((set) => ({
  boards: [],
  isLoading: false,
  error: null,

  actions: {
    loadBoards: async () => {
      set({ isLoading: true, error: null });

      try {
        const boards = await getBoards();

        set({
          boards,
          isLoading: false,
        });
      } catch {
        set({
          isLoading: false,
          error: 'Failed to load boards',
        });
      }
    },
    loadBoardById: async (boardId: string) => {
      set({ isLoading: true, error: null });

      try {
        const board = await getBoardById(boardId);

        if (board) {
          set((state) => ({
            boards: [...state.boards.filter((b) => b.id !== boardId), board],
            isLoading: false,
          }));
        } else {
          set({
            isLoading: false,
            error: 'Board not found',
          });
        }
      } catch {
        set({
          isLoading: false,
          error: 'Failed to load board',
        });
      }
    },
    addBoard: (board) => set((state) => ({ boards: [...state.boards, board] })),
    deleteBoard: (boardId) =>
      set((state) => ({
        boards: state.boards.filter((board) => board.id !== boardId),
      })),
    updateBoard: (updatedBoard) =>
      set((state) => ({
        boards: state.boards.map((board) => (board.id === updatedBoard.id ? updatedBoard : board)),
      })),

    loadBoardData: async (boardId: string) => {
      const columns = await getListsByBoardId(boardId);
      const tasks = await getCardsByBoardId(boardId);

      set((state) => ({
        boards: state.boards.map((board) => (board.id === boardId ? { ...board, columns, tasks } : board)),
      }));
    },
    addTask: (boardId: string, task: Task) =>
      set((state) => ({
        boards: state.boards.map((board) =>
          board.id === boardId ? { ...board, tasks: [...board.tasks, task] } : board,
        ),
      })),
  },
}));

export default useBoardsStore;
