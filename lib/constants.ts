export const tags = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'] as const;

export type Tag = typeof tags[number];