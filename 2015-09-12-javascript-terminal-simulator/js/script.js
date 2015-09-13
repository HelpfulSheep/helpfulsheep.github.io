/* ========================================================================
 * Bash.js :p
 * ======================================================================== */

var bjs = {
    MOBILE_BROWSER_REGEX: /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i,
    EMAIL_REGEX: /\S+@\S+\.\S+/,
    SEPARATOR_REGEX: / |,/,

    AUTOCOMPLETE: ['./signup', 'cat', 'cat README', 'cat signup', 'help', 'clear', 'pwd', 'rm', 'rm README', 'rm signup'],
    DEFAULT_PROMPT: 'signup@ctf365:~$',

    MAX_HISTORY_LINE_COUNT: 25,

    lastInput: '',
    input: '',
    email: '',
    password1: '',
    password2: '',
};

if (bjs.MOBILE_BROWSER_REGEX.test(navigator.userAgent.toLowerCase())) {
    bjs.MAX_HISTORY_LINE_COUNT = 10;
    // force the mobile browser user to tap the page before typing
    $('#cursor').removeClass('blink');
}

/* ========================================================================
 * History management
 * ======================================================================== */

function addToHistory(line, htmlMode) {
    htmlMode = htmlMode || false;
    if (htmlMode) {
        $('#history').append($('<p>').html(line));
    } else {
        $('#history').append($('<p>').text(line));
    }
    while ($('#history').children().length >= bjs.MAX_HISTORY_LINE_COUNT) {
        $('#history p').first().remove();
    }
}

/* ========================================================================
 * Input rendering
 * ======================================================================== */

function renderInput() {
    if ($('#prompt').text().indexOf('password') == '0') {
        var input = '';
        for (var i = 0; i < bjs.input.length; i++) {
            input = input + '*';
        }
        $('#input').text(input);
    } else {
        $('#input').text(bjs.input);
    }
}

/* ========================================================================
 * Control keys
 * ======================================================================== */

$(document).on('keydown', function(event) {
    // backspace
    if (event.which == 8) {
        bjs.input = bjs.input.substring(0, bjs.input.length - 1);
        renderInput();
        return false;
    // tab
    } else if (event.which == 9) {
        if (bjs.input.trim() == '') {
            return false;
        }
        var input = bjs.input.trimLeft();
        for (var i = 0; i < bjs.AUTOCOMPLETE.length; i++) {
            if (bjs.AUTOCOMPLETE[i].indexOf(input) == 0) {
                bjs.input = bjs.AUTOCOMPLETE[i];
                renderInput();
                break;
            }
        }
        return false;
    // up arrow
    } else if (event.which == 38) {
        if (bjs.input.trim() == '') {
            bjs.input = bjs.lastInput;
            renderInput();
        }
    // Ctrl+L
    } else if (event.ctrlKey && (event.which == 76 || event.which == 108)) {
        $('#history').text('');
        return false;
    // Ctrl+C
    } else if (event.ctrlKey && (event.which == 67 || event.which == 99)) {
        var line = $('#line').text();
        if (bjs.input != '') {
            line = line.trim();
            if (bjs.input[bjs.input.length - 1] == ' ') {
                line = line + ' ';
            }
        }
        addToHistory(line + '^C');
        bjs.input = '';
        renderInput();
        // reset potential sign up attempt
        $('#prompt').text(bjs.DEFAULT_PROMPT);
        bjs.email = '';
        bjs.password1 = '';
        bjs.password2 = '';
        return false;
    }
});

/* ========================================================================
 * Keypress
 * ======================================================================== */

