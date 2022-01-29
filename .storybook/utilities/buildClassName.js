export function buildClassName (name) {
  return '.' + name[0].toLowerCase() + '-' + name[1].toLowerCase() + name.substr(2)
}
