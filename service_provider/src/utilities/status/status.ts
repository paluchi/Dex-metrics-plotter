import IStatus from "./types";

// Very flexible status generator
function createNewStatus(
  status: boolean = true,
  message: string = "Operation was made successfully",
  data: object | undefined = {},
  ...extraData: object[]
): IStatus {
  return { status, message, data, extraData };
}

export = createNewStatus;
