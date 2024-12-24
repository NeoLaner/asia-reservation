export function responseGen() {
  //
  function responseOk<T>(data: T) {
    return Response.json({
      status: 200,
      success: true,
      data: data,
    });
  }
  //
  function responseNotFound() {
    return Response.json(
      {
        status: 400,
        success: false,
      },
      { status: 400 },
    );
  }

  function responseServerError() {
    return Response.json({ status: 500, success: false }, { status: 500 });
  }
  return { responseOk, responseNotFound, responseServerError };
}

export type ResponseTypeGen<T> =
  | {
      status: number;
      success: true;
      data: T;
    }
  | {
      status: number;
      success: false;
      message: "data not found";
    }
  | {
      status: number;
      success: false;
      message: "Internal server error";
    };
