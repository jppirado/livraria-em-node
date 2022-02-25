const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')



require('./models/tbLivros')
const Book = mongoose.model('books')

app.use(express.static(path.join(__dirname, 'public')))
app.set('public', path.join(__dirname, 'public'))
app.engine('ejs' , require('ejs').renderFile)
app.set('view engine', 'ejs')



app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/livraria').then(()=>console.log('MongoDB conectado')).catch((err)=> console.log('Erro ao conectar ao mongoDB'+err))


app.get('/' , (request , response)=>{
  response.render('index')
})

app.post('/insert' ,(request , response)=>{
  const {author , title , category, url}  = request.body;
  if(author && title && category){
    const newBook = {
      title: title,
      author: author, 
      category: category,
      url:  url
    }
    new Book(newBook).save().then(()=>console.log('cadastrado com sucesso')).catch((err)=> console.log('erro ao cadastrar livro'))
    response.redirect('/')
  }
})

app.get('/list' , (request , response)=>{
  Book.find().then((book)=>{
    response.render('listBooks',{books:book})
  })
})

app.post('/search' , (request, response)=>{
  const search = request.body.search;
  console.log(search)
  Book.find({title:search}).then((book)=>{
    response.render('searchBooks',{booksSearch:book})
  })
})

app.get('/delete/:id' , (request , response)=>{
  Book.deleteOne({_id:request.params.id}).then(()=>console.log('Deletado  com sucesso')).catch((err)=> console.log(err))
 response.redirect('/list')
})

app.listen(8089, console.log('Servidor Rodando'))