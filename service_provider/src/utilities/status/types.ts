interface IStatus {
  status: boolean | undefined;
  message: string | undefined;
  data: object | undefined;
  extraData: object[];
}

export = IStatus;
