interface Ticket {
  id: string;
  name: string;
  number: string;
  description: string;
  category: string;
  priority: string;
  createdAt: string;
  author: {
    name: string;
    avatar: string;
  };
}