$(document).on('keypress', function(event) {
    // enter
    if (event.which == 13) {
        addToHistory($('#line').text());
        if (bjs.input.trim() != '') {
            bjs.lastInput = bjs.input;
        }
        var input = bjs.input.trim();
        var output = '';
        switch (input) {
            case 'help':
                addToHistory('Use basic shell commands to discover and start the sign up process.')
                output = 'Type "help -s" to get straight to the point.';
                break;

            case 'help -s':
                addToHistory("Well you're no fun...");
                output = 'Type "./signup" to start the sign up process.';
                break;

            case 'ls':
                output = 'README signup';
                break;

            case 'ls -l':
                addToHistory('total 16K');
                addToHistory('-rw-rw-r-- 1 signup signup     62 sep 12 15:07 README');
                output = '-rwxrwxr-x 1 signup signup 8K sep 12 15:09 signup';
                break;

            case 'ls -lh':
                addToHistory('total 16K');
                addToHistory('-rw-rw-r-- 1 signup signup     62 sep 12 15:07 README');
                output = '-rwxrwxr-x 1 signup signup 8K sep 12 15:09 signup';
                break;

            case 'pwd':
                output = '/home/signup';
                break;

            case 'clear':
                $('#history').text('');
                break;

            case ';':
                output = "syntax error near unexpected token `;'";
                break;

            case 'rm':
                output = 'rm: missing operand';
                break;

            case 'rm signup':
                output = "I wouldn't do that if I were you";
                break;

            case 'rm README':
                output = "I wouldn't do that if I were you";
                break;

            case 'rm *':
                output = 'cookies deleted successfully';
                break;

            case 'rm -rf /':
                output = 'cookies deleted successfully';
                break;

            case 'cat':
                break;

            case 'cat README':
                addToHistory('Say my name and I am no more.');
                output = 'Who am I? My name is {ecnelis}.';
                break;

            case 'cat signup':
                output = 'ELF>@@�@8 @@@@@@��88@8@@@�� ``(0 ((`(`��TT@T@DDP�td��@�@44Q�tdR�td``��/lib64/ld-linux-x86-64.so.2GNUGNU= �S(�+Օ �Z2c9g�  libc.so.6__libc_start_main__gmon_start__GLIBC_2.2.5ui ,`` `H�H�E H��t�3H���52 �%4 @�%2 h������%* h�����1�I��^H��H���PTI��p@H��@H���@������fD�?`UH-8`H�H��w]øH��t�]�8`���8`UH-8`H��H��H��H��?H�H��u]úH��t�]H�ƿ8`���=� uUH���~���]�~ �@H�=X t�H��tU� `H����]�{����s���UH��]�f.�AWA��AVI��AUI��ATL�% UH�- SL)�1�H��H��u���H��t�L��L��D��A��H��H9�u�H�[]A\A]A^A_�ff.���H�H��;0L���||���Li����|�������� zRx �(���*zRx �$����0FJ A �?;*3$"D����A�C Dd����eBEE �E(�H0�H8�M@l8A0A(B BB������@�@ t@``���o�@@�@ �@ 8 `0x@` ���o@@���o���o8@(`�@�@';
                break;

            case 'dir':
                output = 'do I look like Command Prompt to you?';
                break;

            case './signup':
                addToHistory('This utility will walk you through creating a CTF365.com account.');
                output = 'Press ^C at any time to quit.';
                $('#prompt').text('email address:');
                break;

            default:
                if (input != '') {
                    if ($('#prompt').text().indexOf('email address:') == 0) {
                        if (bjs.EMAIL_REGEX.test(bjs.input)) {
                            bjs.email = input;
                            $('#prompt').text('password:');
                        } else {
                            output = 'Invalid email address: ' + input;
                        }
                    } else if ($('#prompt').text().indexOf('password:') == 0) {
                        bjs.password1 = input;
                        $('#prompt').text('password, again:');
                    } else if ($('#prompt').text().indexOf('password, again:') == 0) {
                        bjs.password2 = input;
                        if (bjs.password1 != bjs.password2) {
                            output = 'The passwords you typed do not match';
                            bjs.password1 = '';
                            bjs.password2 = '';
                            $('#prompt').text('password:');
                        } else {
                            addToHistory('Please wait...');
                            // var data = {
                            //     email: bjs.email,
                            //     password: bjs.password1,
                            // };
                            // $.ajax({
                            //     url: '/url-to-signup',
                            //     type: 'POST',
                            //     data: data,
                            //     dataType: 'json',
                            //     async: false,
                            //     success: function(resp) {
                            //         addToHistory('Your CTF365.com account has been created successfully.');
                            //         addToHistory('Please <a href="#">click here</a> to sign in.', true);
                            //         $('#prompt').text(bjs.DEFAULT_PROMPT);
                            //     },
                            // });
                            addToHistory('Your CTF365.com account has been created successfully.');
                            addToHistory('Please <a href="#">click here</a> to sign in.', true);
                            $('#prompt').text(bjs.DEFAULT_PROMPT);
                        }
                    } else {
                        var command = bjs.input.trim().split(bjs.SEPARATOR_REGEX)[0];
                        output = command + ': command not found';
                    }
                }
        }
        if (output.trim() != '') {
            addToHistory(output);
        }
        bjs.input = '';
    // != enter
    } else {
        bjs.input = bjs.input + String.fromCharCode(event.which);
    }
    renderInput();
});

/* ========================================================================
 * Toggle cursor when focus changes
 * ======================================================================== */

$('input').focus(function() {
    $('#cursor').addClass('blink');
});

$('input').blur(function() {
    $('#cursor').removeClass('blink');
});

$(document).on('click touchstart', function() {
    $('input').focus();
});

/* ========================================================================
 * Section
 * ======================================================================== */
