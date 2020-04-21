$(function(){

  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML= '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      }
    })
    .fall(function() {
      alert('error');
    });
  };

  function buildHTML(message){
    if (message.image) {
      var html = `<div class="message" data-message-id=${message.id}>
                            <div class="upper-info">
                              <p class="upper-info__talker">
                              ${message.user_name}
                              </p>
                              <p class="upper-info__date">
                              ${message.created_at}
                              </p>
                            </div>
                            <p class="message__text">
                            ${message.content}
                            </p>
                            <img class="lower-info__image" src=${message.image}>
                          </div>`
    } else {
      var html = `<div class="message" data-message-id=${message.id}>
                            <div class="upper-info">
                              <p class="upper-info__talker">
                              ${message.user_name}
                              </p>
                              <p class="upper-info__date">
                              ${message.created_at}
                              </p>
                            </div>
                            <p class="message__text">
                            ${message.content}
                            </p>
                          </div>`
    };
    return html;
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function() {
      alert('メッセージ送信に失敗しました');
  })
    .always(function() {
      $('.submit-btn').prop('disabled', false);
  });
  });
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});