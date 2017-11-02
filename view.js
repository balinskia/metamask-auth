var section = (id) => {
  return {
    getDOM() {
      return document.getElementById(id);
    },
    show() {
      this.getDOM().style.display = 'block';
    },
    hide() {
      this.getDOM().style.display = 'none';
    }
  }
}
module.exports = {
  init: function ({ onLoginButtonClick, onLogoutButtonClick }) {
    document.getElementById("log-in-button").addEventListener("click", onLoginButtonClick);
    document.getElementById("log-out-button").addEventListener("click", onLogoutButtonClick);

    var loggedInSection = section('logged-in');
    var notLoggedInSection = section('not-logged-in');
    return {
      setLoggedInView: function () {
        loggedInSection.show();
        notLoggedInSection.hide();
      },
      setNotLoggedInView: function () {
        loggedInSection.hide();
        notLoggedInSection.show();
      }
    }
  }
}