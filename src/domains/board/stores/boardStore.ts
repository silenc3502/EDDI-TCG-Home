import { writable } from 'svelte/store';
import type { Board } from '../types/board';

export const boardList = writable<Board[]>([
    {
        id: 1,
        title: '첫 번째 글',
        content: '이건 테스트 게시글입니다.',
        author: 'user-token-abc123',
        createdAt: new Date().toISOString(),
    },
    {
        id: 2,
        title: '두 번째 글',
        content: '두 번째 게시글의 내용입니다.',
        author: 'user-token-xyz789',
        createdAt: new Date().toISOString(),
    },
]);
