/**
 * Created by fReDDy on 17.04.2016.
 */
document.addEventListener("DOMContentLoaded", function(){
    $(document).ready(function(){
        $(".stringError").hide();
        $(".intError").hide();
        $(".boolError").hide();
    });
    $("#addString").click(function() {
        var tr = '<tr>';
        for (var i = 0; i < 3; i++)
            tr = tr + '<td><input style="width:100%" type="text"></td>';
        tr = tr + '<td><select style="width:100%" class="typeSelection">' +
            '<option selected>System.String</option>' +
            '<option>System.Int32</option>' +
            '<option>System.Boolean</option>' +
            '</select></td>' +
            '<td><input class="value_Class" style="width:100%" type="text" name="text"></td>' +
            '<td><button style="width:100%" class="remove_row">delete</button></td>' +
            '</tr>';
        var trObject = $(tr);

        trObject.find('.typeSelection').bind('change', changeSelectHandler);
        trObject.find('.remove_row').bind('click', removeRow);
        trObject.find('.value_Class').bind('keyup', KeyUpHandling);
        $("#main_table").last().append(trObject);
    });
    $(".remove_row").click(function(){
        removeRow();
    });
    $("input[type='checkbox']").click(function(){
        var trueCount=0;
        $("input[type='checkbox']").each(function(){
            if (this.checked)
            {
                trueCount++;
            }
        });
        if (trueCount == 0)
        {

            $(".boolError").show("slow");
        }
        else $(".boolError").hide("slow");

    });
    $(".value_Class").keyup(KeyUpHandling);
    function KeyUpHandling() {
        if (this.name == "text") {
            if (this.value.length > 10) {
                this.style.borderColor = 'red';
                $(".stringError").show("slow");
            }
            else {
                this.style.borderColor = 'green';
                $(".stringError").hide("slow");
            }
        }
        if (this.name == "number") {
            checkIntForValidValue(this);
        }
    }
    function checkIntForValidValue(currentEvent)
    {
        console.log(+currentEvent.value);
        if (currentEvent.value[0] == "-" && currentEvent.value[1] == "0") {
            currentEvent.style.borderColor='red';
            console.log(+currentEvent.value);
            $(".intError").show("slow");
            return false;
        }
        //console.log("стала длина: "+this.value.length);
        if (+currentEvent.value <= 256 && +currentEvent.value >= -256 &&
            currentEvent.value.length !=0 && !(+currentEvent.value[0] == 0 && currentEvent.value.length > 1))
        {
            currentEvent.style.borderColor='green';
            $(".intError").hide("slow");
        }
        else if (currentEvent.value.length == 0)
        {

            $(".intError").show("slow");
            currentEvent.style.borderColor='red'
        }
        else
        {

            $(".intError").show("slow");
            currentEvent.style.borderColor='red';
        }
    }
    $("#saveData").click(function(){
        console.log("--------------------------------------------");
       var result=[],
           rows=$("#main_table tr");
        [].forEach.call(rows,function(item,index) {
            if (index !=0) {
                var itemElements = item.children,
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
            }

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
    $(".typeSelection").change(changeSelectHandler);
    function changeSelectHandler() {
        if ($("option:selected", this).text() == 'System.Boolean') {
            $(this).parent().next()[0].children[0].type = 'checkbox';
            console.dir($(this).parent().next());
        }
        else {
            var currentInput = $(this).parent().next()[0].children[0];
            console.dir(this);
            if (this.selectedIndex == '0') {
                currentInput.name = 'text';
            }
            else if (this.selectedIndex == '1') {
                currentInput.name = 'number';
            }
            currentInput.type = 'text';
            currentInput.value = "";
        }
    }
    function getSelectionValue(selectValue)
    {
        console.dir(selectValue);
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