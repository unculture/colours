var getAnimation = function(duration) {
    var rules = ["animation", "-moz-animation", "-webkit-animation", "-o-animation"];
    var output = "body { ";
    var i;
    for (i = 0; i < rules.length; i++) {
        output += rules[i] + ": pulse " + duration + "s infinite alternate; ";
    }
    output += "}";
    return output;
};

var getKeyFrames = function(keyframes) {
    var rules = ["@keyframes", "@-moz-keyframes", "@-webkit-keyframes", "@-o-keyframes"];
    var output = "";
    var i;
    for (i = 0; i < rules.length; i++) {
        output += rules[i] + " pulse {";
        var j;
        for (j = 0; j < keyframes.length; j++) {
            output += keyframes[j][0] + " {" + "background-color:#" + keyframes[j][1] + ";} "; 
        }
        output += "}";
    }
    return output;
};

var colourFormRow = '<div class="form-group js-pickers-color pickers-form-group"> ' +
    '<label class="control-label">Choose colour</label> ' +
    '<input type="text" name="color" value="" class="form-control pickers-input-element" /> ' +
    '<button class="js-pickers-remove-color btn btn-danger">Remove color</button>' +
    '</div>';
$(function() {
    var style = $("<style id=\"pickers-styles\">" + getKeyFrames([["0%", "#df3ec6"], ["100%", "#324ffd"]]) + "</style>");
    $('head').append(style);

    $('.pickers').draggable({
        addClasses: false,
        handle: ".js-pickers-heading"
    });

    $(".js-pickers-add-picker").click(function(event) {
        var newRow = $(colourFormRow);
        $('.js-pickers-buttons').before(newRow);
        var input = newRow.find("input");
        input.pickAColor();
        event.preventDefault();
    });

    $("form").on("click", function(event) {
        var target = $(event.target);
        if (target.hasClass("js-pickers-remove-color")) {
            $(target).closest(".form-group").remove();
            event.preventDefault();
        }
    });

    $(".js-pickers-set-animations").click(function(event) {
        event.preventDefault();
        var duration = $('.js-pickers-duration').val();
        var colors = $('.js-pickers-color input');
        var styles = $('#pickers-styles').first();
        var keyframes = [];
        var i;
        for (i = 0; i < colors.length; i++) {
            var percentage;
            if (i === 0) {
                percentage = 0;
            } else {
                percentage = i / (colors.length - 1) * 100;
            }
            keyframes.push([percentage + "%", $(colors[i]).val()]);
        }
        styles.html(getAnimation(duration) + " " + getKeyFrames(keyframes));
    });

});


