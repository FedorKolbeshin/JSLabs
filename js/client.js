/**
 * Created by fReDDy on 17.04.2016.
 */
document.addEventListener("DOMContentLoaded", function(){
    $(document).ready(function(){
        console.dir($("input")[0].style);
        $(".stringError")[0].hidden=true;
        console.dir($(".stringError"));
        $(".intError")[0].hidden=true;
        $(".boolError")[0].hidden=true;
    });
    $("#addString").click(function() {
        var tr = '<tr>';
        for (var i = 0; i < 3; i++)
            tr = tr + '<td><input style="width:100%" type="text" value="newString"></td>';
        tr = tr + '<td><select style="width:100%" class="typeSelection">' +
            '<option selected>System.String</option>' +
            '<option>System.Int32</option>' +
            '<option>System.Boolean</option>' +
            '</select></td>' +
            '<td><input class="value_Class" style="width:100%" type="text" name="text" value="text"></td>' +
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
        [].forEach.call($("input[type='checkbox']"),function(item){
            if (item.checked)
            {
                trueCount++;
            }
        });
        if (trueCount == 0)
        {
            $(".boolError").show("slow");
            $(".boolError")[0].accessKey="visible";
        }
        else {
            $(".boolError").hide("slow");
            $(".boolError")[0].accessKey="hidden";
        }

    });
    $(".value_Class").keyup(KeyUpHandling);
    function KeyUpHandling() {
        var bool=KeyUpFunction(this);
        if (bool) return true;
        else return false;
    }
    function KeyUpFunction (currentEvent)
    {
        if (currentEvent.name == "text") {
            if (currentEvent.value.length > 10) {
                currentEvent.style.borderColor = 'red';
                $(".stringError").show("slow");
                $(".stringError")[0].accessKey="visible";
                return false;
            }
            else {
                currentEvent.style.borderColor = 'green';
                $(".stringError").hide("slow");
                $(".stringError")[0].accessKey="hidden";
                return true;
            }
        }
        if (currentEvent.name == "number") {
            var bool = checkIntForValidValue(currentEvent);
            if (bool) return true;
            else return false;
        }
    }
    function checkIntForValidValue(currentEvent)
    {
        if (currentEvent.value[0] == "-" && currentEvent.value[1] == "0") {
            currentEvent.style.borderColor='red';
            $(".intError").show("slow");
            $(".intError")[0].accessKey="visible";
            return false;
        }
        //console.log("стала длина: "+this.value.length);
        if (+currentEvent.value <= 256 && +currentEvent.value >= -256 &&
            currentEvent.value.length !=0 && !(+currentEvent.value[0] == 0 && currentEvent.value.length > 1))
        {
            currentEvent.style.borderColor='green';
            $(".intError").hide("slow");
            $(".intError")[0].accessKey="hidden";
            return true;
        }
        else if (currentEvent.value.length == 0)
        {
            $(".intError").show("slow");
            $(".intError")[0].accessKey="visible";
            currentEvent.style.borderColor='red'
            return false;
        }
        else
        {
            $(".intError").show("slow");
            $(".intError")[0].accessKey="visible";
            currentEvent.style.borderColor='red';
            return false;
        }
    }
    $("#saveData").click(function(){
        console.log("--------------------------------------------");
       var result=[],
           rows=$("#main_table tr"),
           bool=true;
        [].forEach.call($("div[type='errorDiv']"),function(item){
           if (item.accessKey == "visible")
           {

               bool=false;
           }
        });
        if (bool) {
            [].forEach.call(rows, function (item, index) {
                if (index != 0) {
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
                    type: "POST",
                    url: "/saveXML",
                    data: JSON.stringify(result),
                    success: function (response) {
                        alert(response);
                    }
                }
            )
        }
        else alert("неправильные данные!!!");


    });
    $(".typeSelection").change(changeSelectHandler);
    function changeSelectHandler() {
        if ($("option:selected", this).text() == 'System.Boolean') {
           $(".boolError").hide();
            $(this).parent().next()[0].children[0].type = 'checkbox';
        }
        else {
            var currentInput = $(this).parent().next()[0].children[0];
            if (this.selectedIndex == '0') {
                currentInput.name = 'text';
            }
            else if (this.selectedIndex == '1') {
                currentInput.name = 'number';
            }
            currentInput.type = 'text';
            currentInput.value = "";
            checkIntForValidValue(currentInput);
        }
    }
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