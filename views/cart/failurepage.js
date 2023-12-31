const  layout = require('../layout')
module.exports = ({msg,redirect,redirect_link}) => {
    return layout({
        content :`
        <div class="response failure-respose"> 
        <div class="card failure response-card">
        <div style="border-radius:200px; height:200px; width:200px; background: #F8FAF5; margin:0 auto;">
        <span class="material-symbols-outlined">
close
</span>
        </div>
        <div>
        <h1>Failure</h1> 
        <p> ${msg}</p>
        <a href="${redirect_link}">Back to ${redirect}</a>
        </div>
        </div>
        </div>
        `
    })
}