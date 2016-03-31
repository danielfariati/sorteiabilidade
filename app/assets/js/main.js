(function () {
    Array.prototype.shuffle = function () {
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
            {name: 'Passarinho 1', avatarUrl: 'https://api.adorable.io/avatars/128/1.png'},
            {name: 'Passarinho 2', avatarUrl: 'https://api.adorable.io/avatars/128/2.png'},
            {name: 'Passarinho 3', avatarUrl: 'https://api.adorable.io/avatars/128/3.png'},
            {name: 'Passarinho 4', avatarUrl: 'https://api.adorable.io/avatars/128/4.png'},
            {name: 'Passarinho 5', avatarUrl: 'https://api.adorable.io/avatars/128/5.png'},
            {name: 'Passarinho 6', avatarUrl: 'https://api.adorable.io/avatars/128/6.png'},
            {name: 'Passarinho 7', avatarUrl: 'https://api.adorable.io/avatars/128/7.png'},
            {name: 'Passarinho 8', avatarUrl: 'https://api.adorable.io/avatars/128/8.png'},
            {name: 'Passarinho 9', avatarUrl: 'https://api.adorable.io/avatars/128/9.png'},
            {name: 'Passarinho 10', avatarUrl: 'https://api.adorable.io/avatars/128/10.png'}
        ],
        durationTimeInMilliseconds = 10000,
        numberOfSpins = Math.max(2, 300 / users.length),
        $rollBtn = $('#roll-btn'),
        $loadout = $('#loadout'),
        $audio = $('#shuffle-audio');

    function bindRoll() {
        $rollBtn.on('click', function () {
            roll();
        });
    }

    function roll() {
        initCarousel();

        $loadout.trigger('to.owl.carousel', [0, 0, true]);
        $rollBtn.attr('disabled', true);
        $audio.prop('volume', 1).trigger('play');
        $loadout.trigger('to.owl.carousel', [randomBetween(((numberOfSpins - 1) * users.length) - 1, (numberOfSpins * users.length) - 1), durationTimeInMilliseconds / 5, true]);
        setTimeout(function () {
            $audio.animate({volume: 0}, 1000, function () {
                $(this).trigger('pause').prop('currentTime', 0);
            });
            $rollBtn.removeAttr('disabled');
        }, durationTimeInMilliseconds + 2000);
    }

    function randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function addUsersToLoadout() {
        var shuffledUsers = users.slice(0).shuffle();

        $loadout.empty();

        for (var i = 0; i < numberOfSpins; i++) {
            for (var y = 0; y < shuffledUsers.length; y++) {
                $loadout.append(
                    '<div>' +
                    '<img src="' + shuffledUsers[y].avatarUrl + '">' +
                    '<div class="text-center">' + shuffledUsers[y].name + '</div>' +
                    '</div>'
                );
            }
        }
    }

    function initCarousel() {
        $loadout.trigger('destroy.owl.carousel');
        addUsersToLoadout();
        $loadout.owlCarousel({
            items: 4,
            margin: 50,
            center: true,
            dots: false
        });
    }

    bindRoll();
    initCarousel();
})();
