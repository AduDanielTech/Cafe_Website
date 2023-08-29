const success = ({ message }) => {
    return `
      <div class="notification hide-notification success">
        <i class="fa fa-check"></i>
        <span>${message}</span>
        <i class="fa fa-times"></i>
      </div>
    `;
  };
  
  const info = ({ message }) => {
    return `
      <div class="notification hide-notification info">
        <i class="fa fa-info"></i>
        <span>${message}</span>
        <i class="fa fa-times"></i>
      </div>
    `;
  };
  
  const warning = ({ message }) => {
    return `
      <div class="notification hide-notification warning">
        <i class="fa fa-exclamation"></i>
        <span>${message}</span>
        <i class="fa fa-times"></i>
      </div>
    `;
  };
  
  const danger = ({ message }) => {
    return `
      <div class="notification hide-notification danger">
        <i class="fa fa-exclamation"></i>
        <span>${message}</span>
        <i class="fa fa-times"></i>
      </div>
    `;
  };
  
  module.exports = {
    success,
    info,
    warning,
    danger,
  };
  