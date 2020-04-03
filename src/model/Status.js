class Status {
  constructor({ status, code, message }) {
    this.status = status;
    this.code = code;
    this.message = message;
  }
}

class ErrorStatus extends Status {
  constructor(obj) {
    super({ status: "ERROR", ...obj });
  }
}

class SuccessStatus extends Status {
  constructor(obj) {
    super({ status: "SUCCESS", ...obj });
  }
}

export { Status, ErrorStatus, SuccessStatus };
