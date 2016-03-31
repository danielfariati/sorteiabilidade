(function() {
    Array.prototype.shuffle = function(){
        var counter = this.length, temp, index;
        while (counter > 0) {
            index = (Math.random() * counter--) | 0;
            temp = this[counter];
            this[counter] = this[index];
            this[index] = temp;
        }
        return this;
    };

    var users = [
            { name: 'Passarinho 1', avatarUrl: 'https://api.adorable.io/avatars/128/1.png' },
            { name: 'Passarinho 2', avatarUrl: 'https://api.adorable.io/avatars/128/2.png' },
            { name: 'Passarinho 3', avatarUrl: 'https://api.adorable.io/avatars/128/3.png' },
            { name: 'Passarinho 4', avatarUrl: 'https://api.adorable.io/avatars/128/4.png' },
            { name: 'Passarinho 5', avatarUrl: 'https://api.adorable.io/avatars/128/5.png' },
            { name: 'Passarinho 6', avatarUrl: 'https://api.adorable.io/avatars/128/6.png' },
            { name: 'Passarinho 7', avatarUrl: 'https://api.adorable.io/avatars/128/7.png' },
            { name: 'Passarinho 8', avatarUrl: 'https://api.adorable.io/avatars/128/8.png' },
            { name: 'Passarinho 9', avatarUrl: 'https://api.adorable.io/avatars/128/9.png' },
            { name: 'Passarinho 10', avatarUrl: 'https://api.adorable.io/avatars/128/10.png' }
        ],
        durationTimeInMilliseconds = 10000,
        numberOfSpins =  30,
        $rollBtn = $('#roll'),
        $loadout = $('#loadout'),
        $resultWrapper = $('#result-wrapper'),
        $result = $('#result'),
        $audio = $('#shuffle-audio');

    $resultWrapper.hide();

    function bindRoll() {
        $rollBtn.on('click', function() {
            roll();
        });
    }

    function roll() {
        $resultWrapper.hide();
        $rollBtn.attr('disabled', true);
        $loadout.empty().css('left', '100%');
        $result.empty();
        $audio.trigger('play');

        addUsersToLoadout();
        animateWheel();
    }

    function addUsersToLoadout() {
        for(var i = 0; i < numberOfSpins; i++) {
            var shuffledUsers = users.slice(0).shuffle();
            for(var y = 0; y < shuffledUsers.length; y++){
                $loadout.append(
                    '<td>' +
                    '<div class="roller">' +
                    '<div class="roller-data">' +
                    '<img src="' + shuffledUsers[y].avatarUrl + '">' +
                    '<div>' + shuffledUsers[y].name + '</div>' +
                    '</div>' +
                    '</div>' +
                    '</td>'
                );
            }
        }
    }

    function animateWheel() {
        var diff = users.length * numberOfSpins * 96;
        diff = randomBetween(diff - 300,diff + 300);

        $( "#loadout" ).animate({
            left: "-=" + diff
        },  durationTimeInMilliseconds, function() {
            $("#roll").attr("disabled",false);
            $('#loadout').children('td').each(function () {
                var center = window.innerWidth / 2;
                if($(this).offset().left < center && $(this).offset().left + 185 > center){
                    var winnerName = $(this).children().text();
                    $resultWrapper.show();
                    $result.text(winnerName);
                    $audio.animate({volume: 0}, 1000);
                }
            });
        });
    }

    function randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    bindRoll();
})();
