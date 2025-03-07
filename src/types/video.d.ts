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

interface Thumbnails {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
  standard?: Thumbnail;
  maxres?: Thumbnail;
}

interface Localized {
  title: string;
  description: string;
}

interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  localized: Localized;
}

interface ContentDetails {
  itemCount: number;
}

interface Playlist {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  contentDetails: ContentDetails;
}

interface PlaylistsResponse {
  playlists: Playlist[];
}

interface VideoContentDetails {
  videoId: string;
  videoPublishedAt: string;
}

interface ResourceId {
  kind: string;
  videoId: string;
}

interface VideoSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: ResourceId;
  videoOwnerChannelId: string;
  videoOwnerChannelTitle: string;
}

interface PlaylistItem {
  kind: string;
  etag: string;
  id: string;
  snippet: VideoSnippet;
  contentDetails: VideoContentDetails;
}

interface LessonYoutube {
  lessonLengh: string;
  description: string;
  nameLesson: string;
  duration: string;
  idLessonYt: string;
  urlVideo: string;
  thumbnail: string | File;
}

interface PlaylistItemListResponse {
  kind: string;
  etag: string;
  items: PlaylistItem[];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}
