import { buildClassName } from './buildClassName'

/**
 * Fetches an HTML representation of a component.
 * Note: this function returns an HTMLElement synchronously, but updates its content asynchronously.
 *
 * @param {String} template Twig path the template
 * @param {Object} data Parameters/properties for the components target state
 * @param {Function} Component Class to instantiate
 * @param {Function} onCreated Callback after the component instance has been created
 * @param {String} wrapperElement
 *
 * @returns {HTMLDivElement}
 */
export function renderStory (template, data, Component = null, onCreated = null, wrapperElement = 'div') {
  const promise = window.fetch(process.env.COMPONENT_RENDER_PATH, {
    method: 'POST',
    body: JSON.stringify({
      template,
      data
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const element = document.createElement(wrapperElement)

  element.style.minWidth = '60vw'

  promise.then(async response => {
    element.innerHTML = await response.text()

    if (Component !== null) {
      const className = buildClassName(Component.name)
      const componentRoot = document.querySelector(className) || element.firstElementChild

      const instance = new Component(componentRoot)

      if (onCreated) {
        onCreated(instance)
      }
    }
  })

  return element
}
