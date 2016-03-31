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

    var users = [],
        durationTimeInMilliseconds = 10000,
        $rollBtn = $('#roll-btn'),
        $loadout = $('#loadout'),
        $audio = $('#shuffle-audio');

    function getNumberOfSpins() {
        return Math.max(2, 300 / Math.max(1, users.length));
    }

    function bindRoll() {
        $rollBtn.on('click', function () {
            roll();
        });
    }

    function roll() {
        initCarousel();

        $loadout.trigger('to.owl.carousel', [0, 0, true]);
        $rollBtn.attr('disabled', true);
        $audio.prop('volume', 0.5).animate({volume: 1}, 1000).trigger('play');
        $loadout.trigger('to.owl.carousel', [randomBetween(((getNumberOfSpins() - 1) * users.length) - 1, (getNumberOfSpins() * users.length) - 1), durationTimeInMilliseconds / 5, true]);
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
        var shuffledUsers = users.slice(0).shuffle(),
            numberOfSpins = getNumberOfSpins();

        $loadout.empty();

        for (var i = 0; i < numberOfSpins + 1; i++) {
            for (var y = 0; y < shuffledUsers.length; y++) {
                $loadout.append(
                    '<div>' +
                    '<img src="' + gravatar(shuffledUsers[y].Email, { size: 516, rating: 'pg', backup: 'retro', secure: true }) + '">' +
                    '<div class="text-center">' + shuffledUsers[y].Name + '</div>' +
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

    function bindFileUpload(file) {
        var $beforeFileLoadWrapper = $('#before-file-load'),
            $afterFileLoadWrapper = $('#after-file-load');

        $afterFileLoadWrapper.hide();

        $('#file').on('change', function() {
            var file = this.files[0];
            var reader = new FileReader();
            reader.onload = function(event) {
                var csv = event.target.result;
                users = $.csv.toObjects(csv);
                $beforeFileLoadWrapper.hide();
                $afterFileLoadWrapper.show();
                initCarousel();
            };
            reader.readAsText(file);
        })
    }

    function initParticles() {
        particlesJS.load('particles-wrapper', 'assets/media/particles.json');
    }

    bindRoll();
    bindFileUpload();
    initParticles();
})();
