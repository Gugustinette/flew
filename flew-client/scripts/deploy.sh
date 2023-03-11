# Import Environment Variables from env/.prod.env
export $(cat './env/.prod.env' | grep -v '^#' | xargs)

node ./node_modules/dotenv-cli/cli.js -e ./env/.dev.env vue-cli-service build
serve -s dist -l $PORT
