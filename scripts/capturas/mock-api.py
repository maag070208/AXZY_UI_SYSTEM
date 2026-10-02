"""API mínima para la demo del TUI de axzy (sin dependencias externas)."""
import json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

USUARIOS = [
    {"id": 1, "name": "Ana Torres", "email": "ana@axzy.dev", "role": "admin"},
    {"id": 2, "name": "Luis Paredes", "email": "luis@axzy.dev", "role": "editor"},
    {"id": 3, "name": "Marta Ruiz", "email": "marta@axzy.dev", "role": "viewer"},
]

TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3Iiwicm9sZSI6ImFkbWluIn0.7Xk2-demo"


class Handler(BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def log_message(self, *args):  # silencio
        pass

    def _json(self, code, payload, headers=None):
        body = json.dumps(payload, indent=2).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("X-Request-Id", "req_8f21c4")
        for clave, valor in (headers or {}).items():
            self.send_header(clave, valor)
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path == "/health":
            self._json(200, {"status": "ok", "version": "0.1.0", "uptime": 3821})
        elif self.path == "/users":
            self._json(200, {"data": USUARIOS, "total": len(USUARIOS), "page": 1})
        elif self.path.startswith("/users/"):
            self._json(200, {"data": USUARIOS[0]})
        else:
            self._json(404, {"error": "not_found", "path": self.path})

    def do_POST(self):
        largo = int(self.headers.get("Content-Length") or 0)
        cuerpo = json.loads(self.rfile.read(largo) or b"{}")
        if self.path == "/auth/login":
            self._json(200, {"data": {"token": TOKEN, "expiresIn": 3600}})
        elif self.path == "/users":
            self._json(201, {"data": {"id": 42, **cuerpo, "createdAt": "2026-10-02T14:20:11Z"}})
        else:
            self._json(404, {"error": "not_found"})


if __name__ == "__main__":
    ThreadingHTTPServer(("127.0.0.1", 8899), Handler).serve_forever()
