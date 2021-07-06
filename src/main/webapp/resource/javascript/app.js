function deleteCustomer(customerId,button){
    let a = button;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "DELETE",
                url: `/customers/${customerId}`,
                success: function (data) {
                    a.closest ('tr').remove ();
                    swal.fire({
                        title: "Deleted!",
                        text: "You clicked the button!",
                        icon: "success",
                        button: "Aww yiss!",
                    });
                }
            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
            )
        }
    })
    event.preventDefault();
}
function loadEditData(id){

    $.ajax({
        type: 'GET',
        url: '/customers/api/' + id,
        success: function (customer) {
            $('#exampleModalLabelSpan').text("Edit");
            $('#upId').val(customer.id);
            $('#name').val(customer.name);
            $('#email').val(customer.email);
            $('#phone').val(customer.phone);
            $('#province').val(customer.province.id).change();
        }
    })
}
function editCustomer() {
    let id = $('#upId').val();
    let name = $('#name').val();
    let email = $('#email').val();
    let phone = $('#phone').val();
    let province = {"id": $('#province').val()};

    let newCustomer = {
        name: name,
        email: email,
        phone: phone,
        province: province
    }
    console.log(newCustomer);
    if (id==0){
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(newCustomer),
            url: "/customers",
            success: function (customer) {
                $('#customerList tbody').prepend(' <tr id="row'+ customer.id+'">\n' +
                    '      <td>' + customer.id + '</td>\n' +
                    '      <td>' + customer.name + '</td>\n' +
                    '      <td>' + customer.email + '</td>\n' +
                    '      <td>' + customer.phone + '</td>\n' +
                    '      <td>' + customer.province.name + '</td>\n' +
                    '      <td><button onclick="loadEditData('+ customer.id+',this)" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"  class="btn btn-secondary" ><a><i class="fas fa-edit">Edit</i></a></button>' +
                    '<input type="hidden" id="id" value="' + customer.id + '"></td>\n' +

                    ' <td><button class="btn btn-secondary" onclick="deleteCustomer('+ customer.id+',this)">' +
                    '<i class="fas fa-trash-alt"></i>Delete </button> </td>' +
                    ' </tr>');
                $('.close-modal').click();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });
    }else{
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(newCustomer),
            url: '/customers/edit/' + id,

            success: function (customer) {
                console.log(customer);
                $('#row' + id + ' td').remove();
                $('#row' + id).html(`
                        <td>${customer.id}</td>
                        <td>${customer.name}</td>
                        <td>${customer.email}</td>
                        <td>${customer.phone}</td>
                        <td>${customer.province.name}</td>
                       <td><button onclick="loadEditData('${customer.id}')"  data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"  class="updateCustomer btn btn-secondary" href="' + customer.id + '"><a><i class="fas fa-edit">Edit</i></a></button><input type="hidden" id="id" value="' + customer.id + '"></td>
                      <td><button class="btn btn-secondary" onclick="deleteCustomer('${customer.id}',this)"   ><i
                    class="fas fa-trash-alt"></i>Delete</button></td>`);

                $('.close-modal').click();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'You have changed successfull',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });
    }

}
function loadAddnew(){
    $('#exampleModalLabelSpan').text("Add new");
    $('#upId').val(0);
    $('#upName').val("");
    $('#upEmail').val("");
    $('#upPhone').val("");
    $('#upProvince').val("");
}

