(function (doc) {
	if (!doc.querySelector) {
		return alert('Your browser is way to old. Sorry.');
	}

	var list = doc.querySelector('ul'),
		all = list.children,
		i = all.length,
		html = [];

	while (i--) {
		html[i] = all[i].innerHTML;
		all[i].innerHTML = '';
	}

	var animate = function (i) {
		var me = all[i],
			c = 0;

		me.className = 'dollar';
		list.style.marginTop = '-' + (((i + 1) * 25) / 2) + 'px';

		var inty = setInterval(function () {
			me.innerHTML = html[i].substr(0, c) + '<span class="typing">|</span>';
			c++;

			if (html[i].length < c) {
				clearInterval(inty);
				i++;

				if (all[i]) {
					setTimeout(function () {
						me.innerHTML = html[i - 1];
						animate(i);
					}, 100);
				}
			}
		}, 70);
	};

	animate(0);

	// MEOW - is not an easter egg
	// And WOOF - is not easter egg too
	var t = [77, 69, 79, 87],
	    	tt = [87, 79, 79, 70],
		d = [];
	var r = function (m, a) {
		return Math.floor(Math.random() * 100) + (m - a) + a;
	};
	var s = function (x) {
		if (!window.atob)
			return false;
		var l = atob('aHR0cDovL3BsYWNla2l0dGVuLmNvbS8=');
		if (x) l = atob('aHR0cHM6Ly9wbGFjZWRvZy5uZXQv');
		var u = l + r(2e2, 4e2) + '/' + r(1e2, 6e2);
		var i = doc.createElement(atob('aW1n'));
		i.src = u;
		i.setAttribute('style', 'position: absolute; left: ' + r(0, 100) + '%; top: ' + r(0, 100) + '%;');
		doc.body.appendChild(i);
	};
	window.onkeyup = function (e) {
		if (t.equals(d))
			return s();
		if (tt.equals(d))
			return s(1);

		if (d.length === +!0 && (d[0] !== t[0] || d[0] !== tt[0]))
			d = [];
		e.which && d.push(e.which);
	};

})(document, window);

Array.prototype.equals = function (arr) {
	if (this.length !== arr.length)
		return false;

	for (var i = 0; i < arr.length; i++) {
		if (this[i].compareArrays)
			if (!this[i].compareArrays(arr[i]))
				return false;
		if (this[i] !== arr[i])
			return false;
	}
	return true;
};

particlesJS('particles-js',
	{
		"particles": {
			"number": {
				"value": 200
			},
			"color": {
				"value": "#fefefe"
			},
			"shape": {
				"type": ["circle", "triangle", "polygon"]
			},
			"opacity": {
				"value": 1
			},
			"size": {
				"value": 5,
				"random": true,
				"anim": {
					"enable": false,
					"speed": 30,
					"size_min": 0.1,
					"sync": false
				}
			},
			"line_linked": {
				"enable": true,
				"distance": 130,
				"color": "#ffffff",
				"opacity": 0.3,
				"width": 1
			},
			"move": {
				"enable": true,
				"speed": 1,
				"direction": "bottom",
				"random": false,
				"straight": false,
				"out_mode": "out",
				"attract": {
					"enable": false,
					"rotateX": 600,
					"rotateY": 1200
				}
			}
		},
		"interactivity": {
			"detect_on": "canvas",
			"events": {
				"onhover": {
					"enable": false
				},
				"onclick": {
					"enable": false
				},
				"resize": true
			},
			"modes": {
				"bubble": {
					"distance": 50,
					"size": 40,
					"duration": 2,
					"opacity": 8,
					"speed": 3
				}
			}
		}
	}
);
