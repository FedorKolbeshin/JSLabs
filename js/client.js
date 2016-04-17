/**
 * Created by fReDDy on 17.04.2016.
 */
document.addEventListener("DOMContentLoaded", function(){
    $("#addString").click(function() {
        var tr = '<tr>';
        for (var i = 0; i < 3; i++)
            tr = tr + '<td><input style="width:100%" type="text"></td>';
        tr = tr + '<td><select style="width:100%">' +
            '<option selected>System.String</option>' +
            '<option>System.Int32</option>' +
            '<option>System.Boolean</option>' +
            '</select></td>' +
            '<td><input style="width:100%" type="text"></td>' +
            '<td><button style="width:100%" class="remove_row">delete</button></td>' +
            '</tr>';
        var trObject = $(tr);
        trObject.find('.remove_row').bind('click', removeRow);
        $("#main_table").last().append(trObject);
    });
    $(".remove_row").click(function(){
        removeRow();
    })
    function removeRow() {
        $(event.target).parent().parent().remove();
    };
});