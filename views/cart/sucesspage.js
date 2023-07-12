const  layout = require('../layout')
module.exports = ({msg}) => {
    return layout({
        content :`
        <div class="response"> 
        <div class="card  response-card">
        <div style="border-radius:200px; height:200px; width:200px; background: #F8FAF5; margin:0 auto;">
          <i class="checkmark">✓</i>
        </div>
        <div>
        <h1>Sucess</h1> 
        <p>${msg}</p>
        <a href="/menu">Back to Menu</a>
        </div>
       
        </div>
        </div>
        `
    })
}