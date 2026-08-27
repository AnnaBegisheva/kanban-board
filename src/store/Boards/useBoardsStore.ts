import { create } from 'zustand';
import type { Board } from './types';

const starterBoards: Board[] = [
  {
    id: 1,
    name: 'Product roadmap',

    columns: [
      {
        id: 'todo',
        title: 'TO DO',
      },
      {
        id: 'progress',
        title: 'IN PROGRESS',
      },
      {
        id: 'review',
        title: 'IN REVIEW',
      },
      {
        id: 'done',
        title: 'DONE',
      },
    ],

    tasks: [
      {
        id: 'NUC-344',
        title: 'Optimize experience for mobile web',
        assignee: 'Emma Johnson',
        description: 'Improve the mobile web experience and fix usability issues on smaller screens.',
        status: 'todo',
        date: '2026-08-28',
        category: 'billing',
      },
      {
        id: 'NUC-360',
        title: 'Onboard workout options (OWO)',
        assignee: 'Sophia Williams',
        description: 'Add onboarding options for users interested in workout programs.',
        status: 'todo',
        date: '2026-08-30',
        category: 'billing',
      },
      {
        id: 'NUC-337',
        title: 'Multi-dest search UI mobileweb',
        assignee: 'Michael Brown',
        description: 'Create and improve the interface for multi-destination search on mobile devices.',
        status: 'todo',
        date: '2026-09-02',
        category: 'accounts',
      },
      {
        id: 'NUC-342',
        title: 'Fast trip search',
        assignee: 'James Wilson',
        description: 'Improve search performance and reduce the time required to find available trips.',
        status: 'progress',
        date: '2026-08-26',
        category: 'accounts',
      },
      {
        id: 'NUC-335',
        title: 'Affiliate links integration - frontend',
        assignee: 'Olivia Davis',
        description: 'Implement frontend support for affiliate links and related tracking.',
        status: 'progress',
        date: '2026-08-27',
        category: 'billing',
      },
      {
        id: 'NUC-341',
        title: 'Shopping cart purchasing error - quick fix required',
        assignee: 'Daniel Miller',
        description: 'Investigate and fix an error that prevents users from completing purchases.',
        status: 'progress',
        date: '2026-08-26',
        category: 'forms',
      },
      {
        id: 'NUC-367',
        title: 'Revise and streamline booking flow',
        assignee: 'Emily Taylor',
        description: 'Review the booking flow and simplify unnecessary steps in the user journey.',
        status: 'review',
        date: '2026-08-25',
        category: 'accounts',
      },
      {
        id: 'NUC-358',
        title: 'Travel suggestion experiments',
        assignee: 'Lucas Anderson',
        description: 'Review the results of experiments related to personalized travel suggestions.',
        status: 'review',
        date: '2026-08-29',
        category: 'accounts',
      },
      {
        id: 'NUC-340',
        title: 'High outage: Software bug fix - BG Web-store app crashing',
        assignee: 'Mia Martinez',
        description: 'Fix the critical issue that caused the web store application to crash.',
        status: 'done',
        date: '2026-08-20',
        category: 'billing',
      },
    ],
  },

  {
    id: 2,
    name: 'Marketing tasks',
    columns: [
      {
        id: 'todo',
        title: 'TO DO',
      },
      {
        id: 'progress',
        title: 'IN PROGRESS',
      },
      {
        id: 'review',
        title: 'IN REVIEW',
      },
      {
        id: 'done',
        title: 'DONE',
      },
    ],
    tasks: [],
  },

  {
    id: 3,
    name: 'Personal projects',
    columns: [
      {
        id: 'todo',
        title: 'PLANNED',
      },
      {
        id: 'progress',
        title: 'DOING',
      },
      {
        id: 'done',
        title: 'COMPLETED',
      },
    ],
    tasks: [],
  },
];

type BoardsStore = {
  boards: Board[];
  actions: {
    addBoard: (board: Board) => void;
    deleteBoard: (boardId: number) => void;
    updateBoard: (updatedBoard: Board) => void;
  };
};

const useBoardsStore = create<BoardsStore>((set) => ({
  boards: starterBoards,
  actions: {
    addBoard: (board) => set((state) => ({ boards: [...state.boards, board] })),
    deleteBoard: (boardId) =>
      set((state) => ({
        boards: state.boards.filter((board) => board.id !== boardId),
      })),
    updateBoard: (updatedBoard) =>
      set((state) => ({
        boards: state.boards.map((board) => (board.id === updatedBoard.id ? updatedBoard : board)),
      })),
  },
}));

export default useBoardsStore;
