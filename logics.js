$(function() {
  loadProducts();
  $('#Append').on('click', '.btn-danger', deleteData);
  $('#Append').on('click', '.btn-warning', updateData);
  $('#addBtn').click(addData);
});

function addData() {
  console.log('Add check');
  const name = $('#name').val();
  const price = $('#price').val();
  if(name === "" || price === ""){
    alert("Please fill all fields!!");
  }
  else{
    $.ajax({
      url: 'https://usman-fake-api.herokuapp.com/api/products',
      method: 'POST',
      data: { name, price },
      success: function() {
        alert('Added Successfully!');
        loadProducts();
      },
    });
  }
}
  
function loadProducts() {
  $.ajax(
    {
      url: 'https://usman-fake-api.herokuapp.com/api/products',
      method: 'GET',
      success(response) {
        const a = $('#Append');
        a.empty();
        const data = response;
        for (let i = 0; i < data.length; i++) {
          $('#Append').append(`<div class="Product" data-id="${data[i]._id}"><h3>Name: ${data[i].name}<p>Price: $${data[i].price}</p><button class="update btn-warning btn-sm">Update</button><button class="delete btn-danger btn-sm">Delete</button></h3></div>`);
        }
      },
    },
  );
}

function deleteData() {
  const btn = $(this);
  const parentDiv = btn.closest('.Product');
  const id = parentDiv.attr('data-id');
  console.log(id);
  console.log('Deleting data');
  $.ajax({
    url: `https://usman-fake-api.herokuapp.com/api/products/${id}`,
    method: 'DELETE',
    success() {
      alert('Successfully deleted');
      loadProducts();
    },
  });
}

function updateData() {
  const btn = $(this);
  const parentDiv = btn.closest('.Product');
  const id = parentDiv.attr('data-id');
  const name = prompt('Please enter name of the product: ');
  const price = prompt('Please enter price of the product: ');
  console.log('Checking if it is working');
  $.ajax({
    url: `https://usman-fake-api.herokuapp.com/api/products/${id}`,
    method: 'PUT',
    data: { name, price },
    success(res) {
      alert('Updated Successfully!');
      loadProducts();
    },
  });
}
