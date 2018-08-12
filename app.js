import Koa from "koa"
import config from "./config"

import chalk from 'chalk'

async function app() {
  const app = new Koa()
  const { port } = config

  await useMiddlewares(app)

  const server = app.listen(post, () => {
    console.log(
      process.env.NODE_ENV === 'development' ?
      `Open ${chalk.green('http://localhost:' + port)}` :
      `App listening on port ${port}`
    )
  })
}

app()