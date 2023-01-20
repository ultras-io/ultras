import { create as createStore } from 'zustand';

export interface IState {
  uploadingAvatar: boolean;
  uploadingCover: boolean;
  setUploadingAvatar(uploading: boolean): void;
  setUploadingCover(uploading: boolean): void;
}

export const useFileUploadStore = createStore<IState>(setState => ({
  uploadingAvatar: false,
  uploadingCover: false,
  setUploadingAvatar: (uploading: boolean) => setState({ uploadingAvatar: uploading }),
  setUploadingCover: (uploading: boolean) => setState({ uploadingCover: uploading }),
}));
