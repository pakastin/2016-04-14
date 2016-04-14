
function el (tagName) {
  var element = document.createElement(tagName);

  for (var i = 1; i < arguments.length; i++ ) {
    var arg = arguments[i];

    if (mount(element, arg)) {
      continue;
    }
    if (typeof arg === 'object'){
      for (var attr in arg) {
        if (element[attr] != null) {
          element[attr] = arg[attr];
        } else {
          element.setAttribute(attr, arg[attr]);
        }
      }
    }
  }

  return element;
}

function setChildren (parent, children) {
  var parentEl = parent.el || parent;
  var traverse = parentEl.firstChild;

  for (var i = 0; i < children.length; i++) {
    var child = children[i];
    var childEl = child.el || child;

    if (traverse === childEl) {
      traverse = traverse.nextSibling;
      continue;
    }
    if (traverse) {
      mount(parent, childEl, traverse);
    } else {
      mount(parent, childEl);
    }
  }

  while (traverse) {
    var next = traverse.nextSibling;

    parent.removeChild(traverse);

    traverse = next;
  }
}

function mount (parent, child, before) {
  var parentEl = parent.el || parent;
  var childEl = child.el || child;

  if (typeof childEl === 'string') {
    mount(parentEl, document.createTextNode(childEl));
  } else if (childEl instanceof Node){
    if (before) {
      var beforeEl = before.el || before;
      parentEl.insertBefore(childEl, beforeEl);
    } else {
      parentEl.appendChild(childEl);
    }
  } else if (childEl instanceof List) {
    childEl.parent = parentEl;
    setChildren(parentEl, child.views);
  } else if (childEl instanceof Array) {
    for (var i = 0; i < childEl.length; i++) {
      mount(parentEl, childEl[i]);
    }
  } else {
    return false;
  }
  return true;
}

function List (View) {
  this.View = View;
  this.views = [];
}

List.prototype.update = function (data) {
  var View = this.View;
  var views = this.views;
  var parent = this.parent;

  views.length = data.length;

  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    var view = views[i];

    if (!view) {
      views[i] = view = new View();
    }

    view.update(item);
  }

  parent && setChildren(parent, views);
}
