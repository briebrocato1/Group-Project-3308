document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('openModalBtn').addEventListener('click', () => {
      document.getElementById('messageModal').style.display = 'block';
    });
  
    document.getElementById('closeModalBtn').addEventListener('click', () => {
      document.getElementById('messageModal').style.display = 'none';
    });
  
    document.getElementById('messageForm').addEventListener('submit', (event) => {
      event.preventDefault();
  
      const author = document.getElementById('author').value;
      const text = document.getElementById('text').value;
  
      fetch('/messageboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ author, text })
      })
      .then(response => {
        if (response.ok) {
          
          document.getElementById('messageModal').style.display = 'none';
  
          window.location.reload();
        } else {
          alert('Failed to submit message');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to submit message');
      });
    });
  });

  document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('.add-reply-btn').forEach(button => {
      button.addEventListener('click', (event) => {
        const messageId = event.target.getAttribute('data-message-id');
        const replyForm = document.getElementById(`reply-form-${messageId}`);
        

        if (replyForm.style.display === 'none' || replyForm.style.display === '') {
          replyForm.style.display = 'block';
        } else {
          replyForm.style.display = 'none';
        }
      });
    });
  

    document.querySelectorAll('.replyForm').forEach(form => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
  
        const parentId = form.getAttribute('data-parent-id');
        const replyText = document.getElementById(`reply-text-${parentId}`).value;
  

        fetch('/add-reply', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            parentId: parentId,
            text: replyText,
            author: document.getElementById('author').value,
          }),
        })
        .then(response => {
          if (response.ok) {

            window.location.reload();
          } else {
            alert('Failed to submit reply');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Failed to submit reply');
        });
      });
    });
  });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', (event) => {
        const messageId = event.target.getAttribute('data-message-id');
        const messageElement = document.getElementById(`message-${messageId}`);
        const replies = messageElement.querySelector('.replies');
  
        const confirmDelete = confirm("Are you sure you want to delete this message?");
        if (!confirmDelete) return;
  
        const hasReplies = replies && replies.children.length > 0;
  
        fetch(`/delete-message/${messageId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ hasReplies })
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            if (hasReplies) {
              messageElement.querySelector('strong').textContent = "Deleted";
              messageElement.querySelector('p').textContent = "This message has been deleted.";
              event.target.style.display = 'none';
            } else {
              messageElement.remove();
            }
          } else {
            alert('Failed to delete the message');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Failed to delete the message');
        });
      });
    });
  });
