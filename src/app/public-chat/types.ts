export interface Message {
  id: string;
  sender: string;
  avatar: string;
  content: string;
  timestamp: string;
  isSelf: boolean;
  replyTo?: {
    id: string;
    sender: string;
    content: string;
  };
}
