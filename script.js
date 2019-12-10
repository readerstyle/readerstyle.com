/*
https://readerstyle.com/script.js

Contributors:
- Kyle E. Mitchell, independent
*/

var styles = [
  {
    slug: 'day',
    display: 'Daytime'
  },
  {
    slug: 'night',
    display: 'Nighttime'
  },
  {
    slug: 'large',
    display: 'Large Print'
  },
  {
    slug: 'none',
    display: 'None'
  }
]

var DOMAIN = 'readerstyle.com'
var CSS_CLASS_PREFIX = DOMAIN

document.addEventListener('DOMContentLoaded', function () {
  var errors = simpleMarkupErrors()
  if (errors.length !== 0) {
    errors.forEach(function (error) {
      console.error(error)
    })
    return
  }
  appendAside()
})

function appendAside () {
  var aside = document.createElement('aside')
  aside.id = CSS_CLASS_PREFIX + '-aside'
  aside.style.border = '1px solid black'
  aside.style.padding = '1rem'
  aside.style.margin = '0.5rem'

  var introParagraph = document.createElement('p')
  aside.appendChild(introParagraph)
  introParagraph.appendChild(document.createTextNode('This is a simple webpage.'))
  introParagraph.appendChild(document.createTextNode(' Make it easy to read for you.'))

  styles.forEach(function (style) {
    aside.appendChild(styleButton(style))
  })

  var aboutParagraph = document.createElement('p')
  aside.appendChild(aboutParagraph)
  aboutParagraph.appendChild(document.createTextNode('Visit '))
  var link = document.createElement('a')
  aboutParagraph.appendChild(link)
  link.appendChild(document.createTextNode(DOMAIN))
  link.setAttribute('href', 'https://' + DOMAIN)
  link.setAttribute('target', '_blank')
  aboutParagraph.appendChild(document.createTextNode(' for more information.'))

  var firstChild = document.body.children[0]
  document.body.insertBefore(aside, firstChild)
}

var ALLOWED_TAG_NAMES = [
  'A',
  'BLOCKQUOTE',
  'CODE',
  'DD',
  'DL',
  'DT',
  'EM',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'HR',
  'IMG',
  'LI',
  'OL',
  'P',
  'PRE',
  'SCRIPT',
  'STRONG',
  'TABLE',
  'TBODY',
  'TD',
  'TH',
  'THEAD',
  'UL'
]

function simpleMarkupErrors () {
  var errors = []
  var elements = document.body.getElementsByTagName('*')
  var index
  for (index = 0; index < elements.length; index++) {
    var style = elements[index].style
    if (style.cssText) {
      errors.push('Inline Style')
    }
  }
  var tagNames = allTagNames(elements)
  for (index = 0; index < tagNames.length; index++) {
    var tagName = tagNames[index]
    if (!has(ALLOWED_TAG_NAMES, tagName)) {
      errors.push('Extra Tag: ' + tagName)
    }
  }
  return errors
}

function allTagNames (elements) {
  var tagNames = []
  for (var index = 0; index < elements.length; index++) {
    var tagName = elements[index].tagName
    if (!has(tagNames, tagName)) tagNames.push(tagName)
  }
  return tagNames
}

function has (set, element) {
  return set.indexOf(element) !== -1
}

var BUTTON_CLASS = CSS_CLASS_PREFIX + '-button'

function styleButton (style) {
  var button = document.createElement('button')
  button.className = BUTTON_CLASS
  button.dataset.slug = style.slug
  button.appendChild(document.createTextNode(style.display))
  button.addEventListener('click', function () {
    applyStyle(style)
  })
  button.style.marginRight = '1rem'
  button.style.padding = '1ex'
  if (style.slug === 'none') button.disabled = true
  return button
}

function applyStyle (style) {
  removeAllStyleLinks()
  if (style.slug !== 'none') addStyleLink(style)
  updateStyleButtons(style)
}

function removeAllStyleLinks () {
  var children = document.head.children
  for (var index = 0; index < children.length; index++) {
    var element = children[index]
    if (isStyleLink(element)) {
      element.parentNode.removeChild(element)
    }
  }
}

function addStyleLink (style) {
  var link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('href', 'https://' + DOMAIN + '/styles/' + style.slug + '.css')
  document.head.appendChild(link)
}

function updateStyleButtons (style) {
  var buttons = document.getElementsByClassName(BUTTON_CLASS)
  for (var index = 0; index < buttons.length; index++) {
    var button = buttons[index]
    button.disabled = button.dataset.slug === style.slug
  }
}

function isStyleLink (element) {
  return (
    element.nodeName === 'LINK' &&
    element.getAttribute('rel') === 'stylesheet'
  )
}
