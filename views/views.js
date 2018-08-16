var intro = {
    // introduction title
    "title": "Welcome!",
    // introduction text
    "text": "In the first part of this experiment, two words will be presented to you each time, study the words carefully. The cue word will be presented to the left side of the screen and the target word to the right side, separated by a bar. You will have to decide how likely you are to remember the target word. In the second part only the cue word will be presented, and you will be required to type in the corresponding target word.",
    // introduction's slide proceeding button text
    "buttonText": "Begin!",
    // render function renders the view
    render: function() {
        var view = {};
        view.name = 'intro';
        view.template = $('#intro-view').html();
        $('#main').html(Mustache.render(view.template, {
            title: this.title,
            text: this.text,
            button: this.buttonText
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        });

        return view;
    },
    // for how many trials should this view be repeated?
    trials: 1
}


var instructionsKeyPress = {
    "title": "First Part of Experiment",
    "text": "In this part of the experiment, the cue and target words will appear as earlier described. Your task is to either press the 'f' (not likey to remember) or 'j' (most likey to remember) keys.",
    "buttonText": "Proceed",
    render: function() {
        var view = {};
        view.name = 'instructions';
        view.template = $("#instructions-view").html();
        $('#main').html(Mustache.render(view.template, {
            title: this.title,
            text: this.text,
            button: this.buttonText
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        }); 

        return view;
    },
    trials: 1
};

var mainKeyPress = {
    render : function(CT) {
        var view = {};
        // what part of the progress bar is filled
        var filled = CT * (180 / exp.views[exp.currentViewCounter].trials);
        view.name = 'trial',
        view.template = $('#trial-view-key-press').html();
        console.log(exp.trial_info.trials.keyPress[CT]);
        var key1 = exp.trial_info.trials.keyPress[CT].key1;
        var key2 = exp.trial_info.trials.keyPress[CT].key2;
        $('#main').html(Mustache.render(view.template, {
            question: exp.trial_info.trials.keyPress[CT].question,
            picture: exp.trial_info.trials.keyPress[CT].picture,
            key1: key1,
            key2: key2,
            value1: exp.trial_info.trials.keyPress[CT][key1],
            value2: exp.trial_info.trials.keyPress[CT][key2]
        }));
        startingTime = Date.now();
        // updates the progress bar
        $('#filled').css('width', filled);

        var handleKeyPress = function(e) {
            var keyPressed = String.fromCharCode(e.which).toLowerCase();

            if (keyPressed === key1 || keyPressed === key2) {
                var corectness;
                console.log(keyPressed);
                var RT = Date.now() - startingTime; // measure RT before anything else

                if (exp.trial_info.trials.keyPress[CT].expected === exp.trial_info.trials.keyPress[CT][keyPressed.toLowerCase()]) {
                    correctness = 'correct';
                } else {
                    correctness = 'incorrect';
                };

                trial_data = {
                    trial_type: "mainKeyPress",
                    trial_number: CT+1,
                    question: exp.trial_info.trials.keyPress[CT].question,
                    expected: exp.trial_info.trials.keyPress[CT].expected,
                    key_pressed: keyPressed,
                    correctness: correctness,
                    RT: RT
                };

                trial_data['key1'] = exp.trial_info.trials.keyPress[CT][key1];
                trial_data['key2'] = exp.trial_info.trials.keyPress[CT][key2];

                // question or/and picture are optional
                if (exp.trial_info.trials.keyPress[CT].picture !== undefined) {
                    trial_data['picture'] = exp.trial_info.trials.keyPress[CT].picture;
                }

                if (exp.trial_info.trials.keyPress[CT].question !== undefined) {
                    trial_data['question'] = exp.trial_info.trials.keyPress[CT].question;
                } 

                console.log(trial_data);
                exp.trial_data.push(trial_data);
                $('body').off('keydown', handleKeyPress);
                exp.findNextView();
            }   
        };

        $('body').on('keydown', handleKeyPress);

        return view;
    },
    trials: 8
};

var instructionsTextboxInput = {
    "title": "Second Part of Experiment",
    "text": "In this part, only the cue word will be presented, and you will be required to type in the corresponding target word. In order to proceed to the next slide, please provide at least 3 characters of text.",
    "buttonText": "Proceed",
    render: function() {
        var view = {};
        view.name = 'instructions';
        view.template = $("#instructions-view").html();
        $('#main').html(Mustache.render(view.template, {
            title: this.title,
            text: this.text,
            button: this.buttonText
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        }); 

        return view;
    },
    trials: 1
};

var mainTextboxInput = {
    render : function(CT) {
        var view = {};
        // what part of the progress bar is filled
        var filled = CT * (180 / exp.views[exp.currentViewCounter].trials);
        view.name = 'trial',
        view.template = $('#trial-view-textbox-input').html();
        view.response = $('#response').html();
        $('#main').html(Mustache.render(view.template, {
            question: exp.trial_info.trials.textboxInput[CT].question,
            picture: exp.trial_info.trials.textboxInput[CT].picture
        }));
        var next = $('#next');
        var textInput = $('textarea');
        startingTime = Date.now();
        // updates the progress bar
        $('#filled').css('width', filled);

        // attaches an event listener to the textbox input
        textInput.on('keyup', function() {
            // if the text is longer than (in this case) 4 characters without the spaces
            // the 'next' button appears
            if (textInput.val().trim().length > 3) {
                next.removeClass('nodisplay');
            } else {
                next.addClass('nodisplay');
            }
        });

        // the trial data gets added to the trial object
        next.on('click', function() {
            RT = Date.now() - startingTime; // measure RT before anything else
            trial_data = {
                trial_type: "mainTextboxInput",
                trial_number: CT+1,
                question: exp.trial_info.trials.textboxInput[CT].question,
                text_input: textInput.val().trim(),
                RT: RT
            };
            exp.trial_data.push(trial_data);
            exp.findNextView();
        });

        return view;
    },
    trials: 8
};

var postTest = {
    "title": "Additional Info",
    "text": "Answering the following questions is optional, but will help us understand your answers.",
    "buttonText": "Continue",
    render : function() {
        var view = {};
        view.name = 'postTest';
        view.template = $('#post-test-view').html();
        $('#main').html(Mustache.render(view.template, {
            title: this.title,
            text: this.text,
            buttonText: this.buttonText
        }));

        $('#next').on('click', function(e) {
            // prevents the form from submitting
            e.preventDefault();

            // records the post test info
            exp.global_data.age = $('#age').val();
            exp.global_data.gender = $('#gender').val();
            exp.global_data.education = $('#education').val();
            exp.global_data.languages = $('#languages').val();
            exp.global_data.comments = $('#comments').val().trim();
            exp.global_data.endTime = Date.now();
            exp.global_data.timeSpent = (exp.global_data.endTime - exp.global_data.startTime) / 60000;

            // moves to the next view
            exp.findNextView();
        })

        return view;
    },
    trials: 1
};

var thanks = {
    "message": "Thank you for taking part in this experiment!",
    render: function() {
        var view = {};
        view.name = 'thanks';
        view.template = $('#thanks-view').html();

//        // construct data object for output
//        var data = {
//        'author': config_deploy.author,
//        'experiment_id': config_deploy.experiment_id,
//        'description': config_deploy.description,
//        'startDateTime': exp.startDate,
//        'total_exp_time_minutes': (Date.now() - exp.global_data.startTime) / 60000,
//        'trials': exp.trial_data
//        // 'worker_id': HITData['workerId'],
//        // 'assignmentId': HITData['assignmentId'],
//        // 'HIT_id': HITData['hitId']
//        };
//
//        // merge in global data accummulated so far
//        // this could be unsafe if 'exp.global_data' contains keys used in 'data'!!
//        data = _.merge(exp.global_data, data)

        // what is seen on the screen depends on the used deploy method
		//    normally, you do not need to modify this
        if ((config_deploy.is_MTurk) || (config_deploy.deployMethod === 'directLink')) {
            // updates the fields in the hidden form with info for the MTurk's server
            $('#main').html(Mustache.render(view.template, {
                thanksMessage: this.message,
            }));
        } else if (config_deploy.deployMethod === 'Prolific') {
            var prolificURL = 'https://prolific.ac/submissions/complete?cc=' + config_deploy.prolificCode;

            $('main').html(Mustache.render(view.template, {
                thanksMessage: this.message,
                extraMessage: "Please press the button below<br />" + '<a href=' + prolificURL +  ' class="prolific-url">Finished!</a>'
            }));
        } else if (config_deploy.deployMethod === 'debug') {
            $('main').html(Mustache.render(view.template, {}));
        } else {
            console.log('no such config_deploy.deployMethod');
        }

        exp.submit();

        return view;
    },
    trials: 1
}