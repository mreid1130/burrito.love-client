$(document).ready(function() {

  var messages = [];
  var socket = io.connect('http://localhost:8080');
  var chatBox = $("#chatBox");
  var name = $("#name");
  var message = $("#message");
  var count = 0;

  socket.on('message', function(data) {
    if (data.message && data.name) {
      messages.push(data);
      count++;
      var html = '';
      html += '<li class="chat-message"><b>' + data.name + ': </b>';
      html += data.message + '</li>';
      if (messages.length > 1000) {
        $('.chat-message:nth-of-type(1)').remove();
        messages.shift();
      }
      chatBox.append(html);
      var scrollBar = $('html body');
      var chatContainer = document.getElementById("chat-container");
      scrollBar.scrollTop(chatContainer.scrollHeight);

    } else {
      console.log("Problem getting message", data);
    }
  });

  $('#send').on('click', function(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.returnValue = false; // for IE
    if (e.type === 'click') {
      if (!name.val()) {
        alert("Please enter a name");
      } else {
        var text = message.value;
        socket.emit('send', {
          message: message.val(),
          name: name.val()
        });
        message.val('');
      }
    }
  });

})
