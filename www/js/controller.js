var db;
var acao;
var linha;

var controller = {
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', function() {
            //db = openDatabase('atividades.db', '1.0', '', 2 * 1024 * 1024); //WebSQL
            db = window.sqlitePlugin.openDatabase({name: 'atividades.db', location: 'default'}); //SQLite
        });
    },

    acao: function(valor){
        db.transaction(function (tx) {
            tx.executeSql('DROP TABLE IF EXISTS acoes');
            tx.executeSql('CREATE TABLE IF NOT EXISTS acoes (id INTEGER PRIMARY KEY, valor VARCHAR(20) NOT NULL)');
            tx.executeSql('INSERT INTO acoes VALUES (?,?)', [null, valor]);
        }, function(error) {
            console.log('Transaction ERROR: ' + error.message);
        }, function() {
            window.location.href = "linhas.html";
        });
    },

    linhas: function(linha){
        db.transaction(function(tx) {
            tx.executeSql('DROP TABLE IF EXISTS linhas');
            tx.executeSql('CREATE TABLE IF NOT EXISTS linhas (id INTEGER PRIMARY KEY, nome VARCHAR(20) NOT NULL)');
            tx.executeSql('INSERT INTO linhas VALUES (?,?)', [null, linha]);
            tx.executeSql('SELECT valor FROM acoes LIMIT 1', [], function(tx, resultSet) {
                acao = resultSet.rows.item(0).valor;
            });
         }, function(error) {
                console.log('Transaction ERROR: ' + error.message);
         }, function() {
                if(acao === 'verificar'){
                    var obj = {'acao': acao, 'id_user': device.uuid, 'linha': linha};
                    webservice(obj);
                }else if(acao === 'avaliar'){
                    window.location.href = "avaliar.html";
                }
        });
    },

    avaliar: function(voto){
        db.transaction(function(tx) {
            tx.executeSql('SELECT nome FROM linhas LIMIT 1', [], function(tx, resultSet) {
                linha = resultSet.rows.item(0).nome;
            });
         }, function(error) {
                console.log('Transaction ERROR: ' + error.message);
         }, function() {
                var obj = {'acao': 'avaliar', 'id_user': device.uuid, 'linha': linha, 'voto': voto};
                webservice(obj);
         });
    }
};
