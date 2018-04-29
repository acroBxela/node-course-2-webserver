const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req,res,next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log',log + '\n', (error) => {if (error) { console.log('There was an error');}});
	next();
});
// app.use((req,res,next) => {
// 	res.render('maintence.hbs');
// });
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear',() => {return new Date().getFullYear();});
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});
hbs.registerHelper('getMinutes', () => {
	var timeD = new Date();
	var time = '';
	time += timeD.getHours();
	time += ':' + timeD.getMinutes();
	return time;
})
app.get('/',(req,res) => {
	res.render('home.hbs',{
		pageTitle: 'Home Page',
		currentYear: new Date().getFullYear(),
		welcomeMessage: 'Hello, welcome to handlebar website'
	});
	//res.send('<h1>Hello Express</h1>');
});
app.get('/about', (req,res) => {
	res.render('about.hbs',
			{
				pageTitle: 'About Page',
				currentYear: new Date().getFullYear()
			}
		)
});

app.get('/bad',(req,res) => {
	res.send({
		errorMessage:'handling request'
	});
});
app.get('/projects',(req,res) => {
	res.render('projects.hbs',{
		pageTitle: 'Projects Page'
	})
})
app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});