function webservice(obj){
    $.ajax({
        url: '',
        type: 'POST',
        dataType: 'html',
        data: obj,
        success: function(data) {
            if(obj.acao === 'verificar'){
                navigator.notification.alert(data, '', 'Status da linha', 'OK');
            }else if(obj.acao === 'avaliar'){
                navigator.notification.alert('Registro salvo!', '', '', 'OK');
                window.location.href = "acao.html";
            }
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log(xhr, textStatus, errorThrown);
        }
    });
}
