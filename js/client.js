/**
 * Created by fReDDy on 17.04.2016.
 */
document.addEventListener("DOMContentLoaded", function(){
    var mode;
    $(document).ready(function(){
        $(".stringError")[0].hidden=true;
        $(".intError")[0].hidden=true;
        $(".boolError")[0].hidden=true;
        $(".emptyError")[0].hidden=true;
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
        trObject.find('.value_Class').bind('keydown', KeyDownHandling);
        trObject.find('.value_Class').bind('keyup', KeyUpHandling);
        $("#main_table").last().append(trObject);

    });
    $(".remove_row").click(function(){
        removeRow();
    });
    $(".value_Class").keydown(KeyDownHandling);
    function KeyDownHandling() {
        if (this.name == "number") {
            if (+event.keyCode == 17) {
                mode = "ctrl";

            };
            if (+event.keyCode == 16 )
            {
                mode="shift";
                return false;
            }
            if (+event.keyCode == 189)
            {
                if(this.value.length == 0)
                    return true;
                else return false;
            }
            if (+event.keyCode == 8)
            {
                return true;
            }
            if (+event.keyCode >= 48 && +event.keyCode <= 57  || +event.keyCode == 189)  {
                if (mode == "shift")
                {
                    return false;
                }
                else
                {
                    if (this.value == '0')
                    {
                        return false;
                    }
                    if (+event.keyCode == 48) {
                        if (this.value.length == 1 && this.value[0] == '0' || this.value[0] == '-' && this.value.length == 1 )
                            return false;
                    }
                    if (this.style.borderColor == "red") {
                        if (this.value.length == 0) {
                            $(".emptyError").hide("slow");
                            $(".intError").hide("slow");
                            this.style.borderColor = null;
                        }

                    }
                    return true;
                };
            }
            else {
                if (+event.keyCode == 86 && mode == "ctrl") {
                    return true;
                }
                ctrlKey = false;
                return false;
            }
        }
        else return true;
    };
    $(".value_Class").keyup(function(event){
        KeyUpHandling(event,this);
    });
    function KeyUpHandling(event,obj)
    {
        if (mode == "ctrl")
        {
            if (isNaN(+this.value) || obj.value[0] =='0')
            {
                $(".intError").show("slow");
                obj.style.borderColor="red";
            }
            else
            {
                obj.style.borderColor=null;
                $(".intError").hide("slow");
            }
            mode="none";
        }
        if (+event.keyCode == 16)
        {
            mode="none";
        }
        //if (this.value[0] == "-" && this.value[1] == "0") {
        //    this.value[1] = "";
        //}
    }
    $("#saveData").click(function(){
       var result=[],
           rows=$("#main_table tr"),
           bool=true,
           onechecked=false;
        [].forEach.call($("input.value_Class"),function(item){
            if (item.name == "text")
            {
                if (item.value.length > 10)
                {
                    bool=false;
                    item.style.borderColor="red";
                    $(".stringError").show("slow");
                }
            }
            if (item.name == "number")
            {

                if (+item.value<-256 || +item.value >256 || isNaN(+item.value)
                    || item.value[0] == '0' && item.value.length > 1 )
                {
                    bool=false;
                    item.style.borderColor="red";
                    $(".intError").show("slow");
                }
            }
            if (item.value == "")
            {
                item.style.borderColor="red";
                $(".emptyError").show("slow");
                bool=false;
            }

        });
        [].forEach.call($('input[type="checkbox"]'),function(item){
            if (item.checked)
                onechecked=true;
        });
        if (!onechecked)
        {
            $(".boolError").show("slow");
            return;

        }
        if (bool && onechecked) {
            clearValueInput();
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
                        console.dir($("savedata"));

                        console.log(response);
                    }
                }
            )
        }
    });
    function clearValueInput() {
        [].forEach.call($("input.value_Class"), function (item) {
            item.style.borderColor = "";
        });
        $(".stringError").hide("slow");
        $(".intError").hide("slow");
        $(".boolError").hide("slow");
    };
    $(".typeSelection").change(changeSelectHandler);
    function changeSelectHandler() {
        if ($("option:selected", this).text() == 'System.Boolean') {
            $(this).parent().next()[0].children[0].type = 'checkbox';
            $(this).parent().next()[0].children[0].name="";
        }
        else {
            if (this.selectedIndex == '0') {
                $(this).parent().next()[0].children[0].name = 'text';
                $(this).parent().next()[0].children[0].defaultValue="text";
            }
            else if (this.selectedIndex == '1') {
                $(this).parent().next()[0].children[0].name = 'number';
                $(this).parent().next()[0].children[0].defaultValue='0';
            }
            $(this).parent().next()[0].children[0].type = 'text';
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