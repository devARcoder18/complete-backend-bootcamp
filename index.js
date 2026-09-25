const fs = require('fs')
const http = require('http')
const url = require('url')
const replaceTemplate = require('./modules/replaceTemplate')
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if (err) return console.log("Error");

//     console.log(data1)
// })


// server

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data);


const server = http.createServer((req, res) => {
    const { query, pathname} = url.parse(req.url, true)

    if(pathname === '/' || pathname === '/overview'){
        res.writeHead(200, {'Content-type': 'text/html'})

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('')
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)
        res.end(output)


    } else if (pathname === '/product'){
        res.writeHead(200, {'Content-type':'text/html'})
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product)
         res.end(output)

    } else if (pathname === '/api') {
        res.writeHead(200, {'Content-type': 'application/json'})
            res.end(data)
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello world'
        })
        res.end('<h1>Page Not Found</h1>')
    }
})

server.listen(8000, '127.0.0.1', ()=>{
    console.log("Listening the request to port 8000")
})



// lecture 17 start continue