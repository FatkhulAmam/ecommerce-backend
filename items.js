const express = require('express')
const bodyParser = require('body-parser');
const db = require('./src/helper/db')
const qs = require('querystring')

const app = express();

app.use(bodyParser.urlencoded({extended : false}));

app.post('/items',(req, res)=>{
    const{name, price, description} = req.body
    if(name && price && description){
        db.query(`INSERT INTO items(name, price, description) VALUE ('${name}', ${price}, '${description}')`,(err, result, field)=>{
            if(!err){
                res.status(201).send({
                    success:true,
                    message : 'item has been created',
                    data: req.body
                })
            }else{
                console.log(err)
                res.status(500).send({
                    success: false,
                    message : 'interval  server error'
                })
            }
        })
    }else{
        res.status(400).send({
            success : false,
            message: 'all field must be valued'
        })
    }
})

app.get('/items', (req,res)=>{
    let {page,limit, search} = req.query
    let searchKey = ''
    let searchValue =''
    if(typeof search === 'object' ){
        searchKey = Object.keys(search)[0]
        searchValue = Object.value(search)[0]
    }else{
        searchKey ='name'
        searchValue= search ||''
    }
    if(!limit){
        limit = 5
    }else{
        limit = parseInt(limit)
    }
    if(!page){
        page = 1
    }else{
        page = parseInt(page)
    }
    const offset =  (page-1) * limit
    const query = `SELECT * FROM items WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`
    db.query(query,(err,result,fields)=>{
        if(!err){
            const pageInfo = {
                count:0,
                pages:0,
                currentPage: page,
                LimitPerPage: limit,
                nextLink : '',
                prevLink: ''
            }
            if(result.length){
                const query = `SELECT COUNT(*) AS count FROM items WHERE ${searchKey} LIKE '%${searchValue}%'`
                db.query(query,(err, data, field)=>{
                    const {count} = data[0]
                    pageInfo.count = count
                    pageInfo.pages = Math.ceil(count / limit)
                    
                    const {pages, currentPage}= pageInfo

                    if(currentPage < pages){
                        pageInfo.nextLink = `http://localhost:8180/items?${qs.stringify({...req.query, ...{page: page+1}})}`
                    }
                    if(currentPage > 1){
                        pageInfo.prevLink = `http://localhost:8180/items?${qs.stringify({...req.query, ...{page: page-1}})}`
                    }
                    res.send({
                        success : 'true',
                        message : 'List Items',
                        data: result,
                        pageInfo
                    })
                })
            }else{
                res.send({
                    success : 'false',
                    message : 'No item',
                })
            }
        }else{
            res.status(500).send({
                success : 'false',
                message: 'internal server error'
            })
        }
    })
})
app.put('/items/:id', (req,res) => {
    const {name, price, description} = req.body
    db.query(`UPDATE items SET name = '${name}', price = ${price}, description = '${description}' WHERE id = ${req.params.id}`, (err, result,field) => {
        if(!err){
            res.status(205).send({
                succes: true,
                message: 'data is created',
                data: req.body
            })
        } else {
            res.status(400).send({
                succes: false,
                message: 'bad request'
            })
        }
    })
})

app.patch('/items/:id', (req,res) => {
    const {name, price, description}=req.body
    let sqlQuery = `UPDATE items SET name=${name}, price${price}, description=${description} WHERE id = ${req.params.id}`
    db.query(sqlQuery, (err, result, field) => {
        if(!err){
            res.status(201).send({
                succes: true,
                message: 'Data update',
                data: req.body
            })
        } else {
            res.status(400).send({
                succes: false,
                message: 'bad request'
            })
        }
    })
})

app.delete('/items/:id', (req,res) => {
    db.query(`DELETE FROM items WHERE id = ${req.params.id}`, (err, result, field) => {
        if(!err){
            res.status(201).send({
                succes: true,
                message: 'deleted!!',
                data: null
            })
        } else {
            res.status(400).send({
                succes: false,
                message: 'bad request'
            })
        }
    })
})

app.get('/items/:id', (req,res) => {
    db.query(`SELECT * FROM items WHERE id = ${req.params.id}`, (err, result,field) => {
        if(!err){
            res.status(201).send({
                succes: true,
                message: 'showing...',
                data: result
            })
        } else {
            res.status(400).send({
                succes: false,
                message: 'bad request'
            })
        }
    })
})

app.listen(8180,()=>{
    console.log("aplication running in port 8180")
})