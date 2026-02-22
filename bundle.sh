#!/bin/bash

INCREMENT=${1:-patch}

set -e

echo "Incrementando versión ($INCREMENT)..."
npm version $INCREMENT -m "chore(release): Bump version to %s"

echo "Creando bundle..."
yarn run bundle

echo "Empaquetando..."
yarn pack

echo "Versión actualizada y cambios subidos exitosamente."

echo "Copiando al directorio de destino..."
cp *.tgz ~/DEV/AXZY/CHECK/WEB
echo "Bundle copiado a destino, y mantenido localmente."

echo "Proceso completado exitosamente."