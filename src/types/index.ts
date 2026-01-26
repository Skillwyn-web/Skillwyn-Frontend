export interface SnapCode {
    id: string;
    videoUrl: string;
    author: {
        name: string;
        avatar: string; // URL or Initials
        username: string;
    };
    caption: string;
    likes: number;
    comments: number;
    shares: number;
    saves?: number;
}
