
// форма регистрации

    var $btnTab = $('.tab-btn > button'),
        $tab = $('.tab');
    /* $loginBtn=$('.login'),
     $registerBtn =$('.register'),
     $modalIn = $('.modal'),
     timerIdReg = '',
     closeInReg = document.getElementsByClassName("close");*/
    showTab(0);
    function showTab($n) {

        for (let $i = 0; $i < $tab.length; $i++) {
            $($tab[$i]).hide("slow");
        }

        $($tab[$n]).show("slow");
    }

    $($btnTab[0]).on('click', function (event) {
        event.preventDefault();
        document.body.style.overflow = 'hidden';
        showTab(0);
    });

    $($btnTab[1]).on('click', function (event) {
        event.preventDefault();
        document.body.style.overflow = 'hidden';
        showTab(1);
    });

    $('.close').on('click', function () {
        let container = $('.modal');
        document.body.style.overflow = '';
        container.hide("slow");
    });

    /*
    $($loginBtn[0]).on('click', function(event) {
        event.preventDefault();
        $($modalIn).css('display','flex');
        document.body.style.overflow = 'hidden';
        showTab(0);
    });

    $($registerBtn[0]).on('click', function(event) {
        event.preventDefault();
        $($modalIn).css('display','flex');
        document.body.style.overflow = 'hidden';
        showTab(1);
    });
    */
