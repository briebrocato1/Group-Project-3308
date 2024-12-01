// document.addEventListener('DOMContentLoaded', () => {
//     document.getElementById('openModalBtn').addEventListener('click', () => {
//       document.getElementById('messageModal').style.display = 'block';
//     }, {once: true});
  
//     document.getElementById('closeModalBtn').addEventListener('click', () => {
//       document.getElementById('messageModal').style.display = 'none';
//     });
  
//     document.getElementById('messageForm').addEventListener('submit', (event) => {
//       event.preventDefault();
  
//       const author = document.getElementById('author').value;
//       const text = document.getElementById('text').value;
  
//       fetch('/messageboard', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ author, text })
//       })
//       .then(response => {
//         if (response.ok) {
          
//           document.getElementById('messageModal').style.display = 'none';
  
//           window.location.reload();
//         } else {
//           alert('Failed to submit message');
//         }
//       })
//       .catch(error => {
//         console.error('Error:', error);
//         alert('Failed to submit message');
//       });
//     }, {once:true});
//   });

//   document.addEventListener('DOMContentLoaded', () => {

//     document.querySelectorAll('.add-reply-btn').forEach(button => {
//       button.addEventListener('click', (event) => {
//         const messageId = event.target.getAttribute('data-message-id');
//         const replyForm = document.getElementById(`reply-form-${messageId}`);
        

//         if (replyForm.style.display === 'none' || replyForm.style.display === '') {
//           replyForm.style.display = 'block';
//         } else {
//           replyForm.style.display = 'none';
//         }
//       });
//     });
  

//     document.querySelectorAll('.replyForm').forEach(form => {
//       form.addEventListener('submit', (event) => {
//         event.preventDefault();
  
//         const parentId = form.getAttribute('data-parent-id');
//         const replyText = document.getElementById(`reply-text-${parentId}`).value;
  

//         fetch('/add-reply', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             parentId: parentId,
//             text: replyText,
//             author: document.getElementById('author').value,
//           }),
//         })
//         .then(response => {
//           if (response.ok) {

//             window.location.reload();
//           } else {
//             alert('Failed to submit reply');
//           }
//         })
//         .catch(error => {
//           console.error('Error:', error);
//           alert('Failed to submit reply');
//         });
//       });
//     });
//   });

// document.addEventListener('DOMContentLoaded', () => {
//     document.querySelectorAll('.delete-btn').forEach(button => {
//       button.addEventListener('click', (event) => {
//         const messageId = event.target.getAttribute('data-message-id');
//         const messageElement = document.getElementById(`message-${messageId}`);
//         const replies = messageElement.querySelector('.replies');
  
//         const confirmDelete = confirm("Are you sure you want to delete this message?");
//         if (!confirmDelete) return;
  
//         const hasReplies = replies && replies.children.length > 0;
  
//         fetch(`/delete-message/${messageId}`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ hasReplies })
//         })
//         .then(response => response.json())
//         .then(data => {
//           if (data.success) {
//             if (hasReplies) {
//               messageElement.querySelector('strong').textContent = "Deleted";
//               messageElement.querySelector('p').textContent = "This message has been deleted.";
//               event.target.style.display = 'none';
//             } else {
//               messageElement.remove();
//             }
//           } else {
//             alert('Failed to delete the message');
//           }
//         })
//         .catch(error => {
//           console.error('Error:', error);
//           alert('Failed to delete the message');
//         });
//       });
//     });
//   });

// document.getElementById('filterModalButton').addEventListener('click', () => {
//     document.getElementById('filterModal').style.display = 'block';
//     document.getElementById('overlay').style.display = 'block';
// });

// document.getElementById('closeModal').addEventListener('click', () => {
//     document.getElementById('filterModal').style.display = 'none';
//     document.getElementById('overlay').style.display = 'none';
// });

// document.getElementById('applyFilters').addEventListener('click', () => {
//     const formData = new FormData(document.getElementById('filterForm'));
//     const queryParams = new URLSearchParams(formData).toString();
//     window.location.href = `/routes?${queryParams}`;
// });

// document.getElementById('typeDropdownButton').addEventListener('click', () => {
//   const menu = document.getElementById('typeDropdownMenu');
//   menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
// });

// window.addEventListener('click', (event) => {
//   if (!event.target.matches('#typeDropdownButton')) {
//       document.getElementById('typeDropdownMenu').style.display = 'none';
//   }
// });

// document.getElementById('applyFilters').addEventListener('click', () => {
//   const formData = new FormData(document.getElementById('filterForm'));

//   // Collect checked types
//   const checkedTypes = Array.from(document.querySelectorAll('#typeDropdownMenu input:checked'))
//       .map(input => input.value)
//       .join(',');

