type ColorModeType = 'light' | 'dark';

interface IColorMode {
  colorMode: ColorModeType;
}

export interface IFourDigitsLoaderProps extends IColorMode {}

export interface IFourDigitsInputsProps extends IColorMode {
  colorMode: ColorModeType;
  isLoading: boolean;
  verifyCode(code: string): void;
}

export interface IFourDigitsMessageProps extends IColorMode {
  isShowError: boolean;
  isResendSucceed: boolean;
  isLoading: boolean;
  resendAfter?: number;
  onResendPress(): void;
}

export interface IFourDigitsProps
  extends IFourDigitsInputsProps,
    IFourDigitsMessageProps {}
