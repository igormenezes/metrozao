var app = {
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', function() {
            setTimeout(function(){ window.location.href = "acao.html"; }, 3000);
        });
    },
};
