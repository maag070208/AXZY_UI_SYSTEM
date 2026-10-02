"""Corre una app de terminal en un pty, le manda teclas y guarda la salida
cruda (ANSI) para renderizarla después con `render-terminal.mjs`.

Uso:
  python3 scripts/capturas/capture-tui.py <salida.bin> <cols> <filas> <cwd> "<comando>" [paso ...]

Pasos:
  sleep:<segundos>     espera (y sigue leyendo la salida)
  send:<texto>         manda teclas; los escapes van con backslash (\\r = Enter, \\t = Tab)
  kill                 mata el proceso sin restaurar la pantalla, para que el
                       último cuadro quede en el buffer

Ejemplo (TUI de axzy, abre users/ y corre el request):
  python3 scripts/capturas/capture-tui.py /tmp/axzy.bin 132 34 .tmp-cli-demo axzy \\
    sleep:2 send:j sleep:0.5 send:l sleep:0.5 send:j send:j send:j sleep:0.4 'send:\\r' sleep:4 kill

Ojo con las comillas: sin comillas, bash se come el backslash (`send:\\r` llega
como la letra `r`) y el Enter nunca se envía.

En macOS el pty puede estar bloqueado por el sandbox del agente: hay que correr
este script con acceso completo.
"""
import codecs
import fcntl
import os
import pty
import select
import shlex
import signal
import struct
import sys
import termios
import time

if len(sys.argv) < 6:
    raise SystemExit(__doc__)

salida, cwd, comando = sys.argv[1], sys.argv[4], sys.argv[5]
cols, filas = int(sys.argv[2]), int(sys.argv[3])
pasos = sys.argv[6:]

argv = shlex.split(comando)
if not argv:
    raise SystemExit("comando vacío")


def parsear(paso):
    if paso.startswith("sleep:"):
        return "sleep", float(paso[6:])
    if paso.startswith("send:"):
        return "send", codecs.decode(paso[5:], "unicode_escape").encode()
    if paso == "kill":
        return "kill", None
    raise SystemExit(f"paso desconocido: {paso}")


pid, fd = pty.fork()
if pid == 0:
    os.chdir(cwd)
    os.environ.update(
        TERM="xterm-256color",
        COLUMNS=str(cols),
        LINES=str(filas),
        COLORTERM="truecolor",
    )
    os.execvp(argv[0], argv)
    os._exit(1)

fcntl.ioctl(fd, termios.TIOCSWINSZ, struct.pack("HHHH", filas, cols, 0, 0))

buf = bytearray()


def drenar(segundos):
    """Lee lo que la app escriba durante `segundos` (o hasta que cierre)."""
    fin = time.time() + segundos
    while time.time() < fin:
        listos, _, _ = select.select([fd], [], [], 0.05)
        if not listos:
            continue
        try:
            trozo = os.read(fd, 65536)
        except OSError:
            return False
        if not trozo:
            return False
        buf.extend(trozo)
    return True


for paso in pasos:
    tipo, dato = parsear(paso)
    if tipo == "sleep":
        drenar(dato)
    elif tipo == "send":
        os.write(fd, dato)
        drenar(0.4)
    else:
        os.kill(pid, signal.SIGKILL)
        drenar(0.6)
        break

try:
    os.close(fd)
except OSError:
    pass
os.waitpid(pid, 0)

with open(salida, "wb") as f:
    f.write(bytes(buf))
print(f"{len(buf)} bytes -> {salida}")
