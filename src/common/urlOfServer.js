import https from 'https';

export default function urlOfServer(server) {
  const protocol = server instanceof https.Server ? 'https' : 'http';
  const host = 'localhost';
  const {port} = server.address();
  return `${protocol}://${host}:${port}`;
}
