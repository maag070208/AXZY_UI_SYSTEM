#!/bin/bash

set -e

# Configuración
INCREMENT=${1:-patch}
BRANCH=$(git branch --show-current)
REMOTE=${2:-origin}

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}📦 Iniciando publicación UI System${NC}"
echo "Branch actual: $BRANCH"

# Verificar que estamos en main/master
if [ "$BRANCH" != "main" ] && [ "$BRANCH" != "master" ]; then
    echo -e "${RED}❌ Error: Debes estar en main/master para publicar${NC}"
    exit 1
fi

# Verificar que no hay cambios sin commit
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${RED}❌ Error: Hay cambios sin commitear${NC}"
    git status --short
    exit 1
fi

# Pull latest changes
echo -e "${YELLOW}📥 Actualizando desde remote...${NC}"
git pull $REMOTE $BRANCH

echo -e "${YELLOW}🔖 Incrementando versión ($INCREMENT)...${NC}"
npm version $INCREMENT -m "chore(release): Bump version to %s"

echo -e "${YELLOW}🔨 Creando bundle...${NC}"
yarn run bundle

echo -e "${YELLOW}📦 Empaquetando...${NC}"
yarn pack

# Publicar a npm (opcional)
read -p "¿Publicar a npm? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}📤 Publicando a npm...${NC}"
    npm publish
fi

echo -e "${YELLOW}🚀 Pusheando cambios y tags...${NC}"
git push $REMOTE $BRANCH --follow-tags

echo -e "${GREEN}✅ Proceso completado exitosamente!${NC}"

# Mostrar info del paquete
PACKAGE_NAME=$(node -p "require('./package.json').name")
PACKAGE_VERSION=$(node -p "require('./package.json').version")
echo -e "${GREEN}📦 $PACKAGE_NAME@$PACKAGE_VERSION publicado${NC}"

# Opcional: copiar a otro directorio
if [ -d "$HOME/DEV/AXZY/CHECK/WEB" ]; then
    cp *.tgz "$HOME/DEV/AXZY/CHECK/WEB"
    echo -e "${GREEN}📋 Copiado a ~/DEV/AXZY/CHECK/WEB${NC}"
fi