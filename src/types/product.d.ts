interface NewProduct {
  file: File | null;
  name: string;
  description: string;
  category: string;
  duration?: string;
}

interface Product {
  _id?: string;
  areaId?: string;
  count_modules: number;
  count_lesson: number;
  count_members: number;
  name: string;
  thumbnail: string;
  description: string;
  category: string;
  duration: string;
  delDate: string;
  state: string;
  createdAt: string;
  updatedAt: string;
  modules?: Module[];
}

interface NewModule {
  _id?: any;
  name: string;
  stateModule: string;
  description: string;
  format: string;
  thumbnail?: File | null;
}

interface Module {
  _id: any;
  name: string;
  stateModule: string;
  description: string;
  format: string;
  lessons_count: number;
  thumbnail?: File | null;
}

interface Lesson {
  _id?: string;
  createdAt: string;
  duration: string;
  moduleId: string;
  nameLesson: string;
  stateLesson: string;
  urlVideo: string;
  thumbnail: string;
}

interface Area {
  _id?: string;
  domain: string;
  color: string;
  title: string;
  background: any;
  icon: any;
  logo: any;
  courses: Product[]
}

interface NewModule {
  format: string;
  thumbnail: any;
  name: string;
  description: string;
  stateModule: string;
}

enum Format {
  HORIZONTAL_RECT = "HORIZONTAL_RECT",
  SQUARE = "SQUARE",
  VERTICAL_RECT = "VERTICAL_RECT",
  VERTICAL_RECT_MAX = "VERTICAL_RECT_MAX",
}

enum StateModule {
  PRIVADO = "PRIVADO",
  PUBLICO = "PUBLICO",
}

interface Folder {
  created_time: string;
  modified_time: string;
  last_user_action_event_date: string;
  name: string;
  privacy: {
    view: string;
  };
  resource_key: string;
  uri: string;
  link: string | null;
  manage_link: string;
  pinned_on: string | null;
  is_pinned: boolean;
  is_private_to_user: boolean;
  user: {
    uri: string;
    name: string;
    link: string;
    capabilities: {
      hasLiveSubscription: boolean;
      hasEnterpriseLihp: boolean;
      hasSvvTimecodedComments: boolean;
      hasSimplifiedEnterpriseAccount: boolean;
      hasManagementCapabilitiesForComments: boolean;
    };
    location: string;
    gender: string;
    bio: string | null;
    short_bio: string | null;
    created_time: string;
    pictures: {
      uri: string | null;
      active: boolean;
      type: string;
      base_link: string;
      sizes: {
        width: number;
        height: number;
        link: string;
      }[];
      resource_key: string;
      default_picture: boolean;
    };
    websites: any[];
    metadata: {
      connections: {
        albums: {
          uri: string;
          options: string[];
          total: number;
        };
        appearances: {
          uri: string;
          options: string[];
          total: number;
        };
        categories: {
          uri: string;
          options: string[];
          total: number;
        };
        channels: {
          uri: string;
          options: string[];
          total: number;
        };
        feed: {
          uri: string;
          options: string[];
        };
        followers: {
          uri: string;
          options: string[];
          total: number;
        };
        following: {
          uri: string;
          options: string[];
          total: number;
        };
        groups: {
          uri: string;
          options: string[];
          total: number;
        };
        likes: {
          uri: string;
          options: string[];
          total: number;
        };
        membership: {
          uri: string;
          options: string[];
        };
        moderated_channels: {
          uri: string;
          options: string[];
          total: number;
        };
        portfolios: {
          uri: string;
          options: string[];
          total: number;
        };
        videos: {
          uri: string;
          options: string[];
          total: number;
        };
        watchlater: {
          uri: string;
          options: string[];
          total: number;
        };
        shared: {
          uri: string;
          options: string[];
          total: number;
        };
        pictures: {
          uri: string;
          options: string[];
          total: number;
        };
        watched_videos: {
          uri: string;
          options: string[];
          total: number;
        };
        folders_root: {
          uri: string;
          options: string[];
        };
        folders: {
          uri: string;
          options: string[];
          total: number;
        };
        teams: {
          uri: string;
          options: string[];
          total: number;
        };
        block: {
          uri: string;
          options: string[];
          total: number;
        };
      };
    };
    location_details: {
      formatted_address: string;
      latitude: number | null;
      longitude: number | null;
      city: string | null;
      state: string | null;
      neighborhood: string | null;
      sub_locality: string | null;
      state_iso_code: string | null;
      country: string | null;
      country_iso_code: string | null;
    };
    skills: any[];
    available_for_hire: boolean;
    can_work_remotely: boolean;
    preferences: {
      videos: {
        rating: string[];
        privacy: {
          view: string;
          comments: string;
          embed: string;
          download: boolean;
          add: boolean;
          allow_share_link: boolean;
        };
      };
      webinar_registrant_lower_watermark_banner_dismissed: any[];
    };
    content_filter: string[];
    resource_key: string;
    account: string;
  };
  access_grant: string | null;
  metadata: {
    connections: {
      items: {
        uri: string;
        options: string[];
        total: number;
      };
      videos: {
        uri: string;
        options: string[];
        total: number;
      };
      folders: {
        uri: string;
        options: string[];
        total: number;
      };
      ancestor_path: any[];
    };
    interactions: {
      edit: {
        uri: string;
        options: string[];
      };
      move_video: {
        uri: string;
        options: string[];
      };
      upload_video: {
        uri: string;
        options: string[];
      };
      view: {
        uri: string;
        options: string[];
      };
      edit_settings: {
        uri: string;
        options: string[];
      };
      delete: {
        uri: string;
        options: string[];
      };
      delete_video: {
        uri: string;
        options: string[];
      };
      add_subfolder: {
        uri: string;
        options: string[];
        can_add_subfolders: boolean;
        subfolder_depth_limit_reached: boolean;
        content_type: string;
        properties: {
          name: string;
          required: boolean;
          value: string;
        }[];
      };
    };
  };
}

interface FoldersResponse {
  total: number;
  page: number;
  per_page: number;
  paging: {
    next: string | null;
    previous: string | null;
    first: string;
    last: string;
  };
  data: Folder[];
}