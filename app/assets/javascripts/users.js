$(function() {
<<<<<<< Updated upstream

  var search_list = $('#user-search-result');

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                          <p class="chat-group-user__name">${user.name}</p>
                          <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                        </div>`;
    search_list.append(html);
}

  function appendNoUser() {
    var html = `<div class="chat-group-user clearfix">
                          <p class="chat-group-user__name">ユーザーが見つかりません</p>
                        </div>`;
    search_list.append(html);
  }

  function addDeleteUser(name, id) {
    var html = `<div class="chat-group-user clearfix" id="${id}">
                          <p class="chat-group-user__name">${name}</p>
                          <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
                        </div>`;
    $('.js-add-user').append(html);
  }

  function addMember(userId) {
    var html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }

  $('#user-search-field').on('keyup', function() {
    var input = $(this).val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      search_list.empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          appendUser(user);
        });
      } else if (input.length == 0) {
        return false;
      } else {
        appendNoUser();
      }
    })
    .fail(function() {
      alert('通信エラーです。ユーザーが表示できません。');
    });
  });
  $(document).on('click', '.chat-group-user__btn--add', function() {
    const userName = $(this).attr('data-user-name');
    const userId = $(this).attr('data-user-id');
=======
  function addUser(user) {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  function addNoUser() {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    $("#user-search-result").append(html);
  }
  function addDeleteUser(name, id) {
    let html = `
    <div class="chat-group-user clearfix" id="${id}">
      <p class="chat-group-user__name">${name}</p>
      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    $(".js-add-user").append(html);
  }
  function addMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }
  $("#user-search-field").on("keyup", function() {
    let input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
      .done(function(users) {
        $("#user-search-result").empty();

        if (users.length !== 0) {
          users.forEach(function(user) {
            addUser(user);
          });
        } else if (input.length == 0) {
          return false;
        } else {
          addNoUser();
        }
      })
      .fail(function() {
        alert("通信エラーです。ユーザーが表示できません。");
      });
  });
  $(document).on("click", ".chat-group-user__btn--add", function() {
    console.log
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
>>>>>>> Stashed changes
    $(this)
      .parent()
      .remove();
    addDeleteUser(userName, userId);
    addMember(userId);
  });
<<<<<<< Updated upstream
  $(document).on('click', '.chat-group-user__btn--remove', function() {
=======
  $(document).on("click", ".chat-group-user__btn--remove", function() {
>>>>>>> Stashed changes
    $(this)
      .parent()
      .remove();
  });
});