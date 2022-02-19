export interface IStatus {
  status: boolean | undefined;
  message: string | undefined;
  data: object | undefined;
}

// Very flexible status generator
function createNewStatus(
  status: boolean = true,
  data: any = {},
  message: string = "Operation was made successfully"
): IStatus {
  return { status, message, data };
}

export default createNewStatus;
