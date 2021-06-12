$(document).ready(() =>{

    var seconds = 0;
    var meters = 0;
    var timer = {};
    var soundspeed = 343;

    var button = $('#start');
    var second = $('#second');
    var meter = $('#meter');
    var result = $('#result');

    var state = {
        started: 'STARTED',
        stopped: 'STOPPED'
    }


    var currentState = state.stopped
    
    button.click(()=> currentState == state.stopped ? start() : stop());
    


   function start(){
       currentState = state.started
       updateButton()

       timer = setInterval(() => {
           seconds += 0.1
           meters = soundspeed*seconds;
           second.text(precision(seconds, 1))
           meter.text(precision(meters, 1))
       }, 100);
       
       console.log(currentState)
   }

   function stop(){
       currentState = state.stopped
       updateButton()
       clearInterval(timer);
       updateResult();
       console.log(currentState)
   }

   function updateButton(){
       if(button.hasClass("btn-primary")) button.removeClass("btn-primary")

       if(currentState == state.stopped){
            button.text("BAŞLAT")
            button.removeClass("btn-danger");
            button.addClass("btn-success");
        }else{
            button.text("DURDUR")
            button.addClass("btn-danger");
            button.removeClass("btn-success");
        } 
   }

   function updateResult(){
        var time = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
        var html = `<li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">${precision(meters, 1)} meters</div>
                            ${precision(seconds, 1)} seconds
                            </div>
                        <span class="badge bg-primary rounded-pill">${time}</span>
                    </li>`
                   
       result.append(html)
       meters = 0; seconds = 0;
       second.text(seconds);
       meter.text(meters);
   }

   function precision(number, count){
        console.log(number);

        var numberToString = number.toString();

        var splitted = numberToString.split('.');

        if(splitted.length !=2) return number;

        let leftSide = splitted[0];
        let rightSide = splitted[1];

        rightSide = rightSide.substring(0, count)
        rightSide = rightSide + (rightSide.length < count ? rightSide.padEnd(count, "0") : "") 
       
        numberToString = leftSide + "." + rightSide;

        console.log(numberToString);

        return numberToString
   } 
})