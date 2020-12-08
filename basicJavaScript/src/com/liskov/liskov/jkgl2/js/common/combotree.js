$.extend($.fn.combotree.defaults.keyHandler, {
	up : function() {
		// console.log('up');
	},
	down : function() {
		// console.log('down');
	},
	enter : function() {
		// console.log('enter');
	},
	query : function(q) {
		var param = q.split(',');
		q = param[param.length - 1];

		var t = $(this).combotree('tree');
		var nodes = t.tree('getChildren');
		for ( var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			if (node.text.indexOf(q) >= 0) {
				$(node.target).show();
			} else {
				$(node.target).hide();
			}
		}
		var opts = $(this).combotree('options');
		if (!opts.hasSetEvents) {
			opts.hasSetEvents = true;
			var onShowPanel = opts.onShowPanel;
			opts.onShowPanel = function() {
				var nodes = t.tree('getChildren');
				for ( var i = 0; i < nodes.length; i++) {
					$(nodes[i].target).show();
				}
				onShowPanel.call(this);
			};
			$(this).combo('options').onShowPanel = opts.onShowPanel;
		}
	}
});