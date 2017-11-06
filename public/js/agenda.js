var events = [
    {
        title: 'Business Lunch',
        start: '2017-11-03T13:00:00',
        constraint: 'businessHours'
    },
    {
        title: 'Meeting',
        start: '2017-11-13T11:00:00',
        constraint: 'availableForMeeting', // defined below
        color: '#257e4a'
    },
    {
        title: 'Conference',
        start: '2017-11-18',
        end: '2017-11-20'
    },
    {
        title: 'Party',
        start: '2017-11-29T20:00:00'
    },

    // areas where "Meeting" must be dropped
    {
        id: 'availableForMeeting',
        start: '2017-10-11T10:00:00',
        end: '2017-10-11T16:00:00',
        rendering: 'background'
    },
    {
        id: 'availableForMeeting',
        start: '2017-11-13T10:00:00',
        end: '2017-11-13T16:00:00',
        rendering: 'background'
    },

    // red areas where no events can be dropped
    {
        start: '2017-11-24',
        end: '2017-11-28',
        overlap: false,
        rendering: 'background',
        color: '#ff9f89'
    },
    {
        start: '2017-11-06',
        end: '2017-11-08',
        overlap: false,
        rendering: 'background',
        color: '#ff9f89'
    }
]

function initAgenda() {
    if (getAgenda() == undefined) {
        localStorage.setItem("agenda", JSON.stringify(events));
    }
}

function getAgenda() {
    var agenda = localStorage.getItem("agenda");
    // check for undefined notes
    if (agenda != undefined) 
        return JSON.parse(agenda);
}

function populateAgenda() {
    var agenda = getAgenda();
    document.getElementById("agenda").innerHTML = "";

    for(const event in agenda) {
        // only add events with titles to today's agenda. 
        // todo: find a better way to handle
        if (agenda[event]["title"] != undefined) {
            var div = document.createElement("div");
            div.className = "event";
            div.value = event;

            // title of the event
            var title = document.createElement("div");
            title.className = 'agenda-title';
            title.innerHTML = agenda[event]["title"];
            div.appendChild(title);

            var date = new Date(agenda[event]["start"]);

            // date
            var cal_date = document.createElement("div");
            cal_date.className = "agenda-date";
            cal_date.innerHTML = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
            div.appendChild(cal_date);

            // time
            var time = document.createElement("div");
            time.className = "agenda-time";
            time.innerHTML = date.getHours() +  ":" + (date.getMinutes().length > 1 ? date.getMinutes() : '0' + date.getMinutes());
            div.appendChild(time);

            // dialog box functionality
            var dialog = $( "#dialog" ).dialog({
                dialogClass: "agendaPopup",
                autoOpen: false,
                height: 400,
                width: 350,
                modal: true,
                buttons: {
                    Ok:{
                        text: "Ok",
                        class: "btn btn-primary btn-rounded waves-effect waves-light text-center",
                        click: function() {
                            dialog.dialog( "close" );
                        }
                    }
                }
            });
            div.onclick = function() {
                document.getElementById('dialog-title').innerHTML = this.getElementsByClassName('agenda-title')[0].innerHTML;
                document.getElementById('dialog-date').value = this.getElementsByClassName('agenda-date')[0].innerHTML;
                document.getElementById('dialog-time').value = this.getElementsByClassName('agenda-time')[0].innerHTML;
                dialog.dialog( "open" );
            };
            document.getElementById("agenda").appendChild(div);
        }
    }
}

$(document).ready(function(){
    initAgenda();
    populateAgenda();
});