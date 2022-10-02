export interface Video {
  caption: string;
  video: {
    asset: {
      _id: string;
      url: string;
    };
  };
  _id: string;
  postedBy: {
    _id: string;
    userName: string;
    image: string;
  };
  likes: {
    _key: string;
    _ref: string;
  }[];
  comments: {
    comment: string;
    _key: string;
    postedBy: {
      _id: string;
      userName: string;
      image: string;
    };
  }[];
  userId: string;
}

export interface IUser {
  _id: string;
  _type: string;
  userName: string;
  image: string;
}

export interface ITopic {
  _id: string;
  name: string;
  icon: string;
}