//   formData.set('types', checkedTypes); // Add types as a single comma-separated value

//   const queryParams = new URLSearchParams(formData).toString();
//   window.location.href = `/routes?${queryParams}`;
// });

// document.getElementById('addRouteModalButton').addEventListener('click', () => {
//   document.getElementById('addRouteModal').style.display = 'block';
//   document.getElementById('overlay').style.display = 'block';
// });

// document.getElementById('closeAddRouteModal').addEventListener('click', () => {
//   document.getElementById('addRouteModal').style.display = 'none';
//   document.getElementById('overlay').style.display = 'none';
// });

// document.getElementById('filterModalButton').addEventListener('click', () => {
//   document.getElementById('filterModal').style.display = 'block';
//   document.getElementById('overlay').style.display = 'block';
// });

// document.getElementById('closeModal').addEventListener('click', () => {
//   document.getElementById('filterModal').style.display = 'none';
//   document.getElementById('overlay').style.display = 'none';
// });

document.addEventListener('DOMContentLoaded', () => {
  // Open and close modals
  document.getElementById('openModalBtn')?.addEventListener('click', () => {
    document.getElementById('messageModal').style.display = 'block';
  });

  document.getElementById('closeModalBtn')?.addEventListener('click', () => {
    document.getElementById('messageModal').style.display = 'none';
  });

  // Submit message form
  const messageForm = document.getElementById('messageForm');
  if (messageForm) {
    messageForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const author = document.getElementById('author').value;
      const text = document.getElementById('text').value;

      fetch('/messageboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, text }),
      })
        .then((response) => {
          if (response.ok) {
            document.getElementById('messageModal').style.display = 'none';
            window.location.reload();
          } else {
            alert('Failed to submit message');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Failed to submit message');
        });
    });
  }

  // Toggle reply forms
  document.querySelectorAll('.add-reply-btn').forEach((button) => {
    button.addEventListener('click', (event) => {
      const messageId = event.target.getAttribute('data-message-id');
      const replyForm = document.getElementById(`reply-form-${messageId}`);
      replyForm.style.display =
        replyForm.style.display === 'block' ? 'none' : 'block';
    });
  });

  // Submit reply forms
  document.querySelectorAll('.replyForm').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const parentId = form.getAttribute('data-parent-id');
      const replyText = document.getElementById(`reply-text-${parentId}`).value;

      fetch('/add-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentId,
          text: replyText,
          author: document.getElementById('author').value,
        }),
      })
        .then((response) => {
          if (response.ok) window.location.reload();
          else alert('Failed to submit reply');
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Failed to submit reply');
        });
    });
  });

  // Delete messages
  document.querySelectorAll('.delete-btn').forEach((button) => {
    button.addEventListener('click', (event) => {
      const messageId = event.target.getAttribute('data-message-id');
      const messageElement = document.getElementById(`message-${messageId}`);
      const replies = messageElement.querySelector('.replies');

      if (!confirm('Are you sure you want to delete this message?')) return;

      const hasReplies = replies && replies.children.length > 0;

      fetch(`/delete-message/${messageId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hasReplies }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            if (hasReplies) {
              messageElement.querySelector('strong').textContent = 'Deleted';
              messageElement.querySelector('p').textContent =
                'This message has been deleted.';
              event.target.style.display = 'none';
            } else {
              messageElement.remove();
            }
          } else {
            alert('Failed to delete the message');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Failed to delete the message');
        });
    });
  });

  // Dropdown filters
  document.getElementById('typeDropdownButton')?.addEventListener('click', () => {
    const menu = document.getElementById('typeDropdownMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  });

  window.addEventListener('click', (event) => {
    if (!event.target.matches('#typeDropdownButton')) {
      document.getElementById('typeDropdownMenu').style.display = 'none';
    }
  });

  // Filter modal
  document.getElementById('filterModalButton')?.addEventListener('click', () => {
    document.getElementById('filterModal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
  });

  document.getElementById('closeModal')?.addEventListener('click', () => {
    document.getElementById('filterModal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  });

  // Apply filters
  document.getElementById('applyFilters')?.addEventListener('click', () => {
    const formData = new FormData(document.getElementById('filterForm'));
    const checkedTypes = Array.from(
      document.querySelectorAll('#typeDropdownMenu input:checked')
    )
      .map((input) => input.value)
      .join(',');

    formData.set('types', checkedTypes);
    const queryParams = new URLSearchParams(formData).toString();
    window.location.href = `/routes?${queryParams}`;
  });

  // Add route modal
  document.getElementById('addRouteModalButton')?.addEventListener('click', () => {
    document.getElementById('addRouteModal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
  });

  document.getElementById('closeAddRouteModal')?.addEventListener('click', () => {
    document.getElementById('addRouteModal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  });
});
