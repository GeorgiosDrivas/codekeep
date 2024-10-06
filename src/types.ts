export interface User {
  id: number;
  username: string;
  password?: string;
  name: string;
}

export interface Snippet {
  id: number;
  title: string;
  language: string;
  content: string;
  userid: number;
}
