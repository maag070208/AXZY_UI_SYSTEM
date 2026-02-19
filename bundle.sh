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

echo "Moviendo al directorio de destino..."
mv *.tgz ~/DEV/AXZY/CHECK/WEB
echo "Bundle creado y movido al directorio de destino."
echo "Limpiando archivos temporales..."
rm -rf *.tgz
echo "Archivos temporales eliminados."
echo "Proceso completado exitosamente."
# End of script