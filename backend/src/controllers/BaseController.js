class BaseController {
  success(res, data, statusCode = 200) {
    return res.status(statusCode).json({ success: true, data });
  }

  created(res, data) {
    return this.success(res, data, 201);
  }

  noContent(res) {
    return res.status(204).send();
  }
}

export default BaseController;
