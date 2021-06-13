$(document).ready(() =>{

    var tutorial = 0;
    var seconds = 0;
    var meters = 0;
    var timer = {};
    var results = [];
    var soundspeed = 343;

    var button = $('#start');
    var second = $('#second');
    var meter = $('#meter');
    var result = $('#result');
    var result_sorted = $('#result-sorted');
    $('.collapseSelector').click(() => { tutorial = 2} );
    
    var state = {
        started: 'STARTED',
        stopped: 'STOPPED'
    }

    var currentState = state.stopped
    
    button.click(()=> currentState == state.stopped ? start() : stop());

   function start(){
       currentState = state.started
       updateButton()
       resetLabel()

       timer = setInterval(() => {
           seconds += 0.1
           meters = soundspeed*seconds;
           second.text(precision(seconds, 1))
           meter.text(precision(meters, 1))
       }, 100);
   }

   function stop(){
       currentState = state.stopped
       updateButton();
       clearInterval(timer);
       updateResult();

       showTutorial();
   }

   function showTutorial(){
    if(tutorial < 2){
        setTimeout(() => { 
            $('#resultCollapse').collapse('toggle'); 
            $('#resultSortedCollapse').collapse('toggle'); 
        }, 700);
        
        setTimeout(() => { 
            $('#resultCollapse').collapse('toggle'); 
            $('#resultSortedCollapse').collapse('toggle'); 
        }, 1150);
    }else{
        tutorial = 2
    }

    tutorial += 1;

   }

   function updateButton(){
       if(button.hasClass("btn-primary")) button.removeClass("btn-primary")

       if(currentState == state.stopped){
            button.text("START")
            button.removeClass("btn-danger");
            button.addClass("btn-outline-success");
        }else{
            button.text("STOP")
            button.addClass("btn-danger");
            button.removeClass("btn-outline-success");
        } 
   }

   function resetLabel() {
    meters = 0; seconds = 0.0;
    second.text(seconds);
    meter.text(meters);   
   }

   function updateResult(){
        
        results.push({seconds: precision(seconds, 1), meters: precision(meters, 1), time: getTime(), id: results.length});

        result_sorted.html(``)
        result.html(``)

        var temp_sorted = results.slice();
        temp_sorted.sort((a, b) => { return b.meters - a.meters})
        var winner = temp_sorted[0];

        results.forEach(element => {
            var html = `<li class="list-group-item d-flex justify-content-between align-items-start${winner.id==element.id ? " list-group-item-warning": ""}">
            <div class="ms-2 me-auto">
            <div class="fw-bold">${element.meters} meters</div>
            ${element.seconds} seconds
            </div>
            <span class="badge bg-primary rounded-pill">${element.time}</span>
            </li>`
            result.prepend(html)
        })
        
        temp_sorted.forEach(element => {
            
            var html = `<li class="list-group-item d-flex justify-content-between align-items-start${winner.id==element.id ? " list-group-item-warning": ""}">
            <div class="ms-2 me-auto">
            <div class="fw-bold">${element.meters} meters</div>
            ${element.seconds} seconds
            </div>
            <span class="badge bg-primary rounded-pill">${element.time}</span>
            </li>`
            result_sorted.append(html)
        });
                   
   }

   function precision(number, count){
        var numberToString = number.toString();

        var splitted = numberToString.split('.');

        if(splitted.length !=2) return number;

        let leftSide = splitted[0];
        let rightSide = splitted[1];

        rightSide = rightSide.substring(0, count)
        rightSide = rightSide + (rightSide.length < count ? rightSide.padEnd(count, "0") : "") 
       
        numberToString = leftSide + "." + rightSide;

        return numberToString
   } 

    function getTime() {
        var date = new Date();
        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return `${hours}:${minutes}:${seconds}`
    }
})