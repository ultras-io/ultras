export interface IPostCardProps {
  imageUri?: string;
  date: Date;
  title: string;
  creator: string;
  supportersClub: string;
  commentsCount: number;
  isLiked: boolean;
  likeCount: number;
  onPress: () => void;
}

export type PostInfoProps = Omit<IPostCardProps, 'onPress'> & {
  content: string;
};
