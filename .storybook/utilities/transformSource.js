export function transformSource (src, storyContext) {
  src = storyContext.originalStoryFn.parameters.storySource.source
  src = src.replaceAll('\n', ' ')

  const regExp = new RegExp(/.*renderStory\(\s*'(.*)\/.*.twig'.*\)/, 'g')
  const matches = regExp.exec(src)

  const templateName = matches[1]
  const parts = templateName.split('/')
  const componentName = parts[parts.length - 1]

  const argMap = Object.entries(storyContext.parameters.args)
    .map(([key, value]) => {
      if (typeof value === 'undefined') {
        return null
      }

      if (typeof value === 'string') {
        value = `"${value}"`
      }

      if (Array.isArray(value) || typeof value === 'object') {
        value = JSON.stringify(value)
      }

      return `${key}: ${value},`
    })
    .filter(x => x)

  const withString = argMap.length ? ` with {\n  ${argMap.join('\n  ')}\n}` : ''

  return `{% include '${templateName}/${componentName}.twig'${withString} only %}`
}
