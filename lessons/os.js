const os = require('os')

console.log('os.platform', os.platform())
console.log('os.arch', os.arch())
console.log('os.cpus', os.cpus())
console.log('os.cpus', os.cpus().length)

const cpus = os.cpus()

for (let i = 0; i < cpus.length - 2; i++) {
  console.log('Run another node process')
}
