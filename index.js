$(() => {
    $(".panel").click(() => {
        const root = $("#root");

        if (root.hasClass("shift-right")) {
            root.removeClass("shift-right");
            root.addClass("shift-left");
        } else {
            root.addClass("shift-right");
            
            if (root.hasClass("shift-left"))
                root.removeClass("shift-left");
        }
        
    });
});
