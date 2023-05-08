require('dotenv').config();
const nodemailer = require("nodemailer");
const express = require("express");
const ejs = require("ejs");
const port = 3001;

const app = express();


app.get("/sendemail", async (req, res)=>{

    //transport
    var transport = nodemailer.createTransport({
        host: process.env.HOST_MAIL,
        port: process.env.HOST_PORT,
        auth: {
          user: process.env.HOST_USER,
          pass: process.env.HOST_PASS
        }
      });


    //Config Email 
    let message = await transport.sendMail({
        from: '"Pessoa Teste" <pessoa@teste.com>',
        to:"teste@teste.com",
        subject:"Email Teste",
        text: "Email Teste utilizando Nodemailer",
        html: "<p><strong>Test Nodemailer</strong> Test Nodemailer With mail trap </p>"
    })


    res.send("Email enviado com sucesso");
});


app.get("/sendhtml", async (req, res)=>{
    
    ejs.renderFile(__dirname+"/email.ejs", function(err, data) {
        if(err){
          console.log(err);
        } else{
              //transporter
              var transport = nodemailer.createTransport({
                host: process.env.HOST_MAIL,
                port: process.env.HOST_PORT,
                auth: {
                  user: process.env.HOST_USER,
                  pass: process.env.HOST_PASS
                }
              }); 
  
              let mailOptions = {
                from: '"Pessoa Teste" pessoa@teste.com',
                to:   "pessoa@teste.com",
                subject: "E-mail com Html",
                html: data
              }
  
              transport.sendMail(mailOptions, function(err, inf){
                  if(err){
                    console.log(err);
                  } else {
                    console.log("E-mail com html enviado com sucesso!");
                  }
              });
  
        }  
    });
    
    res.send("E-mail com html enviado com sucesso!");
  });


app.get("/sendanexo", async (req, res)=>{

    //transport
    var transport = nodemailer.createTransport({
      host: process.env.HOST_MAIL,
      port: process.env.HOST_PORT,
      auth: {
        user: process.env.HOST_USER,
        pass: process.env.HOST_PASS
      }
    });

  //Config Email 
  let message = await transport.sendMail({
      from: '"Pessoa Teste" <pessoa@teste.com>',
      to:"teste@teste.com",
      subject:"Email Anexo",
      text: "Email Teste com Anexo",
      html: "<p><strong>Test Nodemailer</strong> Test Nodemailer With mail trap </p>",
      attachments: [{
        filename: 'Capa.pdf',
        path: __dirname + '/Capa.pdf',   
        contentType: 'application/pdf'
      }],
      function(err, info) {
        if (err) {
          console.error(err);
        } else {
          console.log(info);
        }
      }
      
      
  });

  res.send("E-mail com anexo enviado com sucesso!");

});


app.listen(port, ()=>{
    console.log(`Rodando na porta ${port}...`)
});