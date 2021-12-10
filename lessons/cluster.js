const cluster = require('cluster')
const os = require('os')

if (cluster.isMaster) {
  for (let i = 0; i < os.cpus().length - 2; i++) {
    cluster.fork()
  }
  cluster.on('exit', (worker) => {
    console.log(`Worker with pid: ${worker.process.pid} is dead!`)
    cluster.fork()
  })
} else {
  console.log(`Worker with pid: ${process.pid} is running`)

  setInterval(() => {
    console.log(`Worker with pid: ${process.pid} is still running`)
  }, 5000)
}
