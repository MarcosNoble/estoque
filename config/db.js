//codigo pra rodar  servidor local no pc e online no deploy 
if(process.env.NODE_ENV == "production"){
    module.exports = {mongoURI:process.env.MONGOSENHA}
}else{
    //module.exports = {mongoURI:"mongodb://localhost/blogapp"}
    module.exports = {mongoURI:process.env.MONGOSENHA}
}

