/**
 * Created by fReDDy on 17.04.2016.
 */
document.addEventListener("DOMContentLoaded", function(){
    $(document).ready(function(){
        $(".errorClass").hide();
    });
    $("#addString").click(function() {
        var tr = '<tr>';
        for (var i = 0; i < 3; i++)
            tr = tr + '<td><input style="width:100%" type="text"></td>';
        tr = tr + '<td><select style="width:100%">' +
            '<option selected>System.String</option>' +
            '<option>System.Int32</option>' +
            '<option>System.Boolean</option>' +
            '</select></td>' +
            '<td><input style="width:100%" type="text" name="text"></td>' +
            '<td><button style="width:100%" class="remove_row">delete</button></td>' +
            '</tr>';
        var trObject = $(tr);
        trObject.find('.remove_row').bind('click', removeRow);
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

            $(".errorClass").show("slow");
            $("input[type='checkbox']").each(function(){
                this.style.borderColor == 'red';
            });
        }
        else {
            $(".errorClass").hide("slow");
            $("input[type='checkbox']").each(function(){

                //console.dir(this.style);
            });
        }
    });
    $("input").keyup(function() {
        if (this.name == "text")
        {
            if (this.value.length >10)
            {
                this.style.borderColor='red';

                $(".errorClass").show("slow");
                console.dir(this.style);
            }
            else
            {
                this.style.borderColor='green';
                $(".errorClass").hide("slow");
            }
        }
        if (this.name == "number") {
            checkIntForValidValue(this);
        };
        //console.log(this.value[0]);
        //console.log(this.value[1]);
    });
    function checkIntForValidValue(currentEvent)
    {
        console.log(+currentEvent.value);
        if (currentEvent.value[0] == "-" && currentEvent.value[1] == "0") {
            currentEvent.style.borderColor='red';
            console.log(+currentEvent.value);
            $(".errorClass").show("slow");
            return false;
        }
        //console.log("стала длина: "+this.value.length);
        if (+currentEvent.value <= 256 && +currentEvent.value >= -256 &&
            currentEvent.value.length !=0 && !(+currentEvent.value[0] == 0 && currentEvent.value.length > 1))
        {
            console.log("---"+currentEvent.value[0]);
            currentEvent.style.borderColor='green';
            //console.dir(currentEvent);
            console.log(+currentEvent.value);

            $(".errorClass").hide("slow");
        }
        else if (currentEvent.value.length == 0)
        {

            $(".errorClass").show("slow");
            currentEvent.style.borderColor='red'
            console.log("значение не может быть пустым!");
        }
        else
        {

            $(".errorClass").show("slow");
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
    $(".typeSelection").change(function(){
        if ($("option:selected", this).text() == 'System.Boolean')
        {
            $(this).parent().next()[0].children[0].type='checkbox';
            console.dir( $(this).parent().next());
        }
        else
        {
            var currentInput=$(this).parent().next()[0].children[0];
            console.dir(this);
            if (this.selectedIndex == '0') {
                currentInput.name = 'text';
            }
            else if (this.selectedIndex == '1'){
                currentInput.name = 'number';
            }
            currentInput.type = 'text';
            currentInput.value="";
        }
    });
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