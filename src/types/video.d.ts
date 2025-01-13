interface Video {
  name: string;
  urlMovie: string;
  description: string;
  duration: string;
  provider: string;
  stateLesson: string;
  thumbnail?: File | null;
}

interface Channel {
  id: string;
  kind: string;
  etag: string;
  snippet: {
    title: string;
    customUrl: string;
    description: string;
    localized: {
      title: string;
      description: string;
    };
    publishedAt: string;
    thumbnails: {
      default: Thumbnail;
      medium: Thumbnail;
      high: Thumbnail;
    };
  };
  contentDetails: {
    relatedPlaylists: Record<string, any>;
  };
}

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}
