'use strict'

const cheerio = require('cheerio')

function parseTodo( key ){
	todos.push({ text: key })
	return `<span id="todo-${todos.length}">ToDo:= ${key}</span>`
}

function parseTodoBlock(){

	if( todos.length === 0 ){
		return '<h3>Great! No ToDos left!</h3>'
	}

	let result = '<table class="todos">'

	todos.forEach(function( todo, index ){
		result += `<tr><td><span class="todo-number">${index + 1}</span></td><td>`
		result += `<a href="${todo.ref}">${todo.text}</a>`
		result += '</td></tr>'
	})

	result += '</table>'

	return result
}

function parsePageName( page ){
	const path = page.split('.')
	path.pop()
	return `${path.join('.')}.html`
}

let todos = []

module.exports = {
	book: {
		assets: './assets',
		css: ['style.css']
	},
	hooks: {
		init: function(){
			todos = []
		},
		page: function(page){
			const $ = cheerio.load(page.content)

			$('span[id*="todo-"]').each(function(){
				const id = $(this).attr('id')
				const num = id.replace('todo-', '')
				todos[parseInt(num -1)].ref = `${parsePageName(page.path)}#${id}`
			})

    	return page
		}
	},
	filters: {
		todo: parseTodo,
		TODO: parseTodo,
		ToDo: parseTodo
	},
	blocks: {
		todos: { process: parseTodoBlock },
		TODOS: { process: parseTodoBlock },
		ToDos: { process: parseTodoBlock }
	}
}