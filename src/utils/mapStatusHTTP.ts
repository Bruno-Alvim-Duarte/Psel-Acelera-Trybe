export default function mapStatusHTTP(status: string): number {
  switch (status) {
    case 'SUCCESSFUL':
      return 200;
    case 'CREATED':
      return 201;
    case 'DELETED':
      return 204;
    case 'NOT_FOUND':
      return 404;
    case 'INVALID_DATA':
      return 400;
    case 'UNAUTHORIZED':
      return 401;
    case 'UNPROCESSABLE':
      return 422;
    default:
      return 500;
  }
}
