module.exports = {
	entry:  './client/components/App.js',
		output: {
		path:    __dirname + '/client/builds',
		filename: 'bundle.js',
	},
	module: {
		loaders: [
			{
			test:   /\.js/,
			loader: 'babel',
			include: __dirname + '/client/components',
			query: {
			  presets: ['es2015', 'react']
			}
			}
		],
	}
};
