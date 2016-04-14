
var h1 = document.createElement('h1');

h1.textContent = 'Minimum viable view library';

document.body.appendChild(h1);


var h2 = el('h2',
  'Juha Lindstedt',
  ' ',
  el('a', 'pakastin.fi', { href: 'http://pakastin.fi', target: '_blank' })
);

document.body.appendChild(h2);

var h3 = el('h3',
  'About me'
);


var list = [
  el('li', 'Started with flash in 1999'),
  el('li', 'Work with small businesses and advertising agencies'),
  el('li', 'Entrepreneur since 2006'),
  el('li', 'Started with node.js in 2011'),
  el('li', 'Lead developer of iDiD digital signage',
    ' ',
    el('a', { href: 'http://idid.fi' }, 'idid.fi')
  )
];

var ul = el('ul',
  list
);

setTimeout(function () {
  list.sort(function () {
    return Math.random() - .5;
  });
  setChildren(ul, list);
}, 1000);

document.body.appendChild(ul);


function Card () {
  this.el = el('div', { className: 'card' },
    this.img = el('img'),
    this.name = el('p')
  );
}

Card.prototype.update = function (data) {
  this.name.textContent = data.name;
  this.img.src = data.img.src;
  this.img.width = data.img.width;
  this.img.height = data.img.height;
}

var data = new Array(50);

for (var i = 0; i < data.length; i++) {
  var width = Math.random() * 75 + 75;
  var height = Math.random() * 75 + 75;

  data[i] = {
    name: 'Image ' + (i + 1),
    img: {
      width: width,
      height: height,
      src: 'https://unsplash.it/' + width + '/' + height
    }
  }
}

function Cards () {
  this.el = el('div', { className: 'cards' },
    this.list = new List(Card)
  );
}

Cards.prototype.update = function (data) {
  this.list.update(data);
}

var cards = new Cards();

mount(document.body, cards);

cards.update(data);

setInterval(function () {
  data.sort(function () {
    return Math.random() - .5;
  });
  cards.update(data.slice(0, Math.random() * 25 + 25));
}, 1000);
