function updatePremium(userId, premium) {
    fetch(`/api/users/premium/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        premium: premium,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('El campo `premium` del usuario se ha actualizado correctamente.');
      })
      .catch((error) => {
        alert('Error al actualizar el campo `premium` del usuario.');
      });
  }
  
  document.getElementById('tablePremium').addEventListener('change', function (event) {
    let userId = event.target.getAttribute('data-user-id');
    let premium = event.target.value;
  
    updatePremium(userId, premium);
  });
  
  function delteUserById(userId) {
    fetch(`/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const deleteButton = document.querySelector(`#deleteButton[data-userid="${userId}"]`);
        if (deleteButton) {
          deleteButton.parentElement.parentElement.remove();
          alert('El usuario se ha eliminado correctamente.');
        }
      })
      .catch((error) => {
        alert('Error al eliminar el usuario.');
      });
  }
  
  const deleteButton = document.getElementById('deleteButton');
  deleteButton.addEventListener('click', () => {
    const userId = deleteButton.getAttribute('data-userid');
    delteUserById(userId);
  });