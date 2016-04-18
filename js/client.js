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
    });
    $("#saveData").click(function(){
        console.log("--------------------------------------------");
       var result=[],
           rows=$("#main_table tr");
        [].forEach.call(rows,function(item,index) {
            var itemElements =item.children,
                itemValue = itemElements[4].firstElementChild,
                selectType = getSelectionValue(itemElements[3].firstElementChild),
                selectValue = selectType == "System.Boolean" ? itemValue.checked : itemValue.value;
            result.push({
             Id: itemElements[0].firstElementChild.value,
             Name: itemElements[1].firstElementChild.value,
             Description: itemElements[2].firstElementChild.value,
             Type: selectType,
             Value: selectValue
             });

        });
        $.ajax({
            type:"POST",
            url:"/saveXML",
            data:JSON.stringify(result),
            success:function(response)
            {
                alert(response);
            }}
        )


    });
    function getSelectionValue(selectValue)
    {
        var options=selectValue.children;
        for (var i=0;i<options.length;i++)
        {
            if (options[i].selected)
            {
                return options[i].innerHTML;
            }

        }
    }
    function removeRow() {
        $(event.target).parent().parent().remove();
    };
});