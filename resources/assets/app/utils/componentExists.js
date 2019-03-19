const fs = require('fs')
const path = require('path')
const components = fs.readdirSync(
  path.join(__dirname, '../components')
)

function componentExists (component) {
  const regex = new RegExp(`^${component}`)
  return components.find(value => regex.test(value))
}

module.exports = componentExists
